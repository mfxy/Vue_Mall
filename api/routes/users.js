var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/users');

/* Connent to mongoDB */
mongoose.connect('mongodb://127.0.0.1:27017/vmall', {useNewUrlParser: true}, (err, res) => {
  if (err) {
    console.log(`MongoDB connected error.${error}`)
  } else {
    console.log('MongoDB connected success.')
  }
})

/* GET user cartList listing. */
router.get('/cartList', (req, res, next) => {
  // res.send('respond with a resource');
  let userId = '0001'
  Users.findOne({userId}, (userErr, userDoc) => {
    if (userErr) {
      res.json({
        code: '1',
        msg: userErr.message
      })
    } else {
      console.log('userDoc', userDoc)
      if (userDoc) { // 找到用户
        // let total = 0
        // userDoc.cartList.map(item => {
        //   // total += item.salePrice
        //   total += item.salePrice*item.productNum
        // })
        res.json({
          code: '0',
          msg: 'success',
          content: {
            count: userDoc.cartList.length,
            dataList: userDoc.cartList,
            // total
          }
        })
      } else { // 接口成功，但未找到用户
        // 有登录校验，不会出现该情况
        console.log('User not exist!')
      }
    }
  })
});

/* POST delete */
router.post('/cartList/delete', (req, res, next) => {
  let userId = '0001'
  let productId = req.body.productId
  Users.update({userId}, {$pull: {cartList:{productId}}}, (delErr, delDoc) => {
    if (delErr) {
      res.json({
        code: '1',
        msg: delErr.message
      })
    } else {
      res.json({
        code: '0',
        msg: 'success',
        content: delDoc
      })
    }
  })
})

/* POST edit */
router.post('/cartList/edit', (req, res, next) => {
  let userId = '0001'
  let productId = req.body.productId
  let productNum = req.body.productNum
  let checked = req.body.checked
  Users.update({userId, 'cartList.productId': productId}, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked,
  }, (editErr, editDoc) => {
    if (editErr) {
      res.json({
        code: '1',
        msg: editErr.message
      })
    } else {
      res.json({
        code: '0',
        msg: 'success',
        content: editDoc
      })
    }
  })
})

module.exports = router;
