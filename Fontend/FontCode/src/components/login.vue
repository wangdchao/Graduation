<template class="cc">
  <div>
    <el-tabs type="border-card" id="container">
      <el-tab-pane label="教师登录">

        <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1" label-width="80px" class="login-box">

          <el-form-item label="账号" prop="userT">
            <el-input type="text" placeholder="请输入账号" v-model="ruleForm1.userT"/>
          </el-form-item>

          <el-form-item label="密码" prop="passwordT">
            <el-input type="password" placeholder="请输入密码" v-model="ruleForm1.passwordT"/>
          </el-form-item>
          <el-form-item label="验证码" >
            <el-input type="text"  id='textcode' placeholder="请输入验证码" v-model="inputValue"/>
          </el-form-item>
          <verifycode @numValue='getnum'></verifycode>
          <el-button class="submit" type="success" @click="submitForm1()">登录</el-button>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="学生登录">
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="80px" class="login-box">

          <el-form-item label="学号" prop="userS">
            <el-input type="text" placeholder="请输入学号" v-model="ruleForm2.userS"/>
          </el-form-item>

          <el-form-item label="密码" prop="passwordS">
            <el-input type="password" placeholder="请输入密码" v-model="ruleForm2.passwordS"/>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input type="text" id='textcode1'  placeholder="请输入验证码" v-model="inputValue"/>
          </el-form-item>
          <verifycode1 @numValue='getnum'></verifycode1>
          <el-button class="submit" type="success" @click="submitForm2()">登录</el-button>
        </el-form>
      </el-tab-pane>
      
    </el-tabs>

    <!--<el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入正确信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->

  </div>
</template>

<script>
import verifycode from './identifyingCode'
import verifycode1 from './identifyingCode'
export default {
  name: 'Login',
  components:{verifycode,verifycode1},
  data: function(){
    return {
      numdata:'',
      baseUrl:'http://127.0.0.1:3000',
      inputValue:'',
      //管理员登录表单登录验证
      ruleForm1:{
        userT:'',
        passwordT:''
      },
      rules1:{
        userT:[{ required: true, message: '请输入账号', trigger: 'change' }],
        passwordT:[{required:true,message:'请输入密码',trigger:'change'}]
      },
      //学生登录表单验证
      ruleForm2:{
        userS:'',
        passwordS:''
      },
      rules2:{
        userS:[{required: true, message: '请输入账号', trigger: 'change' },
                {min: 8, max:8,message:'请输入8位学号', trigger: 'change' }],
        passwordS:[{required:true,message:'请输入密码',trigger:'change'}]
      }
    }
  },
  methods:{
    loginResult:function(vm,t) {
      let us;
      let passw;
      var webUrl;
      if(t==true) {
        us=vm.ruleForm1.userT;
        passw=vm.ruleForm1.passwordT;
        webUrl=vm.baseUrl+'/login/manager_login';
      }
      else {
        us=vm.ruleForm2.userS;
        passw=vm.ruleForm2.passwordS;
        webUrl=vm.baseUrl+'/login/students_login';
      }
      let jsondata={user:us,password:passw};
        vm.$post(webUrl,jsondata).then(function(resData){
          if(resData.msg==='successed') {
            if(t==true) sessionStorage.setItem('user',vm.ruleForm1.userT);
            else sessionStorage.setItem('user',vm.ruleForm2.userS);
            vm.$router.push("/mainpage/alist");
          }
          else {
            vm.$message({
              showClose: true,
              message: "用户名或密码错误",
              type: "error"
            });
          }
        }).catch(function(err){
          vm.$message({
            showClose: true,
            message: "服务器出错",
            type: "error"
          });
        })
    },
    //管理员登录
    submitForm1() {
      if(!this.passverify()) {
        document.getElementById('textcode').style.borderColor='red';
        return;
      }
      this.$refs.ruleForm1.validate((valid) => {
      if (valid) {
        this.loginResult(this,true);
      } else {
        console.log('error submit!!');
        return false;
      }
    })},

    passverify() {
      return this.inputValue==this.numdata;
    },
    //get num 值
    getnum(datanum) {
      this.numdata=datanum;
    },
    //学生登录
    submitForm2() {
      if(!this.passverify()) {
        document.getElementById('textcode1').style.borderColor='red';
        return;
      }
      this.$refs.ruleForm2.validate((valid) => {
      if (valid) {
        this.loginResult(this,false);
      } else {
        console.log('error submit!!');
        return false;
      }
    })},
    
  },
  beforeCreate() {
    if(sessionStorage.getItem('user')!=null) this.$router.push('/mainpage/alist');
    else return;
  }
}
</script>

<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 25em;
  height: 18.5em;
  margin: 1em auto;
  padding: 2em 2em 1.25em 2em;
  border-radius: 5px;
  border-bottom: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
.submit {
  width: 6em;
}
.cc {
  background-color: azure;
}
#container{
  position:relative;
  left:25%;
  top:25%;
  width:31.25em;
  height:28.25em;
}


</style>
