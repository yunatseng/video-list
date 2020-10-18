import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Collection from './views/Collection.vue'
import Video from './views/Video.vue'

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
    },
    {
      path: '/video',
      name: 'videoPage',
      component: Video
    }
  ],
  mode: 'hash',
  base: '/video-list',
})
