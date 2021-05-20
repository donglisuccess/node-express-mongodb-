// 导出工具
const {findBySpe,findAllData} = require('../utils/utils')

// 引入数据库模型
const {Shop} = require('../model/shopModel')
const {goods} = require('../model/goodsModel')


/**
 * @api {post} /shop/addShop  新增店铺
 * @apiName getOneUserInfo
 * @apiGroup Shop
 *
 * @apiParam {String} shopName 店铺名称
 * @apiParam {String} shopInfo 店铺介绍
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 新增店铺
module.exports.addShop = async (req, res) => {
  let addShop = req.body
  let {shopName} = addShop
  let againShop = await Shop.findOne({shopName})
  if(againShop){
    return res.send({
      meta:{
        state:200,
        msg:'该店铺已经存在'
      },
      data:null
    })
  }
  const newShopInfo = await new Shop(addShop).save()
  if(newShopInfo){
    return res.send({
      meta:{
        state:200,
        msg:'注册店铺成功'
      },
      data:newShopInfo
    })
  }else{
    return res.send({
      meta:{
        state:500,
        msg:'服务器错误'
      },
      data:null
    })
  }
}

/**
 * @api {get} /shop/getShopInfo/:id  查询店铺信息
 * @apiName getShopInfo
 * @apiGroup Shop
 *
 * @apiParam {String} id 店铺id
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 查询店铺信息
module.exports.getShopInfo =async (req, res) => {
  let _id = req.params.id
  const findShopById = await Shop.findOne({_id}).catch(err=>{
    return []
  })
  if(findShopById.length !== 0) {
    return res.send({
      meta:{
        state:200,
        msg:'查询店铺成功',
      },
      data:findShopById,
    })
  }else{
    return res.send({
      meta:{
        state:200,
        msg:'不存在该数据'
      },
      data:null
    })
  }
}

/**
 * @api {put} /shop/updateShopInfo/:id  更新店铺信息
 * @apiName updateShopInfo
 * @apiGroup Shop
 *
 * @apiParam {String} id 店铺id
 * @apiParam {String} shopName 店铺名称
 * @apiParam {String} shopInfo 店铺介绍
 * @apiParam {String} shopImage 店铺图片
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 更新店铺数据
module.exports.updateShopInfo =async (req, res) => {
  let _id = req.params.id
  let queryDate = req.body
  let findShopOne =  await Shop.findOne({_id}).catch(err => {
    return []
  })
  if(findShopOne.length !== 0){
    let shopAfterData = await Shop.updateOne({_id},{$set:queryDate})
    let {ok} = shopAfterData
    if(ok){
      return res.send({
        meta:{
          state:200,
          msg:'修改成功'
        },
        data:null
      })
    }else{
      return res.send({
        meta:{
          state:500,
          msg:'服务器失败'
        },
        data:null
      })
    }
  }else{
    return res.send({
      meta:{
        state:200,
        msg:'不存在该店铺'
      },
      data:null
    })
  }
}

/**
 * @api {delete} /shop/deleteShop/:id  删除店铺
 * @apiName deleteShop
 * @apiGroup Shop
 *
 * @apiParam {String} id 店铺id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 删除店铺
module.exports.deleteShop =async (req, res) => {
  let _id = req.params.id
  let queryData =await Shop.deleteOne({_id}).catch(err => {
    return {n:0,ok:1,deletedCount:0}
  })
  let {ok,deletedCount} = queryData
  if(ok && deletedCount){
    return res.send({
      meta:{
        state:200,
        msg:'删除成功'
      },
      data:null
    })
  }else{
    return res.send({
      meta:{
        state:400,
        msg:'不存在该店铺'
      },
      data:null
    })
  }
}

/**
 * @api {get} /shop/getAllShopInfo  查询全部的店铺数据
 * @apiName getAllShopInfo
 * @apiGroup Shop
 *
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 查询全部的店铺数据
module.exports.getAllShopInfo =async (req, res) =>{
  const getShopInfo = await findAllData(Shop, (db) => {
    return db
  })
  if(getShopInfo){
    return res.send({
      meta:{
        state:200,
        msg:'数据查询成功'
      },
      data:getShopInfo
    })
  }
  return res.send({
    meta:{
      state:200,
      msg:'数据查询失败'
    },
    data:null
  })
}

/**
 * @api {post} /shop/addGoodToShop  给店铺新增一个商品
 * @apiName addGoodToShop
 * @apiGroup Shop
 *
 * @apiParam {String} shopId 店铺id
 * @apiParam {String} goodId 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 给店铺新增一个商品
module.exports.addGoodToShop =async (req, res) => {
  let body = req.body
  let {shopId, goodId } = body
  let shopOne =await Shop.findOne({_id:shopId}).populate('goodsList') 
  // 判断是否存在
  let isSave = false
  for(let item of shopOne.goodsList){
    if(item._id == goodId){
      isSave = true
    }
  }
  if(isSave){
    return res.send({
      meta:{
        state:200,
        msg:'已经添加过该商品'
      },
      data:null
    })
  }
  let goodOne =await goods.findOne({_id:goodId})
  shopOne.goodsList.push(goodOne)
  let shopSave = await shopOne.save().catch(err => {
    return false
  })
  if(shopSave){
    return res.send({
      meta:{
        state:200,
        msg:'商品添加成功'
      },
      data:null
    })
  }
}

/**
 * @api {get} /shop/getAllGoodFromShop/:id 获取全部的商品
 * @apiName getAllGoodFromShop
 * @apiGroup Shop
 *
 * @apiParam {String} shopId 店铺id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 获取店铺的全部商品
module.exports.getAllGoodFromShop =async (req, res) => {
  let _id = req.params.id
  let shopOne = await Shop.findOne({_id}).populate('goodsList').catch(err => -1)
  if(shopOne === -1){
    return res.send({
      meta:{
        state:400,
        msg:'不存在该店铺'
      },
      data:null
    })
  }
  res.send({
    meta:{
      state:200,
      msg:'查询数据成功'
    },
    data:shopOne.goodsList
  })
}

/**
 * @api {delete} /shop/deleteGoodFromShop 从店铺中删除商品
 * @apiName deleteGoodFromShop
 * @apiGroup Shop
 *
 * @apiParam {String} shopId 店铺id
 * @apiParam {String} goodId 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 从店铺中去除该商品
module.exports.deleteGoodFromShop =async (req, res) => {
  let {shopId, goodId } = req.body
  let shopOne =await Shop.findOne({_id:shopId}).catch(err => {
    return -1
  })
  if(shopOne === -1){
    return res.send({
      meta:{
        state:400,
        msg:'不存在该店铺'
      },
      data:null
    })
  }
  let goodsAll = shopOne.goodsList
  let findIndex = goodsAll.findIndex(item => item == goodId)
  if(findIndex === -1){
    return res.send({
      meta:{
        state:400,
        msg:'该店铺不存在该商品'
      },
      data:null
    })
  }
  goodsAll.splice(findIndex, 1)
  shopOne.save()
  return res.send({
    meta:{
      state:200,
      msg:'已将该商品从该店铺中移除'
    },
    data:null
  })
} 

/**
 * @api {delete} /shop/deleteAllGoods/:id 清空店铺中的全部商品
 * @apiName deleteAllGoods
 * @apiGroup Shop
 *
 * @apiParam {String} shopId 店铺id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 清空店铺中的全部商品
module.exports.deleteAllGoods =async (req, res) => {
  let _id = req.params.id
  let shopOne =await Shop.findOne({_id}).catch(err => {
    return -1
  })
  if(shopOne === -1){
    return res.send({
      meta:{
        state:200,
        msg:'不存在该店铺'
      },
      data:null
    })
  }
  shopOne.goodsList = []
  let lstShop = await shopOne.save()
  if(lstShop){
    return res.send({
      meta:{
        state:200,
        msg:'删除成功'
      },
      data:null
    })
  }
}

/**
 * @api {get} /shop/getAllFans/:id 获取店铺的所有粉丝
 * @apiName getAllFans
 * @apiGroup Shop
 *
 * @apiParam {String} shopId 店铺id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 获取店铺的全部粉丝
module.exports.getAllFans =async (req ,res) => {
  let _id = req.params.id
  let findShop =await Shop.findOne({_id}).populate('fans').lean().catch(err => -1)
  if(findShop === -1){
    return res.send({
      meta:{
        state:400,
        msg:'不存在该店铺'
      },
      data:null
    })
  }
  return res.send({
    meta:{
      state:200,
      msg:'查找店铺粉丝成功'
    },
    data:findShop.fans
  })
}