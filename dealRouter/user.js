// 导入工具类
const {findBySpe,findAllData} = require('../utils/utils')
// 引入md5对密码进行加密
const md5 = require('md5')

// 导入模型
const {User} = require('../model/user')
const {Shop} = require('../model/shopModel')
const {goods} = require('../model/goodsModel')
const {db, Cart } = require('../model/cartModel')
const { Assess } = require('../model/commentModel')



/**
 * @api {post} /user/register 注册账号
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {String} nickName 用户昵称
 * @apiParam {String} account 账号
 * @apiParam {String} password 用户密码
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */
// 注册用户
module.exports.register = async (req, res) => {
  let userInfo = req.body
  // 注册判断用户名和账号不能重复
  let {nickName,account} = userInfo
  let filterData = await User.findOne({
    $or: [{
      nickName:
      nickName
    }, {
      account: account
    }]
  })
  if (filterData) {
    return res.send({
      meta: {
        state: 200,
        msg: '昵称或账号已存在'
      },
      data: null
    })
  }
  // 注册
  userInfo.password = md5(md5(userInfo.password))
  let saveData = await new User(userInfo).save()
  if (saveData) {
    res.send({
      meta: {
        state: 200,
        msg: '注册成功'
      },
      data: null
    })
  } else {
    res.send({
      meta: {
        state: 500,
        msg: '注册失败'
      },
      data: null
    })
  }
}

/**
 * @api {post} /user/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} account 账号
 * @apiParam {String} password 用户密码
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 用户登录
module.exports.login = async (req, res) => {
  let loginData = req.body
  loginData.password = md5(md5(loginData.password))
  let UserData = await User.findOne(loginData)
  if (UserData) {
    res.send({
      meta: {
        state: 200,
        msg: '登录成功'
      },
      data: UserData,
    })
  } else {
    res.send({
      meta: {
        state: 404,
        msg: '登录失败'
      },
      data: null
    })
  }
}

/**
 * @api {put} /user/editUserInfo/:id 修改用户信息
 * @apiName editUserInfo
 * @apiGroup User
 *
 * @apiParam {String} id 用户id
 * @apiParam {String} nickName 用户昵称
 * @apiParam {String} account 用户账号
 * @apiParam {String} password 用户密码
 * @apiParam {String} avatorImage 用户头像(可不填)
 * @apiParam {String} sex 用户性别(0未知，1男，2女)
 * @apiParam {String} birth 用户生日(可为空)
 * 
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 修改用户信息
module.exports.editUserInfo = async (req, res) => {
  let _id = req.params.id
  let findById = await User.findOne({
    _id
  }).catch(err=>{
    return -1
  })
  if (findById === -1) {
    return res.send({
      meta: {
        state: 404,
        msg: 'id不存在'
      },
      data: null
    })
  }
  let editUserData = req.body
  let editFinsh = User.updateOne({_id}, {$set:editUserData}).catch(err => {
    return false
  })
  if(editFinsh){
    res.send({
      meta:{
        state:200,
        msg:'修改成功'
      },
      data:null
    })
  }
}

/**
 * @api {delete} /user/deleteUser/:id 注销用户
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiParam {String} id 用户id
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 注销用户
module.exports.deleteUser =async (req, res) => {
  let _id = req.params.id
  let findUserOne =await User.findOne({_id}).catch(err => {
    return false
  })
  if(!findUserOne){
    return res.send({
      meta:{
        state:400,
        msg:'该用户不存在'
      },
      data:null
    })
  }
    let deleteUserOne = await User.deleteOne({_id})
    let {ok} = deleteUserOne
    if(ok){
      return res.send({
        meta:{
          state:200,
          msg:'删除用户成功'
        },
        data:null
      })
    }
    return res.send({
      meta:{
        state:500,
        msg:'服务器错误'
      },
      data:null
    })
}

/**
 * @api {get} /user/getOneUserInfo/:id 查询单个用户
 * @apiName getOneUserInfo
 * @apiGroup User
 *
 * @apiParam {String} id 用户id
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 查询单个用户
module.exports.getOneUserInfo =async (req, res) => {
  let _id = req.params.id
  let findBackData =await findBySpe(User,{_id}, (data) => {
    return data
  })
  if(findBackData){
    return res.send({
      meta:{
        state:200,
        msg:'查询数据成功'
      },
      data:findBackData
    })
  }
  return res.send({
    meta:{
      state:400,
      msg:'查询数据失败'
    },
    data:null
  })
}

/**
 * @api {get} /user/getAllUser 查询全部用户
 * @apiName getAllUser
 * @apiGroup User
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 查询全部用户数据
module.exports.getAllUserInfo =async (req, res) => {
  const findAlldb =await findAllData(User, (data) => {
    return data
  })
  if(findAlldb){
    return res.send({
      meta:{
        state:200,
        msg:'查询数据成功'
      },
      data:findAlldb
    })
  }
  return res.send({
    meta:{
      state:400,
      msg:'不存在数据'
    },
    data:null
  })
}

/**
 * @api {post} /user/addAttendShop 新增关注店铺
 * @apiName addAttendShop
 * @apiGroup User
 *
 * @apiParam {String} userId 用户id
 * @apiParam {String} shopId 店铺id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */



// 新增关注店铺
module.exports.addAttendShop =async (req, res) => {
  let {userId, shopId} = req.body
  let findUser =await User.findOne({_id:userId}).catch(err => {
    return -1
  })
  // 查看user是否存在
  if(findUser === -1){
    return res.send({
      meta:{
        state:400,
        msg:'该用户不存在'
      },
      data:null,
    })
  }
  let findShop = await Shop.findOne({_id:shopId}).catch(err => {
    return -1
  })
  // 查看shop是否存在
  if(findShop === -1) {
    return res.send({
      meta:{
        state:400,
        msg:'该店铺不存在'
      },
      data:null
    })
  }
  // 查看是否已经关注该店铺
  let attentionShop = findUser.attentionShop
  let ss = attentionShop.find(item => item == shopId)
  if(ss){
    return res.send({
      meta:{
        state:200,
        msg:'已经关注该店铺'
      },
      data:null
    })
  }
  findUser.attentionShop.push(findShop)
  await findUser.save()
  return res.send({
    meta:{
      state:200,
      msg:'关注店铺成功'
    },
    data:null
  })
}

/**
 * @api {get} /user/checkAttendShop/:id 查看全部关注的店铺
 * @apiName checkAttendShop
 * @apiGroup User
 *
 * @apiParam {String} userId 用户id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 查看全部关注的店铺
module.exports.checkAttendShop =async (req, res) => {
  let _id = req.params.id
  let findUser =await User.findOne({_id}).populate('attentionShop').catch(err => {
    return -1
  })
  if(findUser === -1){
    return res.send({
      meta:{
        state:400,
        msg:'不存在该用户'
      },
      data:null
    })
  }
  return res.send({
    meta:{
      state:200,
      msg:'查询成功'
    },
    data:findUser.attentionShop
  })
} 

/**
 * @api {post} /user/cancelAttendShop  取消关注店铺
 * @apiName cancelAttendShop
 * @apiGroup User
 *
 * @apiParam {String} userId 用户id
 * @apiParam {String} goodId 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 取消关注店铺
module.exports.cancelAttendShop =async (req, res) => {
  let {userId, shopId} = req.body
  let findUser =await User.findOne({_id:userId}).catch(err => {
    return -1
  })
  if(findUser === -1){
    res.send({
      meta:{
        state:400,
        msg:'不存在该用户'
      },
      data:null
    })  
  }
  let userAtten = findUser.attentionShop
  let findIndex = userAtten.findIndex(item => item == shopId)
  userAtten.splice(findIndex, 1)
  findUser.save()
  return res.send({
    meta:{
      state:200,
      msg:'已取消关注该店铺'
    },
    data:null
  })
}

/**
 * @api {post} /user/addLikeGoods  新增用户喜欢商品
 * @apiName addLikeGoods
 * @apiGroup User
 *
 * @apiParam {String} userId 用户id
 * @apiParam {String} goodId 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 新增喜欢的商品
module.exports.addLikeGoods =async (req, res) => {
  let {goodId,userId} =await req.body
  let findUser =await User.findOne({_id:userId}).catch(err => -1)
  let findGood =await goods.findOne({_id:goodId}).catch(err => -1)
  if(findUser === -1){
    return res.send({
      meta:{
        state:400,
        msg:'该用户不存在'
      },
      data:null
    })
  }
  if(findGood === -1){
    return res.send({
      meta:{
        state:400,
        msg:'该商品不存在'
      },
      data:null
    })
  }
  let isSave = false
  for(let i in findUser.likeGoods){
    if(findUser.likeGoods[i] == goodId){
      isSave = true
    }
  }
  if(isSave){
    return res.send({
      meta:{
        state:200,
        msg:'已添加该商品'
      },
      data:null
    })
  }
  findUser.likeGoods.push(findGood)
  findUser.save()
  return res.send({
    meta:{
      state:200,
      msg:'添加商品成功'
    },
    data:null
  })
}

/**
 * @api {get} /user/findAllLikeGoods/:id  查询全部喜欢的商品
 * @apiName findAllLikeGoods
 * @apiGroup User
 *
 * @apiParam {String} userId 用户id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 查询全部喜欢的商品
module.exports.findAllLikeGoods =async (req, res) => {
  let _id = req.params.id
  let findOneUser =await User.findOne({_id}).populate('likeGoods').catch(err => -1)
  if(findOneUser === -1){
    return res.send({
      meta:{
        state:400,
        msg:'不存在用户'
      },
      data:null
    })
  }
  return res.send({
    meta:{
      state:200,
      msg:'查询数据成功'
    },
    data:findOneUser.likeGoods
  })
}

/**
 * @api {post} /user/deleteLikeGood  删除喜欢商品
 * @apiName deleteLikeGood
 * @apiGroup User
 *
 * @apiParam {String} userId 用户id
 * @apiParam {String} goodId 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 取消喜欢的商品
module.exports.deleteLikeGood =async (req, res) => {
  let {userId, goodId} = req.body
  let findUser =await User.findOne({_id:userId}).catch(err => -1)
  if(findUser === -1){
    return res.send({
      meta:{
        state:400,
        msg:'该用户不存在'
      },
      data:null
    })
  }
  let deleteIndex = findUser.likeGoods.findIndex(item => item == goodId)
  findUser.likeGoods.splice(deleteIndex, 1)
  findUser.save()
  return res.send({
    meta:{
      state:200,
      msg:'取消喜欢成功'
    },
    data:null
  })
}

/**
 * @api {post} /user/payAttention  关注用户
 * @apiName payAttention
 * @apiGroup User
 *
 * @apiParam {String} myId 我的id
 * @apiParam {String} userId 关注用户的id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

//关注用户
module.exports.payAttention =async (req, res) => {
  let {myId, userId} = req.body
  let myContent =await User.findOne({_id:myId}).catch(err => -1)
  let userOne =await User.findOne({_id:userId}).catch(err => -1)
  if(myContent === -1 || userOne === -1){
    return res.send({
      meta:{
        state:400,
        msg:'个人或者关注者的信息不存在'
      },
      data:null
    })
  }
  let findUser = myContent.attentionUser
  let findIndex = findUser.findIndex(item => item == userId)
  if(findIndex === -1){
    myContent.attentionUser.push(userId)
    myContent.save()
    return res.send({
      meta:{
        state:200,
        msg:'关注用户成功'
      },
      data:null
    })
  }else{
    res.send({
      meta:{
        state:200,
        msg:'已经关注该用户'
      },
      data:null
    })
  }
}

/**
 * @api {post} /user/cancelAttendUser  取消关注用户
 * @apiName cancelAttendUser
 * @apiGroup User
 *
 * @apiParam {String} myId 我的id
 * @apiParam {String} userId 关注用户的id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 取消关注该用户
module.exports.cancelAttendUser =async (req, res) => {
  let {myId, userId} = req.body
  let my =await User.findOne({_id:myId}).catch(err => -1)
  if(my !== -1){
    let userIndex = my.attentionUser.findIndex(item => item == userId)
    if(userIndex === -1){
      return res.send({
        meta:{
          state:400,
          msg:'没有关注该用户'
        },
        data:null
      })
    }
    my.attentionUser.splice(userIndex, 1)
    my.save()
    return res.send({
      meta:{
        state:200,
        msg:'取消关注'
      },
      data:null
    })
  }
}

/**
 * @api {get} /user/getAllFans/:id  查看该用户粉丝
 * @apiName getAllFans
 * @apiGroup User
 *
 * @apiParam {String} userId 用户的id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 查看全部的粉丝
module.exports.getAllFans =async (req, res) => {
  let _id = req.params.id
  let myFans =await User.findOne({_id}).populate('fans').lean().catch(err => -1)
  if(myFans !== -1){
    return res.send({
      meta:{
        state:200,
        msg:'查找成功'
      },
      data:myFans.fans
    })
  }
  return res.send({
    meta:{
      state:400,
      msg:'查找失败'
    },
    data:null
  })
}

/**
 * @api {get} /user/getAllAttens/:id  查看关注列表
 * @apiName getAllAttens
 * @apiGroup User
 *
 * @apiParam {String} userId 用户的id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 查看关注列表
module.exports.getAllAttens = async(req, res) => {
  let _id = req.params.id
  let findUser =await User.findOne({_id}).populate('attentionUser').catch(err => -1)
  if(findUser === -1){
    return res.send({
      meta:{
        meta:{
          state:400,
          msg:'不存在该用户'
        },
        data:null
      }
    })
  }
  return res.send({
    meta:{
      state:200,
      msg:'查找成功'
    },
    data:findUser.attentionUser
  })
}

/**
 * @api {post} /user/addViewsHistory 新增浏览记录
 * @apiName addViewsHistory
 * @apiGroup User
 *
 * @apiParam {String} userId 用户的id
 * @apiParam {String} goodId 商品的id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 浏览记录
module.exports.addViewsHistory =async (req, res) => {
  let {userId, goodId} = req.body
  let findUser =await User.findOne({_id:userId}).catch(err => -1)
  if(findUser === -1){
    return res.send({
      meta:{
        meta:400,
        msg:'不存在该用户'
      },
      data:null
    })
  }
  let findIndex = findUser.viewsHistory.findIndex(item => item == goodId)
  if(findIndex !== -1){
    return res.send({
      meta:{
        state:200,
        msg:'浏览过该商品'
      },
      data:null
    })
  }
  findUser.viewsHistory.push(goodId)
  findUser.save()
  return res.send({
    meta:{
      state:200,
      msg:'添加该商品'
    },
    data:null
  })
}

/**
 * @api {get} /user/getAllViewsHistory/:id 查看全部的浏览记录
 * @apiName getAllViewsHistory
 * @apiGroup User
 *
 * @apiParam {String} userId 用户的id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 查看全部的浏览记录
module.exports.getAllViewsHistory =async (req, res) => {
  let _id = req.params.id
  let findUser =await User.findOne({_id}).populate('viewsHistory').lean().catch(err => -1)
  if(findUser === -1){
    return res.send({
      meta:{
        state:200,
        msg:'不存在该用户'
      }
    })
  }
  return res.send({
    meta:{
      state:200,
      msg:'查找成功'
    },
    data:findUser.viewsHistory
  })
}

/**
 * @api {post} /user/deleteViewHistoryOne 删除一条浏览记录
 * @apiName deleteViewHistoryOne
 * @apiGroup User
 *
 * @apiParam {String} userId 用户的id
 * @apiParam {String} goodId 商品的id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 删除一条浏览记录
module.exports.deleteViewHistoryOne =async (req, res) => {
  let {userId, goodId} = req.body
  let findUser =await User.findOne({_id:userId}).catch(err => -1)
  if(findUser === -1) {
    return res.send({
      meta:{
        state:200,
        msg:'不存在该用户'
      },
      data:null
    })
  }
  let findIndex = findUser.viewsHistory.findIndex(item => item == goodId)
  if(findIndex !== -1){
    findUser.viewsHistory.splice(findIndex, 1)
    findUser.save()
  }
  return res.send({
    meta:{
      state:200,
      msg:'已删除该浏览记录'
    },
    data:null
  })
}

/**
 * @api {get} /user/deleteAllHistroy/:id 删除全部的浏览记录
 * @apiName deleteAllHistroy
 * @apiGroup User
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 删除全部的浏览记录
module.exports.deleteAllHistroy = async (req, res) => {
  let _id = req.params.id
  let findUser =await User.findOne({_id}).catch(err => -1)
  if(findUser === -1){
    return res.send({
      meta:{
        state:400,
        msg:'查找不到该用户'
      },
      data:null
    })
  }
  findUser.viewsHistory = []
  findUser.save()
  return res.send({
    meta:{
      state:200,
      msg:'浏览记录已清空'
    },
    data:null
  })
}

/**
 * @api {post} /user/addGoodToCart 添加商品进购物车
 * @apiName addGoodToCart
 * @apiGroup User
 * 
 * @apiParam {String} userId 用户id
 * @apiParam {String} goodId 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 添加商品进入购物车
module.exports.addGoodToCart =async (req, res) => {
  let {userId, goodId} = req.body
  let findUser =await User.findOne({_id:userId}).populate('carts').catch(err => -1)
  if(findUser === -1){
    return res.send({
      meta:{
        state:400,
        msg:'不存在该用户'
      },
      data:null
    })
  }
  // 判断是否存在goods
  let isSave = false
  // 当前的good
  let currentGood
  for(let i of findUser.carts){
    if(i.goodId == goodId){
      isSave = true
      currentGood = i
    }
  }
  // 当存在时
  if(isSave){
    currentGood.Num += 1
    currentGood.save()
    return res.send({
      meta:{
        state:200,
        msg:'商品数量加一'
      },
      data:currentGood
    })
  }else{
    let addCart = await new Cart({goodId}).save().catch(err => -1)
    findUser.carts.push(addCart._id)
    findUser.save()
    return res.send({
      meta:{
        state:200,
        msg:'新增一个商品'
      },
      data:null
    })
  }
}

/**
 * @api {post} /user/removeOneGood 从购物车中删除该商品
 * @apiName removeOneGood
 * @apiGroup User
 * 
 * @apiParam {String} userId 用户id
 * @apiParam {String} goodId 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 将商品从购物车中去除
module.exports.removeOneGood =async (req, res) => {
  let {userId, goodId} = req.body
  let findUer = await User.findOne({_id:userId}).populate('carts').catch(err => -1)
  if(findUer === -1){
    return res.send({
      meta:{
        state:400,
        msg:'不存在该用户'
      },
      data:null
    })
  }
  let cartsgood = findUer.carts
  let currentIndex 
  // cartId用于删除购物车
  let cartId 
  for(let i in cartsgood){
    if(cartsgood[i].goodId == goodId){
      currentIndex = i
      cartId = cartsgood[i]._id
    }
  }
  // 从cart表中删除购物车信息
  let ss = await Cart.deleteOne({_id:cartId})
  cartsgood.splice(currentIndex, 1)
  findUer.save()
  return res.send({
    meta:{
      state:200,
      msg:'已将该商品从购物车中去除'
    },
    data:null
  })
}


/**
 * @api {get} /user/clearGoodsCart/:id 清空购物车
 * @apiName clearGoodsCart
 * @apiGroup User
 * 
 * @apiParam {String} userId 用户id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 清空购物车
module.exports.clearGoodsCart =async (req, res) => {
  let _id = req.params.id
  let findUser = await User.findOne({_id}).populate('carts').catch(err => -1)
  if(findUser === -1){
    return res.send({
      meta:{
        state:400,
        msg:'该用户不存在'
      },
      data:null
    })
  }else{
    // 将该用户的信息全部从Cart表中删除
    let carts = findUser.carts
    for(let i of carts){
      await Cart.deleteOne(i)
    }
    findUser.carts = []
    findUser.save()
    return res.send({
      meta:{
        state:200,
        msg:'购物车已清空'
      },
      data:null
    })
  }
}

/**
 * @api {post} /user/withdrawComment 撤回评论
 * @apiName withdrawComment
 * @apiGroup User
 * 
 * @apiParam {String} userId 用户id
 * @apiParam {String} goodId 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 删除该评论
module.exports.withdrawComment =async (req, res) => {
  let {userId, goodId} = req.body
  let findComment =await Assess.find({commentUser:userId}).populate('good').lean().catch(err => -1)
  if(findComment === -1){
    return res.send({
      meta:{
        state:500,
        msg:'服务器错误'
      },
      data:null
    })
  }
  for(let i of findComment){
    if(i.good._id == goodId){
      await Assess.deleteOne({_id:i._id})
    }
  }
  return res.send({
    meta:{
      state:200,
      msg:'删除成功'
    },
    data:null
  })
}
