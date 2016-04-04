import Vue from 'vue'
import Vuex from 'vuex'
import {getStorage} from '../common/storage'

Vue.use(Vuex)

const state = {
  accessToken: getStorage('accessToken'),
  loginName: getStorage('loginName')
}

const mutations = {
  SETUSERINFO (state, user) {
    state.accessToken = user.accessToken
    state.loginName = user.loginName
  }
}

export default new Vuex.Store({
  state,
  mutations
})
