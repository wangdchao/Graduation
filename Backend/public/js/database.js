const pg=require('pg');

/**
 * 数据库链接配置对象->配置连接池
 */

const pgConfig ={
    user:'postgres',
    database:'postgres',
    password:'123456',
    host:'127.0.0.1',
    port:'5432',
    idleTimeoutMillis:5000
}
const pool = new pg.Pool(pgConfig);


/**
 * 时间处理函数
 */
function getNowTime(){
    let tim = new Date().toLocaleString('chinese', {hour12: false}).replace("/", "-").replace("/", "-");
    let arr=tim.split('-');
    let mon=Number(arr[1]),day_and_time=arr[2];
    let day=Number(day_and_time.split(' ')[0]);
    let DateStr=arr[0]+'-';
    if(mon<10) DateStr=DateStr+'0'+String(mon)+'-';
    else DateStr+=String(mon)+'-';
    if(day<10) DateStr=DateStr+'0'+String(day);
    else DateStr+=String(day);
    DateStr+=' '+day_and_time.split(' ')[1];
    return DateStr;
}
/**
 * 登录查询函数
 * 参数：
 * res：http响应
 * sqlStr：数据库查询字符串
 */
function loginQuery(res,sqlStr) {
    pool.connect(function(err,client,done){
        if(err) {
            console.log(err);
            return false;
        }
        client.query(sqlStr,[],function(error,result){
            if(error) {
                console.log(error);
                res.status(200);
                res.json({code:401,msg:'database connection error'});
            }
            else {
                if(result.rowCount) {
                    //console.log(result);
                    res.status(200);
                    res.json({code:200,msg:'successed'});
                }
                else {
                    res.status(200);
                    res.json({code:400,msg:'failed'});
                }; 
            }
            done();
        });
    });
}

/**
 * 学生信息返回
 */
function infoQuery(res,sqlStr) {
    pool.connect(function(err,client,done){
        if(err) {
            console.log(err);
            res.status(200);
            res.json({code:400,msg:'failed'});
            return;
        }
        client.query(sqlStr,[],function(error,result){
            if(error) {
                console.log(error);
                res.status(200);
                res.json({code:401,msg:'failed'});
            }
            else {
                if(result.rowCount) {
                    res.status(200);
                    res.json({code:200,msg:'successed',data:result.rows[0]});
                }
                else {
                    res.status(200);
                    res.json({code:400,msg:'failed'});
                }; 
            }
            done();
        });
    });
}


/**
 * 获取活动列表信息
 */
function getAListQuery(res,sqlStr,check) {
    pool.connect(function(err,client,done){
        if(err) {
            console.log(err);
            res.status(200);res.json({code:400,msg:'error when connect the database'});
            return;
        }
        client.query(sqlStr,[],function(error,result){
            if(error) {
                res.status(200);res.json({code:400,msg:'error when query the database'});
            }
            else {
                res.status(200);
                if(check==true) {
                    var resData=[];
                    var nowT=getNowTime();
                    for(var index in result.rows) {
                        let d=(result.rows)[index].end_date;
                        if(d>nowT) resData.push((result.rows)[index]);
                    }
                    res.json({code:200,msg:'successed',data:resData});
                }
                else res.json({code:200,msg:'successed',data:result.rows});
            }
            done();
        });
    });
}

/**
 * 获取社团列表信息
 */
function getCListQuery(res,sqlStr) {
    pool.connect(function(err,client,done){
        if(err) {
            console.log(err);
            res.status(200);
            res.json({code:400,msg:'error when connect the database'});
            return;
        }
        client.query(sqlStr,[],function(error,result){
            if(error) {
                res.status(200);
                res.json({code:400,msg:'error when query the database'});
            }
            else {
                res.status(200);
                res.json({code:200,msg:'successed',data:result.rows});
            }
            done();
        });
    });
}


/**
 * 获取具体信息
 */
function getInfo(res,sqlStr) {
    pool.connect(function(err,client,done){
        if(err) {
            console.log(err);
            res.status(200);
            res.json({code:400,msg:'error when connect the database'});
            return;
        }
        client.query(sqlStr,[],function(error,result){
            if(error) {
                console.log(error);
                res.status(200);
                res.json({code:400,msg:'error when query the database'});
            }
            else {
                res.status(200);
                res.json({code:200,msg:'successed',data:result.rows[0]});
            }
            done();
        });
    });
}

/**
 * 获取某个人参与的活动
 */
function getAlistForStudentsQuery(res,sqlStr,username) {
    pool.connect(function(err,client,done){
        if(err) {
            console.log(err);
            res.status(200);
            res.json({code:400,msg:'error when connect the database'});
            return;
        }
        client.query(sqlStr,[],function(error,result){
            if(error) {
                console.log(error);
                res.status(200);
                res.json({code:400,msg:'error when query the database'});
            }
            else {
                res.status(200);
                var finalData=[];
                for(var index in result.rows) {
                    if((result.rows[index]).students) {
                        let arr=(result.rows[index]).students.split('&');
                        for(var inn in arr) {
                            if(username==arr[inn]) {
                                finalData.push(result.rows[index]);
                                break;
                            }
                            else continue;
                        }
                    }
                    else continue;
                }
                res.json({code:200,msg:'successed',data:finalData});
            }
            done();
        });
    });
}

/**
 * 插入数据
 */
function insert(res,sqlStr) {

}

/**
 * 数据库操作对象的封装
*/
function database() {
    
    this.loginQuery=loginQuery;

    this.infoQuery=infoQuery;
    
    this.getAListQuery=getAListQuery;

    this.getCListQuery=getCListQuery;

    this.getInfo=getInfo;

    this.insert=insert;

    this.getAlistForStudentsQuery=getAlistForStudentsQuery;
}

module.exports=database;
