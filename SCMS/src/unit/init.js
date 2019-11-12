
var _beforeUnload_time = 0, _gap_time = 0;
var is_fireFox = navigator.userAgent.indexOf("Firefox")>-1;//是否是火狐浏览器
window.onunload = function (){
  _gap_time = new Date().getTime() - _beforeUnload_time;
  if(_gap_time <= 5)
    localStorage.setItem('isLogin','false');
  else
    localStorage.setItem('isLogin','true');
}
window.onbeforeunload = function (){
  _beforeUnload_time = new Date().getTime();
  if(is_fireFox)//火狐关闭执行
    localStorage.setItem('isLogin','false');
};

