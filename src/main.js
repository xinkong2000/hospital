import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import EdDialog from './components/e-com';
Vue.use(EdDialog);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
