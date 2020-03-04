const reviewSchema = require('../models/review.schema');
const prodSchema = require('../models/product.schema');
const resJson = require('../message');
const msg = resJson.message;
const statusCode = resJson.statusCode;
 
// POST Method
module.exports.reviewsPost = (req,res) => {
    console.log(req.body);
    var jsonParse = req.body;
    var review = jsonParse.review;
    var prodID = req.params.id;
    reg = new reviewSchema({
        reviewMsg : review,
        reviewDate : new Date(),
        prodId : prodID,
    });
    prodSchema.find({pID:prodID}).exec()
            .then(result => {
                if(result.length)
                {
                    reg.save().then((result) => {
                            console.log(result);
                            res.json({
                                success: true,
                                statusCode: statusCode.OK,
                                message: msg.REVIEW_ADD_SUCC
                            })
                        });
                }
                else
                    res.json({
                        success:false,
                        statusCode: statusCode.NOT_FOUND,
                        message: msg.INVALID_PROD_ID
                    });
                })
            .catch(err => {
                console.log(err);
                return;
            })
}

// Get Method
module.exports.reviewsGet = (req,res) => {
    try{
        let productID = req.params.prodId;
        reviewSchema.find({prodId:productID}).exec()
                .then(result => {
                    if(result.length){
                        res.json({
                            success: true,
                            statusCode: statusCode.OK,
                            data: result
                        })
                    }
                    else
                    {
                        res.json({
                            success:false,
                            statusCode: statusCode.NOT_FOUND,
                            message: msg.INVALID_PROD_ID  
                        })
                    }
                    })
                .catch(err => {
                    console.log(err);
                    return;
                })
    }
    catch(err)
    {console.log("Error Occured",err)}
}