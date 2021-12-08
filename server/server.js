const express = require('express')
const Mock = require('mockjs')
const app = express()
const Random = Mock.Random

// 中间件拦截--设置跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 获取文章列表
app.get('/posts', (req, res) => {
  const number = 100
  let posts = []
  for (let index = 0; index < 100; index++) {
    // 生成模拟数据
    posts.push(Mock.mock({
      id: index + 1,
      title: Random.cparagraph(1),
      content: Random.cparagraph(2, 5),
      time: Random.datetime('yyyy-MM-dd hh:mm:ss'),
      author: Random.cname(),
      'like|1-1000': 1
    }))
  }
  // 每页显示条数
  let perPageNumber = Number(req.query.perPageNumber ? req.query.perPageNumber : 10)
  // 当前页
  let currentPage = req.query.currentPage ? req.query.currentPage : 1
  // 总页数 - 向上取整
  let totalPage = Math.ceil(posts.length / perPageNumber)
  // 模拟limit截取文章列表
  const start = (currentPage -1) * perPageNumber
  const end = currentPage * perPageNumber <= posts.length ?  currentPage * perPageNumber : posts.length

  posts = posts.slice(start, end)
  // 发送给前端
  res.json({ content: posts, currentPage, totalPage})
})


// nodemon 自动重启服务，服务启动方式： nodemon ./server/server.js
app.listen(3000, () => {
  console.log('Server port: 3000')
})

