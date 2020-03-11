var express=require('express');
var router=express.Router();
var database=require('../public/js/database');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var db=new database();

router.post('/aclist',jsonParser,(req,res)=>{
    console.log(req.body.user+' get the ac list');
    let sqlStr="select id,a_name,club,end_date from activity";
    db.getAListQuery(res,sqlStr,true);
})

router.get('/activity',jsonParser,(req,res)=>{
    console.log(req.query.ID+' gotten');
    let sqlStr='select * from activity where id='+req.query.ID;
    db.getInfo(res,sqlStr);
})

router.post('/aclistforclub',jsonParser,(req,res)=>{
    console.log(req.body.user+' get the ac list from club:'+req.body.clubname);
    let sqlStr='select id,a_name,club,end_date from activity where club=\''+req.body.clubname+'\'';
    db.getAListQuery(res,sqlStr,false);
})

router.post('/mylist',jsonParser,(req,res)=>{
    console.log(req.body.user+' get this activity list');
    let sqlStr='select id,a_name,club,end_date,students from activity';
    db.getAlistForStudentsQuery(res,sqlStr,req.body.user);
})

module.exports=router;