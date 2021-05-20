const express = require('express')
const router = express.Router()

// 导入路由处理的结果
const {
  register,
  login,
  editUserInfo,
  deleteUser,
  getOneUserInfo,
  getAllUserInfo,
  addAttendShop,
  checkAttendShop,
  cancelAttendShop,
  addLikeGoods,
  findAllLikeGoods,
  deleteLikeGood,
  payAttention,
  cancelAttendUser,
  getAllFans,
  getAllAttens,
  addViewsHistory,
  getAllViewsHistory,
  deleteViewHistoryOne,
  deleteAllHistroy,
  addGoodToCart,
  removeOneGood,
  clearGoodsCart,
  withdrawComment
} = require('../dealRouter/user')

// 注册用户
router.post('/register', register)
//登录
router.post('/login', login)
// 修改信息
router.put('/editUserInfo/:id', editUserInfo)
// 注销用户
router.delete('/deleteUser/:id', deleteUser)
// 查询单个用户
router.get('/getOneUserInfo/:id', getOneUserInfo)
// 查询用户全部的数据
router.get('/getAllUser', getAllUserInfo)
// 新增关注店铺
/**
 * 用户id：userId
 * 店铺id: shopId
 * **/
router.post('/addAttendShop', addAttendShop)
// 查看关注的店铺
/**
 * 用户id: userId
 * **/
router.get('/checkAttendShop/:id', checkAttendShop)
// 取消关注该店铺
/**
 * 用户id:userId
 * 店铺id:shopId
 * **/
router.post('/cancelAttendShop', cancelAttendShop)
// 新增用户喜欢的商品
/**
 * 用户id：userId
 * 商品id：goodId
 * **/
router.post('/addLikeGoods', addLikeGoods)

//查询全部的喜欢的商品
/**
 * 用户id: userId
 * **/
router.get('/findAllLikeGoods/:id', findAllLikeGoods)

// 删除喜欢的商品
/**
 * 用户id: userId
 * 商品id: goodId
 * **/
router.post('/deleteLikeGood', deleteLikeGood)

// 关注用户
/**
 * 个人id: myId
 * 用户id: userId
 * **/
router.post('/payAttention', payAttention)

// 取消关注该用户
/**
 * 个人id: myId
 * 用户id: userId
 * **/
router.post('/cancelAttendUser', cancelAttendUser)

//查看全部的粉丝
/**
 * 用户id: myId
 * **/
router.get('/getAllFans/:id', getAllFans)
// 查看关注的列表
router.get('/getAllAttens/:id', getAllAttens)

// 观察历史
/**
 * 用户id:userId
 * 商品id:goodId
 * **/
router.post('/addViewsHistory', addViewsHistory) 
// 删除这条浏览记录
/**
 * 用户id: userId
 * 商品id: goodId
 * **/
router.post('/deleteViewHistoryOne', deleteViewHistoryOne)
//查看全部的浏览记录
/**
 * 用户id: userId
 * **/
router.get('/getAllViewsHistory/:id', getAllViewsHistory)

// 清空全部的浏览记录
/**
 * 用户id :userId
 * **/
router.get('/deleteAllHistroy/:id', deleteAllHistroy)

// 设置加入购物车
/**
 * 用户id:userId
 * 商品id:goodId
 * **/
router.post('/addGoodToCart', addGoodToCart)

// 将商品从购物车中去除
/**
 * 用户id: userId
 * 商品id: goodId
 * **/
router.post('/removeOneGood', removeOneGood)

//清空购物车
/**
 * 用户id: userId
 * **/
router.get('/clearGoodsCart/:id', clearGoodsCart)

// 撤回评论
router.post('/withdrawComment', withdrawComment)

router.get('/', (req, res) => {
  console.log(md5(md5(123456)))
})

module.exports = router