var login=require('./routes/login');
var stuInfo=require('./routes/studentInfo');
var club=require('./routes/club');
var activity=require('./routes/activity');
var fileAccess =require('./routes/fileAccess');

const express=require('express');

const app = express();

/**
 * 跨域配置
 */
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

/**
 * 后端静态文件访问
 */
app.use('/source',express.static('public'));

/**
 * 管理员与学生登录模块
 */
app.use('/login',login);

/**
 * 学生用户信息
 */
app.use('/stuInfo',stuInfo);

/**
 * 活动信息
 */
app.use('/a',activity);

 /**
  * 社团信息
  */
app.use('/c',club);

/**
 * 获取文件图片
 */
app.use('/file',fileAccess);

app.listen(3000, () => console.log('System app listening on port 3000!'))

/**
 * 一登陆状态检查
 */
/*app.use((req,res,next)=>{
    if(sessionCheck.cookieIsIn()) next();
    else res.send({status:200,info:'not_login'});
    next();
})*/