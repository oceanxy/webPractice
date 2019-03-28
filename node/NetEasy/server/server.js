/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 数据服务
 * @Date: 2019-03-28 01:06:15
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-03-28 01:06:15
 */


const http = require('http')
const express = require('express')
const app = express()

const data1 = JSON.stringify({
  arr: [
    {
      title: 'this is a title1',
      content: 'this is a content1'
    },
    {
      title: 'this is a title2',
      content: 'this is a content2'
    },
    {
      title: 'this is a title3',
      content: 'this is a content3'
    }
  ]
})

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(data1)
})

server.listen(3000)
