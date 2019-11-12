####1.解决LocalDatetime写入mysql8.0数据库出现时差的问题
解决方案：修改mysql的配置。
  
####2.前端做登录拦截器，采用router的守卫导航来做。其实质是拦截路由导航
  `router.beforeEach((to, from, next)=>{
    if(to.path === '/Operator/login') {
      next()
    } else {
      const isLogin=sessionStorage.getItem('isLogin');
      console.log(isLogin);
      if(isLogin==='false'||isLogin===null){
        next('/Operator/login');
      }else{
        next();
      }
    }
  })`
 
####3.使用localStorage来存储用户信息，这样刷新页面，数据依然存在

####4.
  axios：在vue页面中：this.axios;
  route: 在vue页面中：$route.xxx;
         在js文件中，先引入route----import router from '../router/index' 再route.xxx
####5.让table的单元格可编辑：
  `<el-table-column
    prop="applyCount"
    label="采购数量"
    width="160">
    <template slot-scope="scope">
      <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.applyCount"></el-input>
      <span v-show="!scope.row.show">{{scope.row.applyCount}}</span>
    </template>
  </el-table-column>`
####6.判断数组是否为空来使用disabled
  `:disabled="products == undefined || products.length <= 0"`
