import Vue from 'vue'
import Router from 'vue-router'
import Test from '../test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test case',
      component: Test
    }
  ]
})
