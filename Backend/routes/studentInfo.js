var express=require('express');
var router=express.Router();
var database=require('../public/js/database');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var db=new database();

router.post('/Upload',jsonParser,(req,res)=>{
    console.log(req.body);
    let sqlStr='insert into students (sid,mdid,name,sex,grade,age,major,email,headimg) values()';
    db.insert(res,aqlStr);
})

router.post('/Download',jsonParser,(req,res)=>{
    console.log(req.body.user+" ask for userinfo");
    let sqlStr='select * from students where sid = \''+req.body.user+'\'';
    db.infoQuery(res,sqlStr);
})


module.exports=router;




