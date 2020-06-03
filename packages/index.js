//整个包的入口
//定义 install 方法,接受Vue作为参数。如果使用use注册插件,则所有的组件都将被注册 Vue.use会自动找寻install方法执行

//统一导出
//导入颜色选择器组件
import Button from "./button.vue";
import Dialog from "./dialog.vue";
import Input from "./input.vue";
import Switch from "./switch.vue";
import "./fonts/font.scss";

//组件列表
const components = [Button, Dialog, Input, Switch];

const install = function(Vue) {
  //全局注册所有组件
  components.forEach(item => {
    Vue.component(item.name, item);
  });
};

// 判断是否是直接引入文件,如果是，就不用调用Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
