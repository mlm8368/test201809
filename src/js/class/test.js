import MyBosClient from './mybosclient.js'
//import Blob from 'blob'

var debug = {hello: "world"};
//var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
//var blob = new Blob(['hi']);

const mybos = new MyBosClient()
mybos.setFile({file:'blob', bucket:'dogquan', object:'test123.txt'})
mybos.doUpload()
//console.log(mybos.client)
