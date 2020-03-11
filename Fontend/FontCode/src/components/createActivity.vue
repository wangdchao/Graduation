<template>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
        <el-input v-model="form.region"></el-input>
    </el-form-item>
    <el-form-item label="活动时间">
        <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
    </el-form-item>
    <el-form-item label="活动奖励">
        <el-checkbox-group v-model="form.type">
        <el-checkbox label="体育章" name="type"></el-checkbox>
        <el-checkbox label="公益时" name="type"></el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    <el-form-item label="活动内容">
        <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://127.0.0.1:3000/file/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png/pdf文件，且不超过5mb</div>
      </el-upload>
    <el-form-item>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
    </el-form-item>
    </el-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        filelist:[]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>

</style>