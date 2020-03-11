<template>
    <div class="clubs">
        <el-table :data="cList">
            <el-table-column prop="name" label="社团名称" width="200">
            </el-table-column>
            <el-table-column prop="chairman" label="负责人" width="120">
            </el-table-column>
            <el-table-column prop="des" label="简介">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:'aclist',
    
    data() {
        return {
            baseUrl:'http://127.0.0.1:3000',
            cList:[]
        }
    },
    methods:{
        getAcList(obj) {
            let url=obj.baseUrl+'/c/cllist';
            let jsondata={user:sessionStorage.getItem('user')};
            obj.$post(url,jsondata).then(function(resData){
                if(resData.msg==='successed') {
                    obj.cList=resData.data;
                }
                else obj.$message({showClose: true,message: "获取社团列表失败",type: "error"});
            }).catch(function(errdata){
                obj.$message({showClose: true,message: "服务器出错",type: "error"});
                console.log(errdata);
            });    
        },
        handClick(row) {
            this.$router.push({name:'club',params:{id:row.id}});
        }
    },
    created() {
        this.getAcList(this);
    }
}
</script>