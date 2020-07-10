import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import router from './router';
import './plugins/elementui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
