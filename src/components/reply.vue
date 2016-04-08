<template lang="jade">
.reply(:class="{'show': reply.ups.length > 0}")
  .btn.reply-btn(@click="showBox = !showBox") 回复
  .btn.ding(@click="up") 顶 {{upNum}}
  .author
    .avatar
      a.avatar(v-link="{name: 'user', params: {loginname: reply.author.loginname}}")
        img(:src="reply.author.avatar_url")
    a.name(v-link="{name: 'user', params: {loginname: reply.author.loginname}}") {{reply.author.loginname}}
    p.reply-info {{index + 1}}楼 &bullet; {{reply.create_at}}
  .reply-content {{{reply.content}}}
  reply-box(v-if="showBox", :reply-id="reply.id")
</template>

<script>
import request from 'superagent'
import replyBox from './replyBox'
import {getUserInfo} from '../vuex/getters'

export default {
  data () {
    return {
      upNum: 0,
      str: '',
      showBox: false
    }
  },
  props: ['reply', 'index'],
  components: {
    replyBox
  },
  ready () {
    this.upNum = this.reply.ups.length
  },
  vuex: {
    getters: {
      getUserInfo
    }
  },
  methods: {
    up () {
      request
        .post(`https://cnodejs.org/api/v1/reply/${this.reply.id}/ups`)
        .type('form')
        .send({accesstoken: this.getUserInfo.accessToken})
        .end((err, res) => {
          if (!err) {
            if (res.body.action === 'up') {
              this.upNum++
            } else {
              this.upNum--
            }
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.reply
  background #fff
  padding 10px 15px 0
  border-bottom 1px solid #eee
  .btn
    background #80bd01
    color #fff
    border-radius 2px
    padding 2px 4px
    margin 10px 10px 0 0
    float right
    &:hover
      background #6ba44e
    &.ding
      display none
  &:hover
    .ding
      display block
  &.show
    .ding
      display block
  .author
    display flex
    align-items center
    a
      display block
      &.avatar
        width 40px
      &.name
        margin-left 10px
    .reply-info
      font-size 12px
      color #666
      margin-left 20px
  .reply-content
    padding-left 50px
</style>
