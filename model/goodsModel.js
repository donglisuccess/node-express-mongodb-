const mongoose = require('mongoose')
const {
  db,
  Schema,
} = require('../model/database')

const goodSchema = Schema({
  // 商品名称
  goodsName:{type:String,required:true},
  // 商品图片
  goodsImage:{type:String,default:'http://localhost:3000/public/img/goodsImage.jpg'},
  // 商品介绍
  goodsInfo:{type:String,required:true},
  // 价格
  goodsPrice:{type:Number,required:true},
  // 用户评价
  userAssess:[{type:mongoose.SchemaTypes.ObjectId,ref:'Assess'}],
  // 商品分类
  goodSort:[{type:mongoose.SchemaTypes.ObjectId,ref:'Sort'}]
})

// 设置虚拟字段
// 对应的是user中的likeGoods字段
goodSchema.virtual('likeGoods', {ref:'User',localField: '_id',foreignField:'likeGoods',justOne:false})
// 对应的是user中的butGoods字段
goodSchema.virtual('buyGoods', {ref:'User',localField: '_id',foreignField:'buyGoods',justOne:false})
// 对应的是user中的viewsHistory字段
goodSchema.virtual('viewsHistory', {ref:'User',localField: '_id',foreignField:'viewsHistory',justOne:false})
// 对应的是Shop中的goodsList字段
goodSchema.virtual('goodsList', {ref:'Shop',localField: '_id',foreignField:'goodsList',justOne:false})


const goods = db.model('Good', goodSchema)

module.exports = {
  goods
}