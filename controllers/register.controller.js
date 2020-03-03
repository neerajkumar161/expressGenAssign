const userSchema = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const resJson = require('../message');
const msg = resJson.message;
const statusCode = resJson.statusCode;

// POST Method
module.exports.registerPost = (req,res) =>{
    try{
        var bodyData = req.body;
        const fName = bodyData.firstName;
        const lName = bodyData.lastName;
        const email = bodyData.email;
        const pwd = bodyData.password;

        reg = new userSchema({
            //id : 101,
            firstName: fName,
            lastName : lName,
            email : email,
            password : pwd 
        });
        var userInfo = {
            firstName:fName,
            lastName: lName,
            email: email
        };
        if(fName && lName && email && pwd)
        {
            userSchema.findOne({email:email}).exec()
            .then(result => {
                if(result)
                {
                    res.json({
                        success:false,
                        message: msg.EMAIL_EXISTED,
                        data : 'NULL'
                    })
                }
                else{
                    bcrypt.genSalt(10,(err, salt) => {
                        bcrypt.hash(reg.password,salt, (err,hash) => {
                            if(err) throw err;
                            reg.password = hash;
                            reg.save().then(res => { 
                             console.log(res);
                         });
                       });
                     });
                     res.json({
                        success:true,
                        statusCode: statusCode.OK,
                        message: msg.USER_REG_SUCC,
                        data : userInfo
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return;
            });
        }
        else{
            res.json(msg.ALL_FIELDS_REQ);
        }
    }
    catch(err)
    {
        console.log('Error is' ,err);
        res.json(statusCode.INTERNAL_SERVER_ERROR);
    }
}