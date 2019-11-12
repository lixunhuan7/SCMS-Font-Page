<template>
    <div  class="container-fluid" id="login">
      <div class="page-login-container">
        <form>
          <h3>供应链采购管理系统</h3>
          <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="username" ></el-input>
          <el-input prefix-icon="el-icon-lock"placeholder="请输入密码" v-model="password" show-password></el-input>
          <p><a href="#/Operator/password-find">忘记密码?</a></p>
          <el-button type="primary" @click="checkLogin">立即登录</el-button>
        </form>
      </div>
    </div>
</template>
<script>
  //import axios from 'axios'
    export default {
      data(){
        return {
          username:"",
          password:""
        }
      },
      methods:{
        checkLogin(){
          this.axios({
            url:'/api/scms-sys-user/checkLogin',
            method:'post',
            data:{
              password: this.password,
              username: this.username
            }
          }).then(response=>{
           // console.log(response);
            if(response.data.success&&null!==response.data.data.token||response.data.token!==""){
              localStorage.setItem("Login_User",JSON.stringify(response.data.data));
              localStorage.setItem("token",response.data.data.token);
              //this.$store.state.isLogin=true;
              //this.$store.state.Login_User=response.data.user;
              this.$router.push('manager');
            }else{
              this.$message('用户名或密码错误');
              console.log(response.data);
            }
          }).catch(error=>{
            alert("error"+error);
          });
        }
      }
    }
</script>
<style>
#login{
  height: 100%;
  background: url("../../static/images/LoginBack.jpg");
  background-size: 100% 100%;
  padding-left: 0px;
  padding-right: 0px;
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
    background-color: rgba(0,0,0,.3);
  }
  form h3{
    text-align: center;
    margin-bottom: 25px;
  }
form input{
  margin-bottom: 15px;
}
form button{
  width: 100%;
}
form p a,form p a:hover{
  color: white;
}
.el-input__icon:after{
  height: 0px;
}
  .el-input{
    width: 336px;
    display: block;
  }
</style>
