var express = require('express');
var router = express.Router();
var routeReviews = require('../controllers/reviews.controller');
// Reviews Routes

    router.post('/reviews/:id',(req,res)=>{
        routeReviews.reviewsPost(req,res);
    })

    router.get('/reviews/:prodId',(req,res)=>{
        routeReviews.reviewsGet(req,res);
    })
module.exports = router;