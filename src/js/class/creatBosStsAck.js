var http = require('http');
var qs = require('querystring');

var STS = require('bce-sdk-js').STS;
var kCredentials = {
  ak: '50c26363e0da4c84be42265e8f8632e5',
  sk: '6a59c5b7538943efac7343c18f75c452'
};
var kRegion = 'bj';

var stsClient = new STS({
  credentials: kCredentials,
  region: kRegion,
  protocol: 'http'
});

stsClient.getSessionToken(6000 * 10, {
  accessControlList: [{
    service: 'bce:bos',
    resource: ['dogquan'],
    region: '*',
    effect: 'Allow',
    permission: ['READ', 'WRITE']
  }]
}).then((result) => {
  console.log(result)

  // 这是需要提交的数据
  var content = qs.stringify(result.body);

  var options = {
    hostname: '127.0.0.1',
    port: 80,
    path: '/appdata/1.1/index.php?action=addsts',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };

  var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(content);

  req.end();
}).catch((err) => {
  console.log(err)
});
