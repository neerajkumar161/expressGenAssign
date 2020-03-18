const userSchema = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const config = require('../bin/config');
const resJson = require('../message');
const msg = resJson.message;
const statusCode = resJson.statusCode;

module.exports.getCurrentUser = (req,res) =>{
    try{
        // const bearerHeader = req.headers['authorization'];
        // jwt.verify(bearerHeader,config.key, (err,authData) =>{
        //     if(err) {
        //         console.log(err);
        //         res.json({
        //             success: false,
        //             statusCode: statusCode.FORBIDDEN,   // Forbidden 403
        //             message: msg.TOKEN_NOT_FOUND
        //         })
        //     }
        //     else{
                var id = req.params.userid;
                console.log('Im here');
                // var bodyData = req.body;
                //var email = bodyData.email;
                userSchema.findOne({ _id: id}).exec()
                          .then(result=>{
                            res.json({
                                success: true,
                                statusCode: statusCode.OK,
                                message : result
                            })
                          })
                }
        // })
            
    // }
    catch(err){ console.log(err);}
}