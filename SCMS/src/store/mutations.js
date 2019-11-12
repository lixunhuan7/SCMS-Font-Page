export default {
  toggleNavCollapse(state) {
    state.isCollapsed = !state.isCollapsed
  },
  setCrumbList(state,routerList){
    state.crumbList=routerList;
  }
}
