var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Products = require('../models/products');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/vmall', {useNewUrlParser:true}, (error, res) => {
    if (error) {
        console.log(`MongoDB connected error.${error}`)
    } else {
        console.log('MongoDB connected success.')
    }
});

/* GET products listing. */
router.get('/', function(req, res, next) {
//   res.send('respond with products.');
    // let page = parseInt(req.param('page')) // deprecated
    let page = parseInt(req.query.page)
    let pageSize = parseInt(req.query.pageSize)
    let skip = pageSize*(page-1)
    let sort = parseInt(req.query.sort)
    let gte, lt
    let find = {}
    switch (req.query.range) {
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