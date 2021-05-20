// 这里是一些公用的方法
// 根据id查询是否存在
module.exports.findBySpe =async (colletions ,obj, callback) => {
  let findData =await colletions.findOne(obj).catch(err => {
    return false
  })
  return callback(findData)
}

// 查询colletions中的全部数据
module.exports.findAllData =async (colletions, callback) => {
  let findAll = await colletions.find({}).catch(err => {
    return false
  })
  return callback(findAll)
}
