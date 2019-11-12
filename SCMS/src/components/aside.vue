<template>
   <el-aside id="aside" width="" >
     <el-menu :default-openeds="['1']" :collapse="isCollapsed" class="el-menu-vertical-demo">
       <el-header>
          <h3 style="color: white;"><span class="el-icon-truck" style="margin-right: 30px;"></span><span v-show="!isCollapsed">运营平台</span></h3>
       </el-header>
       <el-submenu index="1">
         <template slot="title"><i class="el-icon-s-tools"></i><span>采购管理</span></template>
         <el-menu-item-group>
           <el-menu-item index="1-1"><a href="#/Operator/manager/purchase">采购订单</a></el-menu-item>
           <el-menu-item index="1-2"><a href="#/Operator/manager/ReturnOrder">采购退货</a></el-menu-item>
           <el-menu-item index="1-3"><a href="#/Operator/manager/invoice">到货单</a></el-menu-item>
           <el-menu-item index="1-4"><a href="#/Operator/manager/inboud">入库单</a></el-menu-item>
           <el-menu-item index="1-5"><a href="#/Operator/manager/QC">质检单</a></el-menu-item>
         </el-menu-item-group>
<!--         <el-submenu index="1-4">-->
<!--           <el-menu-item index="1-4-1">选项4-1</el-menu-item>-->
<!--         </el-submenu>-->
       </el-submenu>
       <el-submenu index="2">
         <template slot="title"><i class="el-icon-s-tools"></i><span>仓库管理</span></template>
         <el-menu-item-group>
           <el-menu-item index="2-1"><a href="#/Operator/manager/WareHouse">仓库管理</a></el-menu-item>
         </el-menu-item-group>
       </el-submenu>
       <el-submenu index="3">
         <template slot="title"><i class="el-icon-s-tools"></i><span>库存管理</span></template>
         <el-menu-item-group>
           <el-menu-item index="3-1"><a href="#/Operator/manager/inventory">库存单</a></el-menu-item>
         </el-menu-item-group>
       </el-submenu>
     </el-menu>
   </el-aside>
</template>
<script>
  import { mapState } from 'vuex'
    export default {
        computed:{
            ...mapState(['isCollapsed'])
        }
    }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-aside{
    height: 100%;
  }
  #aside{
    background-color: #212434;
    border: 1px solid;

  }
  .el-menu{
    background-color: #212434;
  }
  .el-submenu__title i,.el-submenu__title,.el-menu-item{
    color: white;
  }
  .el-menu-item a,.el-menu-item a:hover{
    color: white;
    text-decoration: none;
  }
  .el-submenu__title:hover,.el-menu-item:focus, .el-menu-item:hover{
    background-color: rgb(26,29,42);
  }
  .navCollapsed .sidebar {
    width: 64px !important;
  }
  .navCollapsed .sidebar ul{
    display: none;
  }
  .navCollapsed .sidebar .iconfont+span {
    display: none;
  }
  .navCollapsed .sidebar .el-submenu__icon-arrow {
    display: none;
  }
  .navCollapsed .main-container {
    margin-left: 64px;
  }
  .navCollapsed .aside__top {
    left:64px!important;
  }
</style>
