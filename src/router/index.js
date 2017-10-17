import Vue from 'vue'
import Router from 'vue-router'
import map from '../views/map'
import dashboard from '../views/dashboard.vue'
import devices from '../views/devices.vue'
import alerts from '../views/alerts.vue'
import login from '../views/login.vue'

Vue.use(Router);

export default new Router({
  routes: [

    {
      path: '/',
      name: 'map',
      component: map
    },

    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/devices',
      name: 'devices',
      component: devices
    },
    {
      path: '/alerts',
      name: 'alerts',
      component: alerts
    }
  ]
})
