const express = require('express')
const {goods} = require('../model/goodsModel')
const router = express.Router()

// 引入模块 
const {
  addGood,
  getGood,
  updateGood,
  deleteGood,
  getAllGood,
  setGoodSort,
  getAllGoodAssess} = require('../dealRouter/dealGoodsRouter')

/**
 * 商品名称：goodsName
 * 商品介绍：goodsInfo
 * 商品价格：goodsPrice
 * **/
  
// 新增商品
router.post('/addGood', addGood)
// 查询商品
router.get('/getGood/:id', getGood)
// 修改商品
router.put('/updateGood/:id', updateGood)
// 删除商品
router.delete('/deleteGood/:id', deleteGood)
// 查询全部商品
router.get('/getAllGood', getAllGood)
// 设置分类
router.get('/setGoodSort', setGoodSort)
// 查找商品的全部评论
router.get('/getAllGoodAssess/:id', getAllGoodAssess)


module.exports = router