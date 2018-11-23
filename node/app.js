const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if(req.url === '/sign') {
    const data = fs.readFileSync(path.resolve(__dirname, 'static', 'sign.html'))
    res.statusCode = 200
    return res.end(data)
  }

  res.statusCode = 404
  res.end('404!!!')
})

server.listen(8000)
