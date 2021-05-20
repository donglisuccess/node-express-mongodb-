// 导入工具
const {findBySpe,findAllData} = require('../utils/utils')

const {goods} = require('../model/goodsModel')
const {GoodSort} = require('../model/goodSortModel')



/**
 * @api {post} /goods/addGood 新增一个商品
 * @apiName addGood
 * @apiGroup Goods
 *
 * @apiParam {String} goodsName 商品名称
 * @apiParam {String} goodsInfo 商品信息
 * @apiParam {Number} goodsPrice 商品价格
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 添加一个商品
module.exports.addGood =async (req,res) => {
  let body = req.body
  let {goodsName} = body
  let againGood =await goods.findOne({goodsName}).catch(err => {
    return []
  })
  if(againGood){
    return res.send({
      meta:{
        state:200,
        msg:'该商品已存在'
      },
      data:null
    })
  }else{
    const newgood = await new goods(body).save()
    res.send({
      meta:{
        state:200,
        msg:'添加一个商品'
      },
      data:newgood
    })
  }
}

/**
 * @api {get} /goods/getGood/:id 获取商品信息
 * @apiName getGood
 * @apiGroup Goods
 *
 * @apiParam {String} id 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 获取商品
module.exports.getGood =async (req, res) => {
  let _id = req.params.id
  let findGood = await goods.findOne({_id}).catch(err => {
    return false
  })
  if(findGood){
    return res.send({
      meta:{
        state:200,
        msg:'查询数据成功'
      },
      data:findGood
    })
  }else{
    return res.send({
      meta:{
        state:400,
        msg:'查询不到该数据'
      },
      data:null
    })
  }
}

/**
 * @api {put} /goods/updateGood/:id 更新商品信息
 * @apiName updateGood
 * @apiGroup Goods
 *
 * @apiParam {String} id 商品id
 * @apiParam {String} goodsName 商品名称
 * @apiParam {String} goodsImage 商品图片(多张图片中间用空格连接起来)
 * @apiParam {String} goodsInfo 商品简介
 * @apiParam {Number} goodsPrice 商品价格
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 更新数据
module.exports.updateGood =async (req,res) =>{
  let _id = req.params.id
  let body = req.body
  let findGoodById = await goods.findOne({_id}).catch(err => {
    return false
  })
  if(!findGoodById){
    return res.send({
      meta:{
        state:400,
        msg:'不存在该商品'
      },
      data:null
    })
  }else{
    const data = await goods.updateOne({_id}, {$set:body})
    const {ok} = data
    if(ok){
      return res.send({
        meta:{
          state:200,
          msg:'数据修改成功'
        },
        data:null
      })
    }else{
      return res.send({
        meta:{
          state:200,
          msg:'服务器错误'
        },
        data:null
      })
    }
  }
}

/**
 * @api {delete} /goods/deleteGood/:id 删除商品信息
 * @apiName deleteGood
 * @apiGroup Goods
 *
 * @apiParam {String} id 商品id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 删除数据
module.exports.deleteGood =async (req, res) =>{
  let _id = req.params.id
  let findOneById =await goods.findOne({_id}).catch(err => {
    return false
  })
  if(!findOneById){
    return res.send({
      meta:{
        state:400,
        msg:'不存在该数据'
      },
      data:null
    })
  }
  let deleteOne =await goods.deleteOne({_id}) 
  let {ok} = deleteOne
  if(ok){
    return res.send({
      meta:{
        state:200,
        msg:'删除成功'
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
 * @api {get} /goods/getAllGood 查询全部数据
 * @apiName getAllGood
 * @apiGroup Goods
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 查询全部商品
module.exports.getAllGood =async (req, res) => {
  const findAllDb= await findAllData(goods, (data) => {
    return data
  }) 
  if(findAllDb){
    return res.send({
      meta:{
        state:200,
        msg:'数据查询成功'
      },
      data:findAllDb
    })
  }
  return res.send({
    meta:{
      state:400,
      msg:'数据不存在',
    },
    data:null
  })
}
 

/**
 * @api {get} /goods/setGoodSort  给商品设置一个分类
 * @apiName setGoodSort
 * @apiGroup Goods
 * 
 * @apiParam {String} goodId 商品id
*  @apiParam {String} sortId 分类id
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 设置分类
// 参数  goodId(商品id) , sortId(分类)
module.exports.setGoodSort =async (req, res) => {
  let query = req.query
  let {goodId,sortId} = query
  const good = await goods.findOne({_id:goodId}).populate('goodSort')
  const sort = await GoodSort.findOne({_id:sortId})
  // 在添加前先判断是否sort是否存在
  console.log(good)
  console.log(sort)
  let addSort = good.goodSort.find(item => item.title === sort.title)
  console.log(good)
  if(!addSort){
    good.goodSort.push(sort)
    good.save()
    return res.send({
      meta:{
        state:200,
        msg:'添加类别成功'
      },
      data:null
    })
  }else{
    return res.send({
      meta:{
        state:200,
        msg:'该类别已经添加'
      },
      data:null
    })
  }
}

/**
 * @api {get} /goods/getAllGoodAssess/:id  查看商品的全部评论
 * @apiName getAllGoodAssess
 * @apiGroup Goods
 * 
 * @apiParam {String} goodId 商品id
 *
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

module.exports.getAllGoodAssess =async (req, res) => {
  let _id = req.params.id
  let findGood =await goods.findOne({_id}).populate('userAssess').catch(err => {
    return -1
  })
  // 这里-1为请求错误
  if(findGood === -1){
    res.send({
      meta:{
        state:400,
        msg:'不存在该商品'
      },
      data:null
    })
  }else{
    res.send({
      meta:{
        state:200,
        msg:'请求成功'
      },
      data:findGood.userAssess
    })
  }
}



