<template>
    <el-container>
      <Aside/>
      <el-container direction="vertical">
        <MyHeader/>
        <MyMain/>
      </el-container>

    </el-container>
</template>
<script>
  import Aside from '../components/aside'
  import MyMain from '../components/MyMain'
  import MyHeader from '../components/header'
    export default {
      components:{
        Aside,
        MyMain,
        MyHeader
      },
      methods:{

        },
      mounted() {

      }
    }
</script>
<style>
.el-container{
  height: 100%;
}
</style>
