const prodSchema = require('../models/product.schema');
const jwt = require('jsonwebtoken');
const config = require('../bin/config');
const resJson = require('../message');
const msg = resJson.message;
const statusCode = resJson.statusCode;

// POST Method
module.exports.productsPost = (req,res) => {
    try{
        var bodyData = req.body;
        var userInfo,userId ;
        const bearerHeader = req.headers['authorization'];
        jwt.verify(bearerHeader,config.key, (err,authData) =>{
            if(err) {
                console.log(err);
                res.sendStatus(403);    // Forbidden
                res.json({
                    success: false,
                    statusCode: statusCode.FORBIDDEN,
                    message: msg.TOKEN_NOT_FOUND
                })
            }
            else
            {
                userInfo = authData.reg;
                userId = authData.reg._id;
                console.log(userId);
                const pid = bodyData.pID;
                const pname = bodyData.pName;
                const pdesc = bodyData.pDesc;
                const pimg = bodyData.pImage;
                if(pname && pdesc && pimg)
                {
                    
                        reg = new prodSchema({
                            pID : pid,
                            userID : userId,
                            pName : pname,
                            pDesc :pdesc,
                            pImage :pimg,
                        });
                        reg.save().then((result) => {
                                console.log(result);
                                res.json({
                                    success: true,
                                    statusCode: statusCode.OK,
                                    message: msg.PROD_ADDED_SUCC,
                                    data: result,
                                    // user : {
                                    //         firstName : userInfo.firstName,
                                    //         lastName : userInfo.lastName,
                                    //         email : userInfo.email
                                    //         }
                                 })
                            })
                    
                }
                else{
                    res.json({
                        success: false,
                        statusCode: statusCode.BAD_REQUEST,
                        message: msg.ALL_FIELDS_REQ
                    })
                }
                
            }
        });
    }
    catch(err){console.log("Your Error",err)}
}

// Getting product passing prodId
module.exports.productsGet = (req,res) => {         // /products/:productId
    let prodID = req.params.productId;
    prodSchema.find({pID:prodID})
            .populate('userID')
            .exec()
            .then(result => {
                if(result.length)
                {
                    res.json({
                        success: true,
                        statusCode: statusCode.OK,
                        message: msg.PROD_FETCH_SUCC,
                        data : result
                    });
                }
                else
                    res.json({
                        success: false,
                        statusCode: statusCode.NOT_FOUND,
                        message:msg.INVALID_PROD_ID
                    });
                })
            .catch(err => {
                console.log(err);
                return;
            })
}
// Get all products from database
module.exports.productsGetAll = (req,res) => {      
    prodSchema.find({}).exec()
              .then(result=>{
                  if(result)
                  {
                     res.json({
                         success: true,
                         statusCode: statusCode.OK,
                         ProductList: result
                     })
                  }
                  else{
                      res.json({
                          success: false,
                          statusCode: statusCode.NOT_FOUND,
                          message: msg.PROD_FETCH_FAIL
                      })
                  }
              })
}
// Delete
module.exports.productsDelete = (req,res) =>{       // /products/:prodId
    let prodId = req.params.prodId;
    // let prodId = req.params.prodId;
    console.log(prodId);
    prodSchema.findOneAndDelete({_id:prodId},(err, result)=> {
        if(err) throw err;
        else{
            console.log(result);
            res.json({
                success:true,
                statusCode: statusCode.OK,
                message: msg.PROD_DEL_SUCC,
                data: result
            })
        }
    })
}

//PUT Method
module.exports.productsPut = (req,res) => {
   // let prodID = req.params.productId;
    const jsonParse = req.body;
    const pid = jsonParse.pID;
    const pname = jsonParse.pName;
    const pdesc = jsonParse.pDesc;
    const pimg = jsonParse.pImage;
    var update = {
        pName: pname,
        pDesc: pdesc,
        pImage: pimg    
    }
    prodSchema.findOneAndUpdate({_id: pid},update)
    .then(result =>{
        if(result)
        {
            prodSchema.find({pID:pid}).exec()
            .then(result=>{
                res.json({
                    success: true,
                    statusCode: statusCode.OK,
                    message: msg.RECORED_UPDATE_SUCC,
                    data: result
                })
            })
        }
        else
        {
            res.json({
                success: false,
                statusCode: statusCode.NOT_FOUND,
                message: msg.RECORED_UPDATE_FAIL
            })
        }
        
    })
}