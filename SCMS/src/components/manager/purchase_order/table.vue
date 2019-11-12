<template>
  <div>


  <el-table :data="tableData" style="width: 100%" height="360px" max-height="400">
    <el-table-column fixed type="selection" prop="id" width="55"></el-table-column>
    <el-table-column prop="orderCode" label="订单编码" width="150"></el-table-column>
    <el-table-column prop="supplierCode" label="供应商编码" width="120"></el-table-column>
    <el-table-column prop="inPlanDate" label="期望入库日期" width="120"></el-table-column>
    <el-table-column prop="inEndDate" label="截止入库日期" width="120"></el-table-column>
    <el-table-column prop="inRealDate" label="实际入库日期" width="120"></el-table-column>
    <el-table-column prop="whName" label="仓库名称" width="120"></el-table-column>
    <el-table-column prop="orderStatus" label="单据状态" width="100"></el-table-column>
    <el-table-column prop="createId" label="创建人" width="80"></el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="" type="text" size="small">查看</el-button>
        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="pull-right"
    background
    :page-sizes="[3,5,10,20,60]"
    :page-size="3"
    layout="prev, pager, next,sizes"
    @current-change="currentChangeHandle"
    @size-change="changeSizeHandle"
    :total="purchase_order_init_table_page_pages">
  </el-pagination>
  </div>
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        alert(rows[index].id);
        //rows.splice(index, 1);
      },
      // 每页显示的条数改变
      changeSizeHandle(val) {
        // 改变每页显示的条数
        this.$store.state.purchase_order_init_table.page.pageSize=val;
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.$store.state.purchase_order_init_table.page.pageNo=1;
        // 点击每页显示的条数时，显示第一页
        this.getPageList('test',1,val);
      },
      currentChangeHandle(current){
        //alert(current);
        // this.$store.purchase_order_init_table.page.pageNo=current;
        this.getPageList('test',current,this.$store.state.purchase_order_init_table.page.pageSize);
      },
      getPageList(createId,pageNo,pageSize){
        this.axios({
          method:'post',
          url:'/api/purchase-order/pageList',
          data:{
            createId: createId,
            page: {
              pageNo: pageNo,
              pageSize: pageSize
            }
          }
        }).then(response=>{
          if(response.data.success){
            this.$store.state.purchase_order_init_table.data=response.data.data.records;
            this.$store.state.purchase_order_init_table.page.pageNo=response.data.data.current;
            this.$store.state.purchase_order_init_table.page.pageSize=response.data.data.size;
            this.$store.state.purchase_order_init_table.page.pages=response.data.data.pages;
            this.$store.state.purchase_order_init_table.page.total=response.data.data.total;
            this.tableData=response.data.data.records;
          }
        }).catch(error=>{
          alert(error)
        });
      }
    },
    data() {
      return {
        tableData: []
      }
    },
    beforeCreate() {
      this.axios({
        method:'post',
        url:'/api/purchase-order/pageList',
        data:{
          createId: "test",
          page: {
            pageNo: 1,
            pageSize: 3
          }
        }
      }).then(response=>{
        if(response.data.success){
          this.$store.state.purchase_order_init_table.data=response.data.data.records;
          this.$store.state.purchase_order_init_table.page.pageNo=response.data.data.current;
          this.$store.state.purchase_order_init_table.page.pageSize=response.data.data.size;
          this.$store.state.purchase_order_init_table.page.pages=response.data.data.pages;
          this.$store.state.purchase_order_init_table.page.total=response.data.data.total;
          this.tableData=response.data.data.records;
        }
      }).catch(error=>{
        alert(error)
      });
    },
    computed:{
      purchase_order_init_table(){
        return this.$store.state.purchase_order_init_table.data;
      },
      purchase_order_init_table_page_pages(){
        return this.$store.state.purchase_order_init_table.page.total;
      }
    },
    watch:{
      //监听purchase_order_init_table
      purchase_order_init_table:function (oldValue,newValue) {
        // console.log("watch "+oldValue);
        // console.log("watch new "+newValue);
        this.tableData=oldValue;
      }
    }
  }
</script>
<style>

</style>
