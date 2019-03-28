/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description:
 * @Date: 2019-03-28 23:02:36
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-03-28 23:02:36
 */

const request = require('request')

request({
  url: 'http://127.0.0.1:3300/json1',
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({ a: 1, b: 2 })
}, (err, response, body) => {

})
