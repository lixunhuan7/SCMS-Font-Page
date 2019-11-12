<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
export default {
  // beforeCreate() {
  //   if(localStorage.getItem('Login_User')===null||localStorage.getItem('Login_User')===undefined){
  //     localStorage.setItem('isLogin','false');
  //   }else{
  //     localStorage.setItem('isLogin','true');
  //   }
  // }
  mounted() {
    window.addEventListener('beforeunload',ev => {
      // localStorage.setItem('Login_User',JSON.stringify(null));
      // localStorage.setItem("isLogin","false");
      alert("浏览器刷新！")
    });
    window.addEventListener('onunload',e=>{
      alert('浏览器关闭！')
    })
    // alert("beforeDestroy");
  }
}
</script>

<style>
  html,body,#app{
    margin: 0px;
    height: 100%;
    width: 100%;
  }
</style>
