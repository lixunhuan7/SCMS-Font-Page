import axios from 'axios'
import router from '../router/index'
import Vue from 'vue';
//创建新的Vue实例
const newVue=new Vue();

// axios.defaults.baseURL = 'https://localhost:8888';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data===99990006){
      router.push('/Operator/login');
      newVue.$message('Token已过期请重新登录！！！');
    }
    if(response.data===99990007){
      router.push('/Operator/login');
      newVue.$message('Token不匹配请重新登录！！！');
    }
    return response;
  },
  error => {
   //router.push('/Operator/login');
    return Promise.reject(error)   // 返回接口返回的错误信息
  });

export default axios;
// export function get(url, params){
//   return new Promise((resolve, reject) =>{
//     axios.get(url, {
//       params: params
//     }).then(res => {
//       resolve(res.data);
//     }).catch(err =>{
//       reject(err.data)
//     })
//   });
// }

// import QS from 'qs'
// export function post(url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, QS.stringify(params))
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   });
// }
