var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
var fs=require('fs');
var busboy=require('connect-busboy');
var jsonParser = bodyParser.json();

router.use(busboy());

router.get('/download/*',function(req,res){
    var url=req.url.split('/');
    res.sendFile(process.cwd()+'/filedatabase/'+url[2],function(err){
        if(err) {
            console.log(err);
        }
    })
})

router.put('/upload',jsonParser,function(req,res){

})






module.exports=router;