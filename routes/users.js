var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../bin/config');
var routerRegister = require('../controllers/register.controller');
var routeLogin = require('../controllers/login.controller');
const resJson = require('../message');
const msg = resJson.message;
const statusCode = resJson.statusCode;

    // Register
    router.post('/register',(req,res)=>{
      routerRegister.registerPost(req,res);
    });

    // Login
    router.post('/login',(req,res)=>{
      routeLogin.loginPost(req,res);
    });
    
    const checkStatus = (req,res, next)=>{
      const bearerHeader = req.headers['authorization'];
        jwt.verify(bearerHeader,config.key, (err,authData) =>{
            if(err) {
                console.log(err);
                //res.sendStatus(403);    // Forbidden
                res.json({
                  success: false,
                  statusCode: statusCode.FORBIDDEN,
                  message: msg.TOKEN_NOT_FOUND
                })
            }
            else
              next();
        })
    }
    router.use(checkStatus);

    router.get('/', function(req, res, next) {
      res.send('respond with a resource');
    });

module.exports = router;
