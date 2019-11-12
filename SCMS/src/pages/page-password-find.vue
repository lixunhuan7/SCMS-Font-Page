<template>
    <div id="password-find">
      <div class="page-login-container">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <h4>找回密码</h4>
          <el-form-item label="手机号">
            <el-input prefix-icon="el-icon-user" v-model="formLabelAlign.phoneOrEmail"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input prefix-icon="el-icon-lock" v-model="formLabelAlign.newPwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input prefix-icon="el-icon-lock" v-model="formLabelAlign.affirmPwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input prefix-icon="el-icon-question" v-model="formLabelAlign.VC"></el-input>
          </el-form-item>
          <el-button type="primary">立即找回</el-button>
        </el-form>
      </div>
    </div>
</template>
<script>
    export default {
      data(){
        return {
          labelPosition: 'right',
          formLabelAlign: {
            phoneOrEmail: '',
            newPwd: '',
            affirmPwd: '',
            VC:''
          }
        }
      }

    }
</script>
<style>
#password-find{
  height: 100%;
  background: url("../../static/images/LoginBack.jpg");
  background-size: 100% 100%;
}
.page-login-container{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /*background-color: rgba(0,0,0,.3);*/
}
  form h4{
    text-align: center;

  }
form button{
  width: 100%;
}
.el-form-item__label{
    color: black;
  }
</style>
