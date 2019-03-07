var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Products = require('../models/products');
var Users = require('../models/users')

/* Connent to mongoDB */
mongoose.connect('mongodb://127.0.0.1:27017/vmall', {useNewUrlParser:true}, (error, res) => {
  if (error) {
    console.log(`MongoDB connected error.${error}`)
  } else {
    console.log('MongoDB connected success.')
  }
});

/* GET products listing. */
router.get('/', (req, res, next) => {
//   res.send('respond with products.');
  // let page = parseInt(req.param('page')) // deprecated
  let page = parseInt(req.query.page)
  let pageSize = parseInt(req.query.pageSize)
  let skip = pageSize*(page-1)
  let sort = parseInt(req.query.sort)
  let range = req.query.range
  let find = {}
  if (range) {
    let gte, lt
    switch (range) {
      case '0': gte = 0; lt=500; break;
      case '1': gte = 500; lt=1000; break;
      case '2': gte = 1000; lt=1500; break;
    }
    find = {
      salePrice: {
        $gte: gte,
        $lt: lt
      }
    }
  }

  let productsList = Products.find(find).skip(skip).limit(pageSize).sort({salePrice:sort})
  // Products.find({}, (err, doc) => {
  productsList.exec((err, doc) => {
    if (err) {
      res.json({
        code: '1',
        msg: err.message
      })
    } else {
      res.json({
        code: '0',
        msg: 'success',
        content: {
          count: doc.length,
          dataList: doc
        }
      })
    }
  })
});

/* POST addItem */
router.post('/addItem', (req, res, next) => {
  let userId = '0001'
  let productId = parseInt(req.body.productId)
  Users.findOne({userId}, (userErr, userDoc) => {
    if (userErr) { // 查找用户接口报错
      res.json({
        code: '1',
        msg: userErr.message
      })
    } else {
      console.log('userDoc', userDoc)
      if (userDoc) { // 查找用户接口成功，且找到用户
        // 判断购物车中是否有相同物品
        let hasItem = false
        userDoc.cartList.map(item => {
          if (item.productId === productId) {
            // let price = item.salePrice / item.productNum // 单价
            item.productNum ++
            // item.salePrice = price * item.productNum
            hasItem = true
          }
        })
        if (hasItem) { // 购物车中有相同物品
          userDoc.save((updateCartErr, updateCartDoc) => {
            if (updateCartErr) {
              res.json({
                code: '1',
                msg: updateCartErr.message
              })
            } else {
              res.json({
                code: '0',
                msg: 'success',
                content: updateCartDoc
              })
            }
          })
        } else { // 购物车中无相同物品，查找物品信息，加入
          Products.findOne({productId}, (productErr, productDoc) => {
            if (productErr) { // 查找商品接口报错
              res.json({
                code: '1',
                msg: productErr.message
              })
            } else { // 查找商品接口成功
              console.log('productDoc', productDoc, productId)
              if (productDoc) { // 找到商品
                productDoc.productNum = 1
                productDoc.checked = true
                userDoc.cartList.push(productDoc) // 加入用户名下购物车
                userDoc.save((addCartErr, addCartDoc) => {
                  console.log('addCartDoc', addCartDoc)
                  if (addCartErr) { // 保存更新后的用户数据失败
                    res.json({
                      code: '1',
                      msg: addCartErr.message
                    })
                  } else {
                    res.json({
                      code: '0',
                      msg: 'success',
                      content: addCartDoc
                    })
                  }
                })
              } else { // 未找商品
                // 在商品列表中点击，不会出现该情况
                console.log('Product not exist!')
              }
            }
          })
        }
      } else { // 查找用户接口成功，但未找到用户
        // 有登录校验，不会出现该情况
        console.log('User not exist!')
      }
    }
  })
})

module.exports = router;

// 连接数据库
// mongoose.connect('mongodb://127.0.0.1:27017/vmall');

// mongoose.connection.on("connected", () => {
//     console.log('MongoDB connected success.');
// });

// mongoose.connection.on("error", () => {
//     console.log('MongoDB connected error.');
// });

// mongoose.connection.on("disconnected", () => {
//     console.log('MongoDB disconnected.');
// });