/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 路由
 * @Date: 2019-03-28 00:18:47
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-03-28 00:18:47
 */

const express = require('express')
const router = express.Router()
const index = require('./controll/index')
const json1 = require('./controll/json1')

router.get('/', index)
router.get('/json1', json1)

module.exports = router
