import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Collection from './views/Collection.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection
    }
  ],
  mode: 'history'
})
