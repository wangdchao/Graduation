var express=require('express');
const dataProcess= require('../public/js/dataProcess/dataProcess.js');
const database=require('../public/js/database')
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var db=new database();
var router=express.Router();

/**
 *管理员登录请求
 */ 
router.post('/manager_login',jsonParser,(req,res)=>{
    console.log('manager:'+req.body.user+' login request!');
    const user=new String(req.body.user),password=new String(req.body.password);
    const cryptoStr= user + '='+password;
    
    let sqlStr='';
    //构造查询串
    sqlStr='select mdid from manager where mdid = \''+ dataProcess.md5Crypto(cryptoStr)+'\'';
    //数据库select
    db.loginQuery(res,sqlStr);
})


/**
 * 学生登录
 */
router.post('/students_login',jsonParser,(req,res)=>{
    console.log('students:'+req.body.user+' login request!:'+req.body.password);
    const user=new String(req.body.user),password=new String(req.body.password);
    const cryptoStr= user  + '='+password;
    let sqlStr='';
    //构造查询串
    sqlStr='select mdid from students where mdid = \''+ dataProcess.md5Crypto(cryptoStr)+'\'';
    db.loginQuery(res,sqlStr);
})

module.exports=router;