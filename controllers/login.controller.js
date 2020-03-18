const userSchema = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../bin/config');
const resJson = require('../message');
const msg = resJson.message;
const statusCode = resJson.statusCode;
// POST Method
module.exports.loginPost = (req,res)=>{
    var bodyData = req.body;
    const email = bodyData.email;
    const pwd = bodyData.password;
    reg = new userSchema({
        email : email,
        password : pwd 
    });
    // Fetching Header
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader == 'undefined'){
        userSchema.findOne({email:email}).exec()
            .then(result => {
                if(!result){
                    res.json({
                        success: false,
                        statusCode: statusCode.BAD_REQUEST,
                        message: msg.INVALID_CRED,
                    })
                    console.log("Invalid Credentials.!");
                }
                if(result){
                    bcrypt.compare(pwd,result.password,(err,isMatch) =>{
                        if(err) throw err;
                        if(isMatch){
                            var token = jwt.sign({reg:result}, config.key,{ expiresIn: 60 * 60 });        
                            res.json({
                                success :true,
                                statusCode: statusCode.OK,
                                // message : msg.TOKEN_GENERATED,
                                data: result,
                                message: msg.AUTHENTICATION_SUCC,
                                token : token
                            });
                            console.log("Welcome! Authentication Successful!");
                        }
                        else
                            res.json({
                                success: false,
                                statusCode: statusCode.BAD_REQUEST,
                                message: msg.PASSWORD_MISMATCH
                            });
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return;
            })
    }
    else
    {
        jwt.verify(bearerHeader,config.key, (err,authData) =>{
        // if invalid token transferred
        if(err) {
            console.log(err);
            res.json({
                success: false,
                statusCode: statusCode.FORBIDDEN,   // Forbidden 403
                message: msg.TOKEN_NOT_FOUND
            })
        }
        else{
            // console.log('UserId :',authData.reg._id);
            userSchema.findOne({email:email}).exec()
            .then(result => {
                if(!result){
                    res.json({
                        success: false,
                        statusCode: statusCode.NOT_FOUND,
                        message: msg.INVALID_CRED,
                    })
                    console.log("Invalid Credentials.!");
                }
                if(result){
                    bcrypt.compare(pwd,result.password,(err,isMatch) =>{
                        if(err) throw err;
                        if(isMatch){
                            res.json({
                                success: true,
                                statusCode: statusCode.OK,
                                message: msg.AUTHENTICATION_SUCC
                            });
                            console.log("Welcome! Authentication Successful!");
                        }
                        else
                            res.json(msg.PASSWORD_MISMATCH);
                    });    
                }
            })
            .catch(err => {
                console.log(err);
                return;
            })
        }
        })
    }
}
