const express = require('express')
const router = express.Router()
// 引入路由处理模块
const {addCommentGood} = require('../dealRouter/dealComment')

// 设置评论  
/**
 * 商品的id   goodId
 * 用户的id   userId
 * 评论的内容 content
 * 评论的图片 以字符串空格相连
 * **/ 
router.post('/addCommentGood', addCommentGood)



module.exports = router