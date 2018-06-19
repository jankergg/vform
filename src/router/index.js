import Vue from 'vue'
import Router from 'vue-router'
import Demo from '../../demo'
import switchRule from '../../demo/hot_switch_rules'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    name: 'Demo',
    component: Demo
  },
  {
    path: '/rules',
    name: 'switch-rule',
    component: switchRule
  }
  ]
})
