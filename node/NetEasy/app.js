/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 网易云课堂node课程
 * @Date: 2019-03-27 22:41:35
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-03-27 22:41:35
 */


  // 配置和核心模块引入
const express = require('express')
const app = express()
const router = require('./src/router/router')

const BodyParser = require('body-parser')

// 配置静态文件地址
app.use(express.static('./static'))

// 处理content-type为application/x-www-from
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())
// 设置模版引擎
app.engine('art', require('express-art-template'))
// 设置模版位置
app.set('views', './src/views')
// 使用路由
app.use('/', router)
// 设置端口
app.listen(3300)
