/* *
npm i babel-preset-env
npm i bce-sdk-js
npm i async-es
*/
// import BosClient from './bosclient'
import { BosClient } from 'bce-sdk-js'
import Q from 'q'
import MapLimit from 'async/mapLimit'

export default class MyBosClient {
  client = null
  file = null
  bucket = null
  object = null
  chunkSize = 5 * 1024 * 1024 // 分块大小
  chunkKey = null
  uploadId = null

  constructor() {
    const config = {
      // endpoint: 'http://bos.bj.baidubce.com',
      endpoint: 'http://dogquan.bj.bcebos.com',
      credentials: {
        ak: '431b74ed05d011e9899221149f7b9b42',
        sk: '1ac07d15b54f464586694d685d3a5b8a'
      },
      sessionToken: 'MjUzZjQzNTY4OTE0NDRkNjg3N2E4YzJhZTc4YmU5ZDh8AAAAAH0CAADYyizin6uWmHdzE6/u76NEzAcr8yQMYdlhc7+6Hwz6jxy7FqgsYhLmtj/XhKybz+jvKgcT+ZWm+VGQnded9IFmQ/B5pmYtZYPcA5HU9/ycjXdzv0E7G0EfyBEw0l4T24BZVFXdFMZDDOySvkHSAKoqLalR6N/gSqIW14nnvvFrcFPw55LYrY5pt5HdRiOIBDiJh8KwwOlZldn9AOg8rZqs85mKKhLgE8EyGNarWZBMw7v7I8Fu9/nRUSXLqLfTldkcGsvLpmSfrhS8wZeRT844iC0glzL+plg1/7byZ1u6XeTMZQ6hc7WVYfL11+vAUt+sRDdTxQjUkFsGfQiRmX5NFclJPkA1Z9L4S/8qoKQwJGT1vSA+CpbnQbN8dX4rOkSKZFuUYrLpAakXHod43St38V6ZYMtEoKHum0x3ET1JzS1VeKa9Yz2dVp7LMwaZsV0mmQDjeB5tFT6Ql0ElzyYu'
    }

    this.client = new BosClient(config)
    return this
  }

  setFile(one) {
    this.file = one.file
    this.bucket = one.bucket
    this.object = one.object
  }

  cleanFile() {
    this.file = null
    this.bucket = null
    this.object = null
  }

