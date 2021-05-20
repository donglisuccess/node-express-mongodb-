const mongoose = require('mongoose')
const { db, Schema } = require('./database')

const cartSchema = Schema({
  goodId:{
    type:String,
    default:''
  },
  Num:{
    type:Number,
    default:1
  }
})

const Cart = db.model('Cart', cartSchema)

module.exports = {
  db,
  Cart
}