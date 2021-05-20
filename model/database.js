const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = mongoose.createConnection('mongodb://dmc:forddl@localhost:27017/jingdong',{useUnifiedTopology: true , useNewUrlParser: true}, err => {
  if(err){
    console.log('***********************************')
    console.log('数据库打开失败')
    console.log('***********************************')
  }else{
    console.log('***************************************************************')
    console.log('数据库已开启')
    console.log('***************************************************************')
  }
})


module.exports = {
  db,
  Schema,
}