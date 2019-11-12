<template>
  <el-header>
    <span :class="isCollapsed?'el-icon-menu':'el-icon-s-grid'" style="font-size: 38px;margin-top: 10px;" @click="toggleNavCollapse"></span>

   <div class="aside__top--right">
        <div class="user-msg">
          <img class="user-img"  alt="">
          <span class="user-name">{{user_name}}</span>
          <el-dropdown trigger="click" placement="top">
                    <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="quit-system" @click="loginOut">
          <span class="iconfont el-icon-switch-button"></span>
        </div>
      </div>
  </el-header>
</template>
<script>
    import {mapState} from 'vuex'
    // import axios from 'axios'
    export default {
      data(){
        return {
          lastLoginTime:'',
          user_name:'李寻欢'
        }
      },
      methods:{
        loginOut(){
          const obj=localStorage.getItem("Login_User");
          const user=JSON.parse(obj);
          this.axios({
            method:'post',
            url:'/api/scms-sys-user/logout',
            data:{
              id:user.id
            }
          }).then(response=>{
            console.log(response)
            if(response){
              localStorage.setItem('Login_User',null);
              localStorage.removeItem('token')
              this.$router.push('/Operator/login')
            }
          }).catch(error=>{
            alert(error);
          })
        },
        toggleNavCollapse(){
          this.$store.commit('toggleNavCollapse')
        }
      },
      mounted(){

      },
      computed:{
        ...mapState(['isCollapsed'])
      }
    }
</script>
<style>
.el-header{
  height: 60px;
}
.aside__top--right{
  position: absolute;
  right: 10px;
  top: -1px;
  bottom: 0px;
  height: 61px;
  padding-top: 20px;
}
.aside__top--right>div{
  position: relative;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  margin-left: 10px;
  padding: 0 15px;
  cursor: pointer;
}
.aside__top--right>div:hover::after {
  transform-origin: 0 0;
  transform: scaleX(1);
}
.user-msg .user-img{
  width: 34px;
  height: 34px;
  border-radius: 50%;
  vertical-align: middle;
}
.user-msg .user-name {
  color: #758eb5;
  padding: 0 4px;
}
.el-icon-switch-button{
  font-size: 24px;
  color: #758eb5;
}
  .quit-system{
    margin: 0px !important;
    padding: 0px !important;
  }
</style>
