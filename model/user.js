const mongoose = require('mongoose')
const { db, Schema } = require('./database')

const userSchema = Schema({
  // 昵称
  nickName:{type:String,required:true},
  // 账号
  account:{type:String,required:true},
  // 密码
  password:{type:String,required:true,},
  // 头像信息
  avatorImage:{type:String,default:'http://localhost:3000/public/img/avator.jpg'},
  // 性别
  sex:{type:Number,enum:[0,1,2],default:0},
  // 生日
  birth:{type:String,default:''},
  // 关注好友
  attentionUser:[{type:mongoose.SchemaTypes.ObjectId,ref:'User'}],
  // 关注店铺
  attentionShop:[{type:mongoose.SchemaTypes.ObjectId,ref:'Shop'}],
  // 喜欢商品
  likeGoods:[{type:mongoose.SchemaTypes.ObjectId,ref:'Good'}],
  // 购买商品
  buyGoods:[{type:mongoose.SchemaTypes.ObjectId,ref:'Good'}],
  // 浏览记录
  viewsHistory:[{type:mongoose.SchemaTypes.ObjectId,ref:'Good'}],
  // 购物车
  carts:[{type:mongoose.SchemaTypes.ObjectId,ref:'Cart'}]
})

userSchema.virtual('fans', {
  ref:'User',  //这里是参考的哪个模型上面
  localField: '_id',
  foreignField:'attentionUser',
  justOne:false
})

const User = db.model('User', userSchema)

module.exports = {
  User,
  db
}