const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

// 设置静态路由
app.use('/public/', express.static(path.join(__dirname, './public/')))
// 这里引入路由
const user = require('./router/user')
const shopRouter = require('./router/shopRouter')
const goodsRouter = require('./router/goodsRouter')
const goodSort = require('./router/goodSort')
const commentGoods = require('./router/commentGoods')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.all('*', (req, res, next) => {
  // 设置请求跨域问题
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", 
  "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name")
  // 设置前端请求方法
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  if(req.method === 'OPTIONS'){
    res.send(200)
  }else{
    next()
  }
})

// 处理用户的接口
app.use('/user', user)
// 处理店铺的接口
app.use('/shop', shopRouter)
// 处理商品的接口
app.use('/goods', goodsRouter)
// 处理分类的接口
app.use('/sorts', goodSort)
// 处理评论的接口
app.use('/comments', commentGoods)


app.get('/', (req, res) => {
  console.log(md5(md5(123456)))
})
app.listen(3000, () => {
  console.log('服务器已开启，请访问http://127.0.0.1:3000')
})