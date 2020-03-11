<template>
    <div>
        <div class="apage">
            <h3>{{aData.a_name}}</h3>
            <label>截至日期：{{aData.end_date}}</label><br/>
            <label>主办方：{{aData.club}} </label><br/>
            <label>负责人：{{aData.chairman}}</label>
            <h4>活动介绍</h4>
            <label>{{aData.description}}</label><br/>
            <img v-for="item in aData.img" :src="item"/><br/>
            <el-divider></el-divider>
            <iframe src='http://127.0.0.1:3000/file/download/gouxiang.pdf' width='60%' height="500px">
            说明文档
            </iframe><br/>
            
            <el-button type="primary" :disabled="fulled">报名</el-button>
        </div>
        <div class='message'></div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <div v-if="loaded">
                <span>报名成功</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </div>
            <div v-if="!loaded"><el-button type="primary" :loading="!loaded"></el-button></div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'activity',
    data() {
        return {
            baseUrl:'http://127.0.0.1:3000',
            aData:{},
            fulled:false,
            dialogVisible:false,
            loaded:false
        }
    },
    methods:{
        getActivity(obj,id) {
            let url=obj.baseUrl+'/a/activity?ID='+id;
            obj.$get(url).then(function(resData){
                if(resData.msg=='successed') {
                    obj.aData=resData.data;
                }
                else {
                    obj.$message({showClose:true,message:'未能从服务器获取信息'});
                }
            }).catch(function(errData){
                console.log(errData);
                obj.$message({showClose: true,message: "获取活动详情网络出现问题",type: "error"});
            });
        },
        joinA() {
            let url=this.baseUrl+'/joinA';
            jsonData={user:sessionStorage.getItem('user'),aid:this.aData.id};
            obj.$post(url,jsonData).then(function(reData){
                if(resData.msg=='successed') {

                }
                else {

                }
            }).catch(function(errData){
                obj.$message({showClose: true,message: "获取活动失败",type: "error"})
            }); 
        }
    },
    created() {
        this.getActivity(this,this.$route.params.id);
    }
}
</script>
<style scoped>


</style>