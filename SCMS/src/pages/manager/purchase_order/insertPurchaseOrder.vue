<template>
    <div>
      <div class="subtitle">基本信息</div>
      <el-form label-position="left" label-width="130px" :model="insertPurchaseOrder" ref="insertPurchaseOrder" :rules="rules">
        <el-form-item class="el-col-md-12" label="商家编号/名称" prop="merchantName">
          <el-autocomplete
            placeholder="请输入商家编号"
            v-model="insertPurchaseOrder.merchantName"
            :fetch-suggestions="queryMerchantNameSearchAsync"
            @select="MerchantNameHandleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item class="el-col-md-12" label="供应商编号/名称" prop="supplierName">
          <el-autocomplete
            ref="supplierName"
            placeholder="请输入商家编号"
            v-model="insertPurchaseOrder.supplierName"
            :fetch-suggestions="querySupplierNameSearchAsync"
            @select="SupplierNameHandleSelect"
            :disabled="isDisable"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item class="el-col-md-12" label="入库仓库" prop="whName">
          <el-autocomplete
            placeholder="请输入商家编号"
            :disabled="isDisable"
            v-model="insertPurchaseOrder.whName"
            :fetch-suggestions="querywhNameSearchAsync"
            @select="whNameHandleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item class="el-col-md-12" label="货品名称">
          <el-input placeholder="请输入商家编号" v-model="insertPurchaseOrder.goodsName"></el-input>
        </el-form-item>
        <el-form-item class="el-col-md-12" label="货品编号" prop="goodsCode">
          <el-autocomplete
            placeholder="请输入商家编号"
            v-model="insertPurchaseOrder.goodsCode"
            :fetch-suggestions="queryItemNoSearchAsync"
            @select="ItemNoHandleSelect"
            :disabled="itemNoIsDisable"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item class="el-col-md-12" label="币种">
          <el-select  placeholder="请选择" v-model="insertPurchaseOrder.currency">
            <el-option
              v-for="item in currencys"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-col-md-12" label="期望入库日期">
          <el-date-picker
            v-model="insertPurchaseOrder.inPlanDate"

            type="date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="el-col-md-12" label="截止入库日期">
          <el-date-picker
            v-model="insertPurchaseOrder.inEndDate"

            type="date"
          ></el-date-picker>
        </el-form-item>
        <div class="el-divider el-divider--horizontal" style="clear:both;"></div>
      </el-form>
      <div class="subtitle">产品信息</div>
      <button  class="el-button el-button--primary" style="padding: 8px 20px;" @click="submitForm('insertPurchaseOrder')">查询货品</button>

      <el-table
        :data="products"
        border
        :header-cell-style="{background:'#F1F2F4',color:'#0a1f44'}"
        style="width: 100%;margin-top: 24px"
        >
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="productCode"
          label="货品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="货品名称"
          width="160">
        </el-table-column>
        <el-table-column
          prop="productPrice"
          label="货品价格"
          width="160">
        </el-table-column>
        <el-table-column
          prop="applyPrice"
          label="采购单价"
          width="160">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容"  v-model="scope.row.applyPrice"></el-input>
<!--            //<span v-show="true">{{scope.row.applyPrice}}</span>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="applyCount"
          label="采购数量"
          width="160">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容"  v-model="scope.row.applyCount"></el-input>
<!--            //<span v-show="true">{{scope.row.applyCount}}</span>-->
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="money"-->
<!--          label="采购金额"-->
<!--          width="160">-->
<!--        </el-table-column>-->
        <el-table-column
          fixed="right"
          label="操作"
          width="">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, products)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="button" style="padding: 8px 20px;margin-top: 10px;" class="el-button el-button--primary" @click="insertPurchaseOlderBtn" :disabled="products == undefined || products.length <= 0">提交</el-button>
      <button type="button" style="padding: 8px 20px;margin-top: 10px;" class="el-button el-button--default" @click="$router.go(-1);">返回</button>
    </div>
