<template lang="jade">
.message-page
  .page-content
    .new-messages
      .title
        a(v-link="{path: '/'}") 主页
        span /
        span 新消息
      .messages-content
        ul(v-if="messages.hasnot_read_messages.length", v-for="messages.hasnot_read_messages")
          li
            a(v-link="{name: 'topic', params: {id: topic.id}}") {{topic.title}}
        span(v-else) 无消息
    .old-messages
      .title
        span 旧消息
      .messages-content
        ul(v-if="messages.has_read_messages.length", v-for="messages.has_read_messages")
          li
            a(v-link="{name: 'topic', params: {id: topic.id}}") {{topic.title}}
        span(v-else) 无消息
  user(:user-info="userDetail")
</template>

<script>
import request from 'superagent'
import user from '../components/user'
import {getUserInfo} from '../vuex/getters'

export default {
  data () {
    return {
      userDetail: {},
      messages: {
        hasnot_read_messages: [],
        has_read_messages: []
      }
    }
  },
  components: {
    user
  },
  vuex: {
    getters: {
      getUserInfo
    }
  },
  ready () {
    request
      .get('https://cnodejs.org/api/v1/messages')
      .query({accesstoken: this.getUserInfo.accessToken})
      .end((err, res) => {
        if (!err) {
          this.messages = res.body.data
          request
            .get(`https://cnodejs.org/api/v1/user/${this.getUserInfo.loginName}`)
            .end((err, res) => {
              if (!err) {
                this.userDetail = res.body.data
              }
            })
        }
      })
  }
}
</script>

<style lang="stylus">
.message-page
  &:after
    content ''
    display block
    clear both
  .page-content
    width 70%
    float left
    padding-right 30px
  .new-messages
    background #fff
    margin-bottom 20px
    .title
      background #f6f6f6
      padding 10px
      a
        color #80bd01
      span
        margin-left 5px
  .old-messages
    background #fff
    margin-bottom 20px
    .title
      background #f6f6f6
      padding 10px
  .messages-content
    padding 10px
</style>
