import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import indexPage from './pages/indexPage'
import detailPage from './pages/detailPage'
import userPage from './pages/userPage'
import loginPage from './pages/loginPage'
import messagePage from './pages/messagePage'
import createPage from './pages/createPage'
import {markdown} from 'markdown'

Vue.filter('toHTML', (str) => {
  return markdown.toHTML(str || '')
})

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
  },
  'messages': {
    name: 'messages',
    component: messagePage
  },
  'create': {
    name: 'create',
    component: createPage
  }
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
