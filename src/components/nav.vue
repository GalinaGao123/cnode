<template lang="jade">
.nav
  .main-content
    .logo
      img(src="../assets/cnodejs_light.svg")
    ul.nav-links
      li
        a(v-link="{path: '/'}")首页
      li(v-if="user.accessToken")
        a(v-link="{name: 'messages'}") 未读消息
          .count(v-if="messageCount")
            .num {{messageCount}}
      li
        a(v-if="user.accessToken", @click="logout", href="javascript:;") 退出
        a(v-else, v-link="{name: 'login'}") 登录
</template>

<script>
import request from 'superagent'
import {getUserInfo} from '../vuex/getters'
import {updateUserInfo} from '../vuex/actions'
import {removeStorage} from '../common/storage'

export default {
  data () {
    return {
      messageCount: 0
    }
  },
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
  },
  ready () {
    if (this.user.accessToken) {
      request
        .get('https://cnodejs.org/api/v1/message/count')
        .query({accesstoken: this.user.accessToken})
        .end((err, res) => {
          if (!err) {
            this.messageCount = res.body.data
          }
        })
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
        a
          display block
          position relative
          .count
            display block
            text-align center
            position absolute
            right -15px
            top 0
            width 16px
            height 16px
            background red
            color #fff
            border-radius 8px
            .num
              position absolute
              top -7px
              left 5px
</style>
