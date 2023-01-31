/**
 * 本代码是在学习 https://www.nodebeginner.org/index-zh-cn.html 的过程中编写的
 * 主要功能是实现一个简单的图片上传并显示
 */

var server = require('./server')
var router = require('./router')
var requestHandlers = require('./requestHandlers')

var handle = {}
handle['/'] = requestHandlers.start
handle['/start'] = requestHandlers.start
handle['/upload'] = requestHandlers.upload
handle['/show'] = requestHandlers.show

server.start(router.route, handle)
