var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema ({
  "productId": Number,
  "productName": String,
  "salePrice": Number,
  "productImage": String,
  "productNum": Number,
  "checked": Boolean
})

module.exports = mongoose.model('Product', productSchema, 'products')