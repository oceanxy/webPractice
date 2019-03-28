/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description:
 * @Date: 2019-03-28 00:25:46
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-03-28 00:25:46
 */

const request = require('request')

// const redis = require('redis')

function index(req, res) {
  /* if(redis.get('xxx')){
   // 拿到缓存
   res.render('./index.atr', data)
   } else {
   // 没拿到缓存
   // 发送请求
   }*/

  request({
    url: 'http://localhost:3000/',
    method: 'GET'
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      const data = JSON.parse(body)
      res.render('./index.art', data)
    }
  })
}

module.exports = index
