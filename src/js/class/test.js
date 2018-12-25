import MyBosClient from './mybosclient.js'
// import Blob from '../bce/blob.js'
import Blob from './blob2.js'
// var fs = require('fs')

var debug = { hello: 'world' };
var blob = new Blob([JSON.stringify(debug, null, 2)], { type: 'application/json' });
console.log(blob)
// var blob = new Blob(['hi']);

// var blob = fs.readFileSync('./11.txt')

const mybos = new MyBosClient()
mybos.setFile({ file: blob, bucket: 'dogquan', object: 'test123.txt' })
mybos.doUpload()
// console.log(mybos.client)
