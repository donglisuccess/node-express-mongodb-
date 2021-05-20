const mongoose = require('mongoose')
const {db, Schema} = require('./database')

const commentSchema = Schema({
  // 评论内容
  content:{ type:String, required:true },
  // 评论图片
  images:[ { type:String, default:'http://127.0.0.1:3000/public/img/share.jpg' } ],
  // 评论的用户
  commentUser:{
    type:String,
    default:''
  }
})

// 关联到的商品
// 设置虚拟字段
commentSchema.virtual('good', {
  ref:'Good',
  localField:'_id',
  foreignField:'userAssess',
  justOne:true
})

const Assess = db.model('Assess', commentSchema)

module.exports = {
  Assess
}