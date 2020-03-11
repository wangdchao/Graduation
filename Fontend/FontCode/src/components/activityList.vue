<template>
    <div class="activities">
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
</template>

<script>
export default {
    name:'aclist',
    data() {
        return {
            baseUrl:'http://127.0.0.1:3000',
            aList:[]
        }
    },
    methods:{
        getAcList(obj) {
            let url=obj.baseUrl+'/a/aclist';
            let jsondata={user:sessionStorage.getItem('user')};
            obj.$post(url,jsondata).then(function(resData){
                if(resData.msg==='successed') {
                    obj.aList=resData.data;
                }
                else obj.$message({showClose: true,message: "获取活动列表失败",type: "error"});
            }).catch(function(errdata){
                obj.$message({showClose: true,message: "获取活动列表网络出错",type: "error"});
                console.log(errdata);
            });    
        },
        handClick(row) {
            this.$router.push({name:'activity',params:{id:row.id}});
        }
    },
    created() {
        this.getAcList(this);
    }
}
</script>