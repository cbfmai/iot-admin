import Vue from 'vue'
import Router from 'vue-router'
import map from '../views/map'
import dashboard from '../views/dashboard.vue'
import devices from '../views/devices'
import alerts from '../views/alerts.vue'
import login from '../views/login.vue'
import parking from '../views/devices/parking'
import parkingStatus from '../views/devices/parking/status.vue'

let routes = [
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
    component: devices,
    children: [
      {
        path: '/devices/parking',
        name: 'parking',
        component: parking
      },
      {
        path: '/devices/parking/status',
        component: parkingStatus,
        name: '设备状态'
      }
    ]
  },
  {
    path: '/alerts',
    name: 'alerts',
    component: alerts
  }
]


/*
function addRoute(v) {
  if (v.path && v.page) {
    routes.push({
      path: v.path,
      name: v.name,
      id: v.id,
      component: v.component
    })
  }
}



for (let [key, value] of Object.entries(navDevices)) {
  value.forEach(v => {
    addRoute(v)
    v.children && v.children.forEach(v => {
      addRoute(v)
      v.groups && v.groups.forEach(v => {
        addRoute(v)
      })
    })
  })
}

*/


export default new Router({
  routes
})

Vue.use(Router);
