<template>
    <div>
        <div class="info">
            <img src="http://127.0.0.1:3000/source/image/user.jpg"/>
            <div>
                <span>学号: <label>{{userInfo.sid}}</label></span><br/><br/>
                <span>姓名: <label>{{userInfo.name}}</label></span><br/><br/>
                <span>性别: <label>{{!userInfo.sex?'男':'女'}}</label></span><br/><br/>
                <span>年级: <label>{{userInfo.grade}}</label></span><br/><br/>
                <span>专业: <label>{{userInfo.major}}</label></span><br/><br/>
                <span>邮件: <label>{{userInfo.email}}</label></span><br/><br/>
                <span>社团: </span>
                <ul>
                    <li v-for='item in userInfo.club' :key="item"><el-button type="success" plain size='mini' @click="gotoClub(item)">{{item}}</el-button></li>
                </ul>
                <el-divider></el-divider>
                <span><el-button @click="gotoLogin" type="primary" size='mini' style="color:#66B1FF;background-color:white">注销<i class="el-icon-arrow-right el-icon--right"></i></el-button></span>
            </div>
        </div>
		<div class="container">
			<div class="header">
				<ul>
					<li><button class="aList"  @click="gotoAlist" :disabled='btn[0]'>| 活动列表 |</button></li>
					<li><button class="cList"  @click="gotoClist" :disabled='btn[1]'>| 社团列表 |</button></li>
					<li><button class="myList" @click="gotoMylist" :disabled='btn[2]'>| 我的活动 |</button></li>
                    <li><button class="unreadMessage" @click="gotoMlist" :disabled='btn[3]'>| 个人消息 | </button></li>
				</ul>
			</div>
			<div class="mainBody">
                <keep-alive>
                    <router-view/>
                </keep-alive>
			</div>
		</div>
    </div>
</template>

<script>
  export default {
    name:'mainpage',
    data() {
      return {
        baseUrl:'http://127.0.0.1:3000',
        userInfo:{sid:'16340210',name:'王德超',age:0,sex:false,email:'318015961@qq.com',grade:'大三',major:'软件工程',headimg:'',club:[]},
        
        cList:['1','2','3'],
        msgList:['1','2','3'],
        btn:[false,false,false,false]
      }
    },
    methods:{
        gotoMylist() {
            for(var i=0;i<this.btn.length;i++) this.btn[i]=false;
            this.btn[2]=true;
            this.$router.push({path:'/mainpage/mylist'});
        },
        gotoMlist() {
            for(var i=0;i<this.btn.length;i++) this.btn[i]=false;
            this.btn[3]=true;
        },
        gotoAlist() {
            for(var i=0;i<this.btn.length;i++) this.btn[i]=false;
            this.btn[0]=true;
            this.$router.push({path:'/mainpage/alist'});
        },
        gotoClist() {
            for(var i=0;i<this.btn.length;i++) this.btn[i]=false;
            this.btn[1]=true;
            this.$router.push({path:'/mainpage/clist'});
        },
        gotoClub(name) {
            //this.$router.push({path:'/club'});
        },
        gotoLogin() {
            sessionStorage.removeItem('user');
            this.$router.push('/');
        },
        getUserInfo(obj) {
            let url=obj.baseUrl+'/stuInfo/Download';
            let jsonData={user:sessionStorage.getItem('user')};
            obj.$post(url,jsonData).then(function(resdata){
                if(resdata.msg==='successed') {
                    obj.userInfo.sid=resdata.data.sid;obj.userInfo.name=resdata.data.name;
                    obj.userInfo.age=resdata.data.age;obj.userInfo.sex=resdata.data.sex;
                    obj.userInfo.email=resdata.data.email;obj.userInfo.grade=resdata.data.grade;
                    obj.userInfo.major=resdata.data.major;obj.userInfo.headimg=resdata.data.headimg;
                    if(resdata.data.club) {
                        obj.userInfo.club=resdata.data.club.split('&');
                    }
                }
                else {
                    obj.$message({showClose: true,message: "未能获取到用户数据",type: "error"});
                }
            }).catch(function(errdata){
                obj.$message({showClose: true,message: "获取用户信息网络出错",type: "error"});
                console.log(errdata);
            });
        }
    },
    beforeCreate:function() {
        if(sessionStorage.getItem('user')==null) this.$router.push('/login');
        else return;
    },
    created() {
        let routeStr=this.$route.path;
        if(routeStr=='/mainpage/clist') this.btn[1]=true;
        else if(routeStr=='/mainpage/alist') this.btn[0]=true;
        else if(routeStr=='/mainpage/mylist') this.btn[2]=true;
        else this.btn[3]=true;
        this.getUserInfo(this);
    }
  };
</script>

<style scoped>


.info,.container{
	margin:0;
	padding:0;
}


.info{
	width:25%;
	height:40em;
    border-right:2px inset lightgray;
    border-top:2px inset lightgray;
}

.info img{
    display: block;
    border-radius: 50%;
    width:8em;
    height: 8em;
    position: relative;
    left:6em;
    border:1px solid grey;
}

.info div{
    text-align: left;
    font-size: 1em;
}

.info ul{
    list-style-type: none;
    margin:0;
}
.info ul li{
    margin: 0;
}
.info div span{
    text-shadow: 1px 0px grey;
}

.info div span label{
    text-shadow: none;
    font-family:"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.container{
	width:74%;
	position:absolute;
	right:0.5em;
	top:0.5em;
}

.header{
	color: #333;
	height:3em;
	top:0;
	right:0;
}
  
.mainBody{
    height: 40em;
    overflow: scroll;
}
  
.header ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
	height:3em;
}


.header ul li {
    height: 100%;
    float: left;
}

.header ul li button{
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    background-color: skyblue;
    border:none;
}

.header ul li button:hover{
    background-color:grey;
}


</style>>