</template>
<script>
    export default {
      data(){
        return {
          insertPurchaseOrder:{
            merchantName:'',
            merchantCode:'',
            supplierName:'',
            supplierCode:'',
            whName:'',
            whCode:'',
            whAddress:'',
            currency:'人民币',
            inPlanDate:'',
            inEndDate:'',
            goodsName:'',
            goodsCode:'',
            applyProductList:new Array(),
            createId:JSON.parse(localStorage.getItem("Login_User")).userName
          },
          rules:{
            merchantName:[{required:true,message:'请输入商家编号或名称',trigger: 'change'}],
            supplierName:[{required:true,message:'请输入供应商编号或名称',trigger: 'change'}],
            whName:[{required:true,message:'请选择仓库',trigger: 'change'}],
            goodsCode:[{required:true,message:'请输入货号',trigger: 'change'}]
          },
          timeout:null,
          isDisable:true,
          itemNoIsDisable:true,
          autCode:'',
          venCode:'',
          currencys:[],
          products:[
            // {productCode:'001',productName:'aaa',productPrice:12,applyPrice:10,applyCount:100},
            // {productCode:'002',productName:'bbb',productPrice:13,applyPrice:10,applyCount:200},
            // {productCode:'003',productName:'ccc',productPrice:14,applyPrice:10,applyCount:300}
          ]
        }
      },
      methods:{
        queryMerchantNameSearchAsync(queryString, cb) {

          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.axios({
              url:'/api/purchase-order/getAutVendorList',
              method:'post',
              data:{
                busCode:'001'
              }
            }).then(response=>{
              for(let i of response.data.data){
                i.value=i.autName;
              }
              cb(response.data.data);
            }).catch(error=>{
              alert(error);
            });
          }, 1000 * Math.random());
        },
        MerchantNameHandleSelect(item) {
          this.isDisable=false;
          this.autCode=item.busCode;
          this.insertPurchaseOrder.merchantCode=item.busCode;
        },
        querySupplierNameSearchAsync(queryString, cb) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.axios({
              url:'/api/purchase-order/getVcVendorList',
              method:'post',
              data:{
                busCode:this.autCode
              }
            }).then(response=>{
              for(let i of response.data.data){
                i.value=i.venName;
              }
              cb(response.data.data);
            }).catch(error=>{
              alert(error);
            });
          }, 1000 * Math.random());
        },
        SupplierNameHandleSelect(item) {
          this.itemNoIsDisable=false;
          //console.log(item);
          this.venCode=item.venCode;
          this.insertPurchaseOrder.supplierCode=item.venCode;
        },
        queryItemNoSearchAsync(queryString, cb) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.axios({
              url:'/api/purchase-order/getIcItemNoList',
              method:'post',
              data:{
                venCode:this.venCode
              }
            }).then(response=>{
              for(let i of response.data.data){
                i.value=i.itemnoCode;
              }
              cb(response.data.data);
            }).catch(error=>{
              alert(error);
            });
          }, 1000 * Math.random());
        },
        ItemNoHandleSelect(item) {
          // this.itemNoIsDisable=false;
          // console.log(item);
          // this.venCode=item.venCode;
          // this.insertPurchaseOrder.supplierCode=item.venCode;
        },
        querywhNameSearchAsync(queryString, cb) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.axios({
              url:'/api/inv-warehouse/getWareHouseByCreateId',
              method:'post',
              data:{
                vendorCode:JSON.parse(localStorage.getItem("Login_User")).busCode,
                page:{
                  pageNo:1,
                  pageSize:50
                }
              }
            }).then(response=>{
              for(let i of response.data.data.records){
                i.value=i.whName;
              }
              cb(response.data.data.records);
              //console.log(response);
            }).catch(error=>{
              alert(error);
            });
          }, 1000 * Math.random());
        },
        whNameHandleSelect(item) {
          //this.venCode=item.venCode;
          this.insertPurchaseOrder.whCode=item.whCode;
          this.insertPurchaseOrder.whAddress=item.address;
        },
        submitForm(formData){
          this.$refs[formData].validate((valid) => {
            if (valid) {
              // console.log(this.insertPurchaseOrder);
              /**
               *  发送请求
               */
              this.axios({
                url:'/api/purchase-order/getProductByItemNo',
                method:'post',
                data:{
                  itemnoCode:this.insertPurchaseOrder.goodsCode
                }
              }).then(response=>{
                //console.log(response);
                this.products.splice(0,0,response.data.data);
              }).catch(error=>{
                alert(error);
              });
            } else {
              return false;
            }
          });
        },
        deleteRow(index, rows) {
          rows.splice(index, 1);
        },
        insertPurchaseOlderBtn(){
          this.insertPurchaseOrder.applyProductList=this.products;
          console.log(this.insertPurchaseOrder);
          /**
           *  发送请求到后台
           */
          this.axios({
            url:'/api/purchase-order/insertPurchaseOrder',
            method:'post',
            data:this.insertPurchaseOrder
          }).then(response=>{
            console.log(response);
          }).catch(error=>{
            alert(error);
          })
        }
      },
      mounted() {
        /**
         *  初始化币种
         */
        this.currencys=[
          {id:1,value:'人民币'},
          {id:2,value:'美元'},
          {id:3,value:'欧元'},
          {id:4,value:'日元'},
          {id:5,value:'港元'},
          {id:6,value:'英镑'},
          {id:7,value:'韩元'}
        ]
      }
    }
</script>
<style>
  .subtitle {
    font-size: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 0 24px;
  }
  .subtitle:before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 18px;
    margin-right: 8px;
    background-color: #0c66ff;
  }
  .el-form-item__content .el-input__inner{
    width: 70%;
    height: 36px;
    line-height: 36px;
  }
  .el-autocomplete,.el-select{
    display: block;
  }
  .el-input__suffix{
    right: 0px;
    left: 34%;
  }
  .el-date-editor{
    width: 100% !important;
  }
  /*.el-form-item .el-form-item__label{*/
  /*  font-size: 16px;*/
  /*}*/
</style>
