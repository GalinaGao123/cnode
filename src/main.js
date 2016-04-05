import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import indexPage from './pages/indexPage'
import detailPage from './pages/detailPage'
import userPage from './pages/userPage'
import loginPage from './pages/loginPage'
// Vue.config.debug = true
Vue.use(VueRouter)

let router = new VueRouter()
router.map({
  '/': {
    component: indexPage
  },
  '/topic/:id': {
    name: 'topic',
    component: detailPage
  },
  '/user/:loginname': {
    name: 'user',
    component: userPage
  },
  '/login': {
    name: 'login',
    component: loginPage
  }
})

router.redirect({
  '*': '/'
})
Vue.config.debug = true
router.start(App, '#app')
