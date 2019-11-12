<template>
    <div>
      <h1>采购单</h1>
      <header-table/>
      <middle/>
      <foot-table/>
    </div>
</template>
<script>
  import HeaderTable from '../../../components/manager/purchase_order/form-header'
  import Middle from '../../../components/manager/purchase_order/middel'
  import FootTable from '../../../components/manager/purchase_order/table'
  // import axios from 'axios'
    export default {
        components:{
          HeaderTable,
          Middle,
          FootTable
      }
    }
</script>
<style>

</style>
