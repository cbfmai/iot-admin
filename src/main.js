// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import ol from 'ol'

Vue.use(ol);
Vue.use(ElementUI);

Vue.config.productionTip = false;


store.commit('protocol', process.env.API_PROTOCOL);
store.commit('server', process.env.API_SERVER);
store.commit('port', process.env.API_PORT);


new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});
