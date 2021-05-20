const mongoose = require('mongoose')
const {db,Schema} = require('./database')

const shopSchema = Schema({
  // 店铺名称
  shopName:{type:String,required:true},
  // 店铺介绍
  shopInfo:{type:String,required:true},
  // 店铺图片设置
  shopImage:{type:String,default:'http://localhost:3000/public/img/shopImage.jpg'},
  // 店铺商品
  goodsList:[{type:mongoose.SchemaTypes.ObjectId,ref:'Good'}],
  // 店铺分类
  shopSort:[{type:mongoose.SchemaTypes.ObjectId,ref:'ShopSort'}],
})
// 虚拟字段查看粉丝
shopSchema.virtual('fans', {
  ref:'User',
  localField:'_id',
  foreignField:'attentionShop',
  justOne:false
})

const Shop = db.model('Shop', shopSchema)

module.exports = {
  Shop
}