var express = require('express');
var router = express.Router();
var routeProducts = require('../controllers/products.controller');
// Products Routes

    router.post('/products',(req,res) => {
        console.log('im here working or not');
        routeProducts.productsPost(req,res);
    })
    
    router.get('/products/:productId',(req,res) => {
        console.log('im here working or not');
        routeProducts.productsGet(req,res);
    })

    router.get('/products/',(req,res) => {
        console.log('im here working or not');
        routeProducts.productsGetAll(req,res);
    })
    
    router.delete('/products/:prodId',(req,res) => {
        routeProducts.productsDelete(req,res);
    })
    
    router.put('/products/:productId',(req,res) => {
        routeProducts.productsPut(req,res);
    })
    
module.exports = router;

