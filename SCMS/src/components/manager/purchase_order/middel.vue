<template>
    <div>
      <p data-v-1a92c06a="" class="default-tips">
        <i data-v-1a92c06a="" class="el-icon-info primary"></i> 共查询到 <span>{{purchase_order_page_total}}</span> 条数据，已选择 <span data-v-1a92c06a="" class="primary">
        0</span> 个</p>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
    export default {
      computed:{
        ...mapGetters(['purchase_order_page_total'])
      }
    }
</script>
<style>
  .component-TablePage .default-tips[data-v-1a92c06a]{
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    margin-bottom: 8px;
    padding: 0 16px;
    color: #0a1f44;
    border-radius: 4px;
    background-color: #ebf5ff;
  }
  .component-TablePage .default-tips .primary[data-v-1a92c06a] {
    color: #0c66ff;
  }
</style>
