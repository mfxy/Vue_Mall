var mongoose = require('mongoose')

var usersSchema = new mongoose.Schema({
  "userId": String,
  "ueserName": String,
  "userPwd": String,
  "cartList": [
    {
      "productId": Number,
      "productName": String,
      "salePrice": Number,
      "productImage": String,
      "productNum": Number,
      "checked": Boolean
    }
  ],
  "orderList": Array,
  "addressList": Array
})

module.exports = mongoose.model("User", usersSchema, "users")