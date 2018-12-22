/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file src/bos_client.js
 * @author leeight
 */

/* eslint-env node */
/* eslint max-params:[0,10] */

var util = require('../../../node_modules/util/util.js');
var path = require('../../../node_modules/path/path.js');

var u = require('underscore');
var Q = require('q');

var H = require('../bce/headers');
var strings = require('../bce/strings');
var MimeType = require('../bce/mime.types');
var config = require('../bce/config');

var Auth = require('../bce/auth');
var HttpClient = require('../bce/http_client');
// var BceBaseClient = require('../bce/bce_base_client');

// var MIN_PART_SIZE = 1048576;                // 1M
// var THREAD = 2;
var MAX_PUT_OBJECT_LENGTH = 5368709120; // 5G
var MAX_USER_METADATA_SIZE = 2048; // 2 * 1024

/**
 * BOS service api
 *
 * @see http://gollum.baidu.com/BOS_API#BOS-API文档
 *
 * @constructor
 * @param {Object} config The bos client configuration.
 * @extends {BceBaseClient}
 */
function BosClient(clientConfig) {
    // BceBaseClient.call(this, config, 'bos', true);

    this.config = u.extend({}, config.DEFAULT_CONFIG, clientConfig);
    this.serviceId = 'bos';
    this.regionSupported = true;

    this.config.endpoint = this._computeEndpoint();
    /**
     * @type {HttpClient}
     */
    this._httpAgent = null;
}
// util.inherits(BosClient, BceBaseClient);

// --- B E G I N ---
BosClient.prototype.completeMultipartUpload = function (bucketName, key, uploadId, partList, options) {
  var headers = {};
  headers[H.CONTENT_TYPE] = 'application/json; charset=UTF-8';
  options = this._checkOptions(u.extend(headers, options));

  return this.sendRequest('POST', {
      bucketName: bucketName,
      key: key,
      body: JSON.stringify({ parts: partList }),
      headers: options.headers,
      params: { uploadId: uploadId },
      config: options.config
  });
};

BosClient.prototype.listParts = function (bucketName, key, uploadId, options) {
  /* eslint-disable */
  if (!uploadId) {
      throw new TypeError('uploadId should not empty');
  }
  /* eslint-enable */

  var allowedParams = ['maxParts', 'partNumberMarker', 'uploadId'];
  options = this._checkOptions(options || {}, allowedParams);
  options.params.uploadId = uploadId;

  return this.sendRequest('GET', {
      bucketName: bucketName,
      key: key,
      params: options.params,
      config: options.config
  });
};

BosClient.prototype.initiateMultipartUpload = function (bucketName, key, options) {
  options = options || {};

  var headers = {};
  headers[H.CONTENT_TYPE] = MimeType.guess(path.extname(key));

  options = this._checkOptions(u.extend(headers, options));

  return this.sendRequest('POST', {
      bucketName: bucketName,
      key: key,
      params: { uploads: '' },
      headers: options.headers,
      config: options.config
  });
};

BosClient.prototype.uploadPartFromBlob = function (bucketName, key, uploadId, partNumber,
                                                   partSize, blob, options) {
    if (blob.size !== partSize) {
        throw new TypeError(util.format('Invalid partSize %d and data length %d',
            partSize, blob.size));
    }

    var headers = {};
    headers[H.CONTENT_LENGTH] = partSize;
    headers[H.CONTENT_TYPE] = 'application/octet-stream';
    // 对于浏览器调用API的时候，默认不添加 H.CONTENT_MD5 字段，因为计算起来比较慢
    // headers[H.CONTENT_MD5] = require('./crypto').md5sum(data);

    options = this._checkOptions(u.extend(headers, options));
    return this.sendRequest('PUT', {
        bucketName: bucketName,
        key: key,
        body: blob,
        headers: options.headers,
        params: {
            partNumber: partNumber,
            uploadId: uploadId
        },
        config: options.config
    });
};

BosClient.prototype._checkOptions = function (options, allowedParams) {
  var rv = {};

  rv.config = options.config || {};
  rv.headers = this._prepareObjectHeaders(options);
  rv.params = u.pick(options, allowedParams || []);

  return rv;
};

BosClient.prototype._prepareObjectHeaders = function (options) {
  var allowedHeaders = [
      H.CONTENT_LENGTH,
      H.CONTENT_ENCODING,
      H.CONTENT_MD5,
      H.X_BCE_CONTENT_SHA256,
      H.CONTENT_TYPE,
      H.CONTENT_DISPOSITION,
      H.ETAG,
      H.SESSION_TOKEN,
      H.CACHE_CONTROL,
      H.EXPIRES,
      H.X_BCE_OBJECT_ACL,
      H.X_BCE_OBJECT_GRANT_READ
  ];
  var metaSize = 0;
  var headers = u.pick(options, function (value, key) {
      if (allowedHeaders.indexOf(key) !== -1) {
          return true;
      } else if (/^x\-bce\-meta\-/.test(key)) {
          metaSize += Buffer.byteLength(key) + Buffer.byteLength('' + value);
          return true;
      }
  });

  if (metaSize > MAX_USER_METADATA_SIZE) {
      throw new TypeError('Metadata size should not be greater than ' + MAX_USER_METADATA_SIZE + '.');
  }

  if (u.has(headers, H.CONTENT_LENGTH)) {
      var contentLength = headers[H.CONTENT_LENGTH];
      if (contentLength < 0) {
          throw new TypeError('content_length should not be negative.');
      } else if (contentLength > MAX_PUT_OBJECT_LENGTH) { // 5G
          throw new TypeError('Object length should be less than ' + MAX_PUT_OBJECT_LENGTH + '. Use multi-part upload instead.');
      }
  }

  if (u.has(headers, 'ETag')) {
      var etag = headers.ETag;
      if (!/^"/.test(etag)) {
          headers.ETag = util.format('"%s"', etag);
      }
  }

  if (!u.has(headers, H.CONTENT_TYPE)) {
      headers[H.CONTENT_TYPE] = 'application/octet-stream';
  }

  return headers;
};

BosClient.prototype.sendRequest = function (httpMethod, varArgs) {
  var defaultArgs = {
      bucketName: null,
      key: null,
      body: null,
      headers: {},
      params: {},
      config: {},
      outputStream: null
  };
  var args = u.extend(defaultArgs, varArgs);

  var config = u.extend({}, this.config, args.config);
  var resource = path.normalize(path.join(
      '/v1',
      strings.normalize(args.bucketName || ''),
      strings.normalize(args.key || '', false)
  )).replace(/\\/g, '/');

  if (config.sessionToken) {
      args.headers[H.SESSION_TOKEN] = config.sessionToken;
  }

  return this.sendHTTPRequest(httpMethod, resource, args, config);
};

BosClient.prototype.sendHTTPRequest = function (httpMethod, resource, args, config) {
  var client = this;

  function doRequest() {
      var agent = this._httpAgent = new HttpClient(config);
      console.log(agent)

      var httpContext = {
          httpMethod: httpMethod,
          resource: resource,
          args: args,
          config: config
      };
      u.each(['progress', 'error', 'abort'], function (eventName) {
          agent.on(eventName, function (evt) {
              client.emit(eventName, evt, httpContext);
          });
      });

      var promise = this._httpAgent.sendRequest(httpMethod, resource, args.body,
          args.headers, args.params, u.bind(this.createSignature, this),
          args.outputStream
      );

      promise.abort = function () {
          if (agent._req && agent._req.xhr) {
              var xhr = agent._req.xhr;
              xhr.abort();
          }
      };

      return promise;
  }

  return doRequest.call(client).catch(function(err) {
      var serverTimestamp = new Date(err[H.X_BCE_DATE]).getTime();

      BosClient.prototype.timeOffset = serverTimestamp - Date.now();

      if (err[H.X_STATUS_CODE] === 403 && err[H.X_CODE] === 'RequestTimeTooSkewed') {
          return doRequest.call(client);
      }

      return Q.reject(err);
  });
};

BosClient.prototype._computeEndpoint = function () {
  if (this.config.endpoint) {
      return this.config.endpoint;
  }

  if (this.regionSupported) {
      return util.format('%s://%s.%s.%s',
          this.config.protocol,
          this.serviceId,
          this.config.region,
          config.DEFAULT_SERVICE_DOMAIN);
  }
  return util.format('%s://%s.%s',
      this.config.protocol,
      this.serviceId,
      config.DEFAULT_SERVICE_DOMAIN);
};

BosClient.prototype.createSignature = function (credentials, httpMethod, path, params, headers) {
  var revisionTimestamp = Date.now() + (this.timeOffset || 0);

  headers[H.X_BCE_DATE] = new Date(revisionTimestamp).toISOString().replace(/\.\d+Z$/, 'Z');

  return Q.fcall(function () {
      var auth = new Auth(credentials.ak, credentials.sk);
      return auth.generateAuthorization(httpMethod, path, params, headers, revisionTimestamp / 1000);
  });
};

module.exports = BosClient;
