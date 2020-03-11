var express=require('express');
var router=express.Router();
var database=require('../public/js/database');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var db=new database();

router.post('/cllist',jsonParser,(req,res)=>{
    console.log(req.body.user+' get the cl list');
    let sqlStr='select id,name,chairman,des from club';
    db.getCListQuery(res,sqlStr);
})

router.get('/club',jsonParser,(req,res)=>{
    console.log("ask for clubinfo id:"+req.query.ID);
    let sqlStr='select id,name,chairman,des from club where id='+req.query.ID;
    db.getInfo(res,sqlStr);
})


module.exports=router;