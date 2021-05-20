// 引入model
const {GoodSort} = require('../model/goodSortModel')
const {goods} = require('../model/goodsModel')

// 导入工具模块
const {findBySpe,findAllData} = require('../utils/utils')

/**
 * @api {post} /sorts/addGoodSort  添加一个分类
 * @apiName addGoodSort
 * @apiGroup sort
 *
 * @apiParam {String} title 分类名称
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 添加分类
module.exports.addGoodSort =async (req, res) => {
  let body = req.body
  let {title} = body
  let findGood =await findBySpe(GoodSort, {title}, (data) => {
    return data
  })
  if(findGood){
    return res.send({
      meta:{
        state:400,
        msg:'该分类已存在'
      },
      data:null
    })
  }
  let addGoods =await new GoodSort(body).save().catch(err => {
    return false
  })
  if(addGoods){
    return res.send({
      meta:{
        state:200,
        msg:'保存数据成功'
      },
      data:addGoods
    })
  }else{
    return res.send({
      meta:{
        state:500,
        msg:'保存数据失败'
      },
      data:null
    })
  }
}

/**
 * @api {delete} /sorts/deleteSortById/:id  删除一个分类
 * @apiName deleteSortById
 * @apiGroup sort
 *
 * @apiParam {String} id 分类id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 删除分类
module.exports.deleteSortById =async (req, res) => {
  let _id = req.params.id
  let findSort = await findBySpe(GoodSort, {_id}, (data) => {
    return data
  })
  if(!findSort){
    return res.send({
      meta:{
        meta:{
          state:400,
          msg:'该分类不存在'
        }
      },
      data:null
    })
  }
  let delSort =await GoodSort.deleteOne({_id}).catch(err => {
    return false
  })
  let {ok} = delSort
  if(ok){
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
 * @api {put} /sorts/updateSort/:id  修改一个分类
 * @apiName updateSort
 * @apiGroup sort
 *
 * @apiParam {String} id 分类id
 * @apiParam {String} title 分类名称
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */


// 修改分类
module.exports.updateSort =async (req, res) => {
  let _id = req.params.id
  let query = req.body
  let {title} = query
  // 通过id查询
  let findSort =await findBySpe(GoodSort, {_id}, (data) => {
    return data
  })
  // 通过title
  let findTitle = await findBySpe(GoodSort, {title}, (data) => {
    return data
  }) 
  if(!findSort){
    return res.send({
      meta:{
        state:400,
        msg:'该id不存在'
      },
      data:null
    })
  }
  if(findTitle){
    return res.send({
      meta:{
        state:200,
        msg:'该title已存在'
      },
      data:null
    })
  }
  let { ok } =await GoodSort.updateOne({_id},{$set:query})
  if(ok){
    return res.send({
      meta:{
        state:200,
        msg:'修改数据成功'
      },
      data:null
    })
  }
}

/**
 * @api {get} /sorts/getAllSort  查询全部的分类
 * @apiName getAllSort
 * @apiGroup sort
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 查询全部分类
module.exports.getAllSort =async (req, res) => {
  let allSort =await findAllData(GoodSort, (data) => {
    return data
  })
  if(!allSort){
    return res.send({
      meta:{
        state:500,
        msg:'服务器错误'
      },
      data:null
    })
  }
  return res.send({
    meta:{
      state:200,
      msg:'查询数据成功'
    },
    data:allSort
  })
}

/**
 * @api {get} /sorts/getSortAllGood/:id  查询该类别下全部产品
 * @apiName getSortAllGood
 * @apiGroup sort
 * 
 * @apiParam {String} id 分类id
 * 
 * @apiSuccess {Object} meta 返回状态
 * @apiSuccess {Object} data 返回数据
 */

// 查询该类别下面的全部商品
module.exports.getSortAllGood =async (req, res) => {
  let _id = req.params.id
  let findSortGood =await GoodSort.findOne({_id}).populate('goodlist').lean()
  if(findSortGood.goodlist.length === 0){
    return res.send({
      meta:{
        state:200,
        msg:'该分类下面不包含任何商品'
      },
      data:[]
    })
  }else{
    return res.send({
      meta:{
        state:200,
        msg:'查询成功'
      },
      data:findSortGood.goodlist
    })
  }
}