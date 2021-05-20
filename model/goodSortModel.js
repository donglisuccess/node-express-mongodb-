const {
  db,
  Schema,
} = require('./database')

const GoodSchema = Schema({
  title:{
    type:String,
    required:true
  }
})

GoodSchema.virtual('goodlist', {
  ref:'Good', 
  localField: '_id',
  foreignField:'goodSort',
  justOne:false
})

let GoodSort = db.model('Sort', GoodSchema)

module.exports = {
  GoodSort
}