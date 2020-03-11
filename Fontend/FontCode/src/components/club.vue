<template>
    <div>
        <div class="cpage">
            <h3>{{aData.name}}</h3>
            <label>社长：{{aData.chairman}}</label><el-button type="primary" @click="askToCreateAc()">活动创建</el-button>
            <label>社团介绍:{{aData.des}}</label>
            <el-button type='primary' @click="askToJoin()">申请加入社团</el-button>
            <el-divider></el-divider>
            <h3>社团举办活动</h3>
            <el-table :data="aList">
                <el-table-column prop="a_name" label="活动名称" width="200">
                </el-table-column>
                <el-table-column prop="club" label="社团" width="200">
                </el-table-column>
                <el-table-column prop="end_date" label="截至日期">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="活动创建" :visible.sync="createVisible" width="30%">
            <createAc></createAc>
            <el-button type='primary' @click="createVisible=false">确认</el-button>
        </el-dialog>
        <el-dialog title="社团加入申请" :visible.sync="joinVisible" width="30%">
            <joinC></joinC>
            <el-button type='primary' @click="joinVisible=false">确认</el-button>
        </el-dialog>
    </div>
</template>

<script>
import createAc from './createActivity';
import joinC from './joinClub'
export default {
    components:{createAc,joinC},
    name:'club',
    data() {
        return {
            createVisible:false,
            joinVisible:false,
            ischairman:false,
            baseUrl:'http://127.0.0.1:3000',
            aData:{
                id:0,
                name:"---",
                chairman:'---',
                des:'---',
                sid:''
            },
            aList:[]
        }
    },
    methods:{
        //获取社团所举办活动列表
        getAcList(obj,name) {
            let url=obj.baseUrl+'/a/aclistforclub';
            let jsondata={user:sessionStorage.getItem('user'),clubname:name};
            obj.$post(url,jsondata).then(function(resData){
                if(resData.msg==='successed') {
                    obj.aList=resData.data;
                }
                else obj.$message({showClose: true,message: "未能从服务器获取信息",type: "error"});
            }).catch(function(errdata){
                obj.$message({showClose: true,message: "获取活动列表网络出现问题",type: "error"});
                console.log(errdata);
            });    
        },
        //列表点击事件
        handClick(row) {
            this.$router.push({name:'activity',params:{id:row.id}});
        },
        //获取俱乐部信息
        getClub(obj,id) {
            let url=this.baseUrl+'/c/club?ID='+id;
            obj.$get(url).then(function(resData){
                if(resData.msg=='successed') {
                    obj.aData=resData.data;
                    obj.ischairman=obj.aData.sid!=sessionStorage.getItem('user');
                    obj.getAcList(obj,obj.aData.name);
                }
                else {
                    obj.$message({showClose:true,message:resData.msg,type:'error'});
                }
            }).catch(function(errData){
                console.log(errData);
                obj.$message({showClose: true,message: "获取社团信息网络出现问题",type: "error"})
            });
        },
        /**
         * 请求创建活动
         */
        askToCreateAc() {
            this.createVisible=true;
        },
        //参加俱乐部
        askToJoin() {
            this.joinVisible=true;
        }
    },
    created() {
        var id;
        if(typeof(this.$route.params.id)=='undefined') id=sessionStorage.getItem('clubid');
        else {
            id=this.$route.params.id;
            sessionStorage.setItem('clubid',String(id));
        }
        this.getClub(this,id);
    }
}
</script>
<style scoped>


</style>