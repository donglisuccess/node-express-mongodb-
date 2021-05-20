const express = require('express')
const router = express.Router()

// 导入shop路由具体操作
const {
  addShop,
  getShopInfo,
  updateShopInfo,
  deleteShop,
  getAllShopInfo,
  addGoodToShop,
  getAllGoodFromShop,
  deleteGoodFromShop,
  deleteAllGoods,
  getAllFans
} = require('../dealRouter/dealShopRouter')

// 新增店铺
router.post('/addShop', addShop)
// 查询店铺
router.get('/getShopInfo/:id', getShopInfo)
// 更新数据
router.put('/updateShopInfo/:id', updateShopInfo)
// 删除店铺
router.delete('/deleteShop/:id', deleteShop)
//查询全部店铺
router.get('/getAllShopInfo', getAllShopInfo)
// 给店铺新增商品
/**
 * 店铺id：shopId
 * 商品id：goodId
 * **/
router.post('/addGoodToShop', addGoodToShop)

// 获取该店铺的全部商品
router.get('/getAllGoodFromShop/:id', getAllGoodFromShop)

// 从店铺中去除该商品
/**
 * 店铺id: shopId
 * 商品id: goodId
 * **/
router.delete('/deleteGoodFromShop', deleteGoodFromShop)
// 清空该店铺中的全部商品
/**
 * 店铺id:shopId
 * **/
router.delete('/deleteAllGoods/:id', deleteAllGoods)

// 查看该店铺的粉丝
/**
 * 店铺id:id
 * **/
router.get('/getAllFans/:id', getAllFans)

module.exports = router