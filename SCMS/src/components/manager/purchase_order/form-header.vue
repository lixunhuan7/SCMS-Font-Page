<template>
    <div style="box-sizing: border-box;padding-left: 15px;">
      <el-form :inline="true" :model="purchase_order" ref="purchase_order"   class="demo-form-inline" >
        <el-form-item label="采购订单号：" >
          <el-autocomplete
            placeholder=""
            v-model="purchase_order.orderCode"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="供应商编号/名称：" >
          <el-autocomplete  placeholder="" v-model="purchase_order.supplierCode"></el-autocomplete>
        </el-form-item>
        <el-form-item label="入库仓库：" >
          <el-select  placeholder="请选择" v-model="purchase_order.whName">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据状态：" >
          <el-select  placeholder="请选择" v-model="purchase_order.orderStatus">
            <el-option
              v-for="item in olderStates"
              :key="item.id"
              :label="item.state"
              :value="item.state">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货号/名称：" id="article">
          <el-autocomplete  ></el-autocomplete>
        </el-form-item>
        <el-form-item label="采购人：" id="buyer">
          <el-input  placeholder="花无缺" v-model="purchase_order.createId"></el-input>
        </el-form-item>
        <el-form-item label="开始日期:">
          <div class="block" >
            <el-date-picker
              v-model="purchase_order.startDate"

              type="date"
              >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="截止日期:">
          <div class="block" >
            <el-date-picker
              v-model="purchase_order.endDate"

              type="date"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item  >

        </el-form-item>
      </el-form>
<!--      <hr>-->
      <div style="margin-bottom: 15px;">
        <router-link to="/Operator/manager/purchase/insert"><el-button type="primary" @click="" >新增</el-button></router-link>
        <span class="pull-right" style="margin-right: 25px">
          <el-button type="primary" @click="submit">查询</el-button>
          <el-button @click="reset('purchase_order')">重置</el-button>
        </span>
      </div>
<!--      <el-autocomplete-->
<!--        v-model="state"-->
<!--        :fetch-suggestions="querySearchAsync"-->
<!--        placeholder="请输入内容"-->
<!--        @select="handleSelect"-->
<!--      ></el-autocomplete>-->
    </div>
</template>
<script>
  import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
  export default {
    components: {ElSelectDropdown},
    data() {
    return {
      restaurants: [],
      state: '',
      timeout:  null,
      options:[],
      olderStates:[],
      time_value1:'',
      purchase_order:{
        orderCode:'',
        supplierCode:'',
        whName:'',
        orderStatus:'',
        createId:'',
        startDate:'',
        endDate:'',
        merchantCode:'',
        page:{
          pageNo:1,
          pageSize:3
        }
      }
    }
  },
  methods: {
    /**
     * 重置
     * @param formModule
     */
    reset(formModule){
      console.log(this.$refs[formModule]);
      this.$refs[formModule].resetFields();
    },
    /**
     * 异步查询
     * @param queryString
     * @param cb
     */
    querySearchAsync(queryString, cb) {


      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    /**
     * 按条件查询
     */
    submit(){
      this.$refs['purchase_order'].validate((valid)=>{
          if(valid){
              this.purchase_order.merchantCode=JSON.parse(localStorage.getItem("Login_User")).busCode;
              this.axios({
                url:'/api/purchase-order/queryPurchaseOrderListByPurchaseOrderQueryInput',
                method: 'post',
                data:this.purchase_order
              }).then(response=>{
                console.log(response);
                  this.$store.state.purchase_order_init_table.data=response.data.data.records;
                  this.$store.state.purchase_order_init_table.page.pageNo=response.data.data.current;
                  this.$store.state.purchase_order_init_table.page.pageSize=response.data.data.size;
                  this.$store.state.purchase_order_init_table.page.pages=response.data.data.pages;
                  this.$store.state.purchase_order_init_table.page.total=response.data.data.total;
                  console.log(this.$store.state.purchase_order_init_table);
              }).catch(error=>{
                alert(error);
              });
          }
      })

    //   console.log(this.purchase_order);

    }

  },
  mounted() {
    // this.restaurants = this.loadAll();
    //发送异步请求查询数据
    this.axios({
      url:'/api/purchase-order/likeQueryByOlderCodeOutput',
      method:'post',
      data:{
        likeName:JSON.parse(localStorage.getItem("Login_User")).busCode
      }
    }).then(response=>{
      if(response.data.data!==null){
        for(let i of response.data.data){
          i.value=i.orderCode;
        }
        this.restaurants=response.data.data;
      }
    }).catch(error=>{
      alert(error);
    });

    //
    const optionsArry=[
      {
        id:1,
        value:"成都仓库"
      },
      {
        id:2,
        value:"上海仓库"
      },
      {
        id:3,
        value:"北京仓库"
      }
    ]
    const olderStates=[
      {id:0, state:''},
      {id:1, state:'待审核'},
      {id:2, state:'已审核'},
      {id:3, state:'审核不通过'},
      {id:4, state:'待到货'},
      {id:5, state:'待入库'},
      {id:6, state:'待质检'},
      {id:7, state:'入库中'},
      {id:8, state:'已入库'},
      {id:9, state:'已取消'}
    ]
    this.options=optionsArry;
    this.olderStates=olderStates;
  }

  }
</script>
<style>
#article label{
  width: 128px;
  text-align: left;
}
  #buyer .el-form-item__content{
    width: 216px;
  }
</style>
