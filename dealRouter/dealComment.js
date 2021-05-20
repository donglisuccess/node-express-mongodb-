// 引入model
const {Assess} = require('../model/commentModel')
// 引入good
const {goods} = require('../model/goodsModel')
const {User} = require('../model/user')

// 设置评论  
/**
 * 商品的id   goodId
 * 用户的id   userId
 * 评论的内容 content
 * 评论的图片 以字符串空格相连
 * **/ 

/**
 * @api {post} /comments/addCommentGood 新增评论
 * @apiName addCommentGood
 * @apiGroup Assess
 *
 * @apiParam {String} goodId 商品id
 * @apiParam {String} userId 用户id
 * @apiParam {String} content 评论内容
 * @apiParam {String} images 添加图片(多张图片中间以空格隔开)
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 添加评论
module.exports.addCommentGood =async (req, res) => {
  let body = req.body
  let {userId,goodId,content,images} = body
  // 查找用户
  let findUser = await User.findOne({_id:userId})
  // 新建一个评论
  let newComment =await new Assess({
    content,
    images,
    commentUser:findUser._id
  }).save()
  // 查找商品
  let findGood =await goods.findOne({_id:goodId})
  findGood.userAssess.push(newComment)
  findGood.save().catch(err => {
    return res.send({
      meta:{
        state:500,
        msg:'添加失败'
      },
      data:null
    })
  })
  return res.send({
    meta:{
      state:200,
      msg:'添加成功'
    },
    data:newComment
  })
}


