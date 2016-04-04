<template lang="jade">
.nav
  .main-content
    .logo
      img(src="../assets/cnodejs_light.svg")
    ul.nav-links
      li
        a(v-link="{path: '/'}")首页
      li(v-if="user.accessToken") 未读消息
      li
        a(v-if="user.accessToken", @click="logout", href="javascript:;") 退出
        a(v-else, v-link="{name: 'login'}") 登录
</template>

<script>
import {getUserInfo} from '../vuex/getters'
import {updateUserInfo} from '../vuex/actions'
import {removeStorage} from '../common/storage'

export default {
  vuex: {
    getters: {
      user: getUserInfo
    },
    actions: {
      updateUserInfo
    }
  },
  methods: {
    logout () {
      this.updateUserInfo({})
      removeStorage()
    }
  }
}
</script>

<style lang="stylus">
.nav
  background #444
  margin-bottom 30px
  padding 10px 0
  .main-content
    &:after
      content ''
      display block
      clear both
    .logo
      max-width 120px
      float left
      img
        width 100%
        vertical-align middle
    a
      color #ccc
    .nav-links
      color #ccc
      float right
      font-size 12px
      li
        display inline-block
        line-height 28px
        height 28px
        margin 0 20px
        &:last-child
          margin-right 0

</style>