	/* *
	上传文件
	*/
  doUpload(succeedCB, errorCB, doneCB) {
    if (this.file === null) return false

    this._initiateMultipartUpload()
      .then(function (response) {
        const parts = response.body.parts || [] // 已上传的分块列表。如果是新上传，则为空数组

        const deferred = Q.defer()
        const tasks = this.getTasks(parts)
        const state = {
          lengthComputable: true,
          loaded: parts.length, // 已上传的分块数
          total: tasks.length
        }

        // 如果已上传的分块数大于0，可以先修改一下文件上传进度
        this.client.emit('progress', state)

        // 为了管理分块上传，使用了async（https://github.com/caolan/async）库来进行异步处理
        const THREADS = 2 // 同时上传的分块数量
        MapLimit(tasks, THREADS, this.uploadPartFile(state), function (err, results) {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(results)
          }
        })
        return deferred.promise
      })
      .then(function (allResponse) {
        const partList = []
        allResponse.forEach(function (response, index) {
          // 生成分块清单
          partList.push({
            partNumber: index + 1,
            eTag: response.http_headers.etag
          })
        })

        // 所有分块上传完成后，可以删除对应的`uploadId`了
        this.removeUploadId(this.chunkKey)

        return this.client.completeMultipartUpload(this.bucket, this.object, this.uploadId, partList) // 完成上传
      })
      .then(function (res) {
        // 上传完成
        if (succeedCB) succeedCB(res)
        if (doneCB) doneCB()
        this.cleanFile()
      })
      .catch(function (err) {
        // 上传失败，添加您的代码
        if (errorCB) errorCB(err)
        if (doneCB) doneCB()
        this.cleanFile()
      })
  }

	/* *
	在初始化分块上传时，有两种可能：
	如果已经存在此文件的uploadId，那么跳过initiateMultipartUpload()方法，改为调用listParts()来获取已上传分块信息；
	如果没有此文件的uploadId，那么调用initiateMultipartUpload()方法获得新的uploadId，并将这个uploadId保存在localStorage中。
	*/
  _initiateMultipartUpload() {
    // 根据文件生成localStorage的key
    this.chunkKey = this.generateLocalKey()

    // 获取对应的`uploadId`
    this.uploadId = this.getUploadId(this.chunkKey)

    if (this.uploadId) {
      // `uploadId`存在，说明有未完成的分块上传。
      // 那么调用`listParts()`获取已上传分块信息。
      return this.client.listParts(this.bucket, this.object, this.uploadId)
        .then(function (response) {
          // response.body.parts里包含了已上传分块的信息
          response.body.uploadId = this.uploadId
          return response
        })
    } else {
      // `uploadId`不存在，那么用正常的流程初始化
      return this.client.initiateMultipartUpload(this.bucket, this.object)
        .then(function (response) {
          // response.body.uploadId为新生成的`uploadId`
          response.body.parts = []

          // 为了下次能使用断点续传，我们需要把新生成的`uploadId`保存下来
          this.setUploadId(this.chunkKey, response.body.uploadId)
          this.chunkKey = response.body.uploadId
          return response
        })
    }
  }

	/* *
	在保存uploadId时，我们需要为它指定一个key，让不同的文件、不同的上传过程区分开。
	本示例采用文件名、文件大小、分区大小、bucket名称、object名称组合成这个key
	*/
  generateLocalKey() {
    return [this.file.name, this.file.size, this.chunkSize, this.bucket, this.object].join('&')
  }

	/* *
	在对大文件分割分块时，我们可以跟以上传的分块列表进行比较，以确定是否需要真的进行上传。
	*/
  getEtag(partNumber, parts) {
    // 从已上传part列表中找出特定partNumber的part的eTag
    for (let i = 0, l = parts.length; i < l; i++) {
      if (parts[i].partNumber === partNumber) {
        return parts[i].eTag
      }
    }
    return null
  }
  getTasks(parts) {
    let leftSize = this.file.size
    let offset = 0
    let partNumber = 1

    const tasks = []

    while (leftSize > 0) {
      const partSize = Math.min(leftSize, this.chunkSize)
      const task = {
        file: this.file,
        uploadId: this.uploadId,
        bucket: this.bucket,
        object: this.object,
        partNumber: partNumber,
        partSize: partSize,
        start: offset,
        stop: offset + partSize - 1
      }

      // 如果在已上传完成的分块列表中找到这个分块的etag，那么记录下来
      const etag = this.getEtag(partNumber, parts)
      if (etag) {
        task.etag = etag
      }

      tasks.push(task)

      leftSize -= partSize
      offset += partSize
      partNumber += 1
    }

    return tasks
  }

	/* *
	在进行分块上传处理的时候，根据是否已带有etag字段来决定是否需要上传
	*/
  uploadPartFile(state) {
    return function (task, callback) {
      if (task.etag) {
        // 如果有etag字段，则直接跳过上传
        callback(null, {
          http_headers: {
            etag: task.etag
          },
          body: {}
        })
      } else {
        // 否则进行上传
        const blob = task.file.slice(task.start, task.stop + 1)
        this.client.uploadPartFromBlob(task.bucket, task.object, task.uploadId, task.partNumber, task.partSize, blob)
          .then(function (res) {
            ++state.loaded
            callback(null, res)
          })
          .catch(function (err) {
            callback(err)
          })
      }
    }
  }

	/* *
	存储方式我们选择localStorage
	*/
  getUploadId(key) {
    // return localStorage.getItem(key)
  }
  setUploadId(key, _uploadId) {
    // return localStorage.setItem(key, _uploadId)
  }
  removeUploadId(key) {
    // return localStorage.removeItem(key)
  }
}
