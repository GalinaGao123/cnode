<template lang="jade">
.replies
  p.reply-count {{topic.reply_count}} 条回复
  ul
    li(v-for="reply in topic.replies")
      .reply(:class="{'show': reply.ups.length > 0}")
        .btn.reply-btn 回复
        .btn.ding(@click="up(reply.id)")顶 {{reply.ups.length}}
        .author
          .avatar
            a(v-link="{name: 'user', params: {loginname: reply.author.loginname}}")
              img(:src="reply.author.avatar_url")
          a.name(v-link="{name: 'user', params: {loginname: reply.author.loginname}}") {{reply.author.loginname}}
          p.reply-info {{$index + 1}}楼 &bullet; {{reply.create_at}}
        .replay-content {{{reply.content}}}
</template>

<script>
import request from 'superagent'
import {getUserInfo} from '../vuex/getters'

export default {
  props: ['topic'],
  methods: {
    up (id) {
      request
        .post(`https://cnodejs.org/api/v1/reply/${id}/ups`)
        .type('form')
        .send({accesstoken: this.getUserInfo.accessToken})
        .end((err, res) => {
          if (!err) {
            console.log(123)
          }
        })
    }
  },
  vuex: {
    getters: {
      getUserInfo
    }
  }
}
</script>

<style lang="stylus">
.replies
  .reply-count
    background #f6f6f6
    padding 10px
  ul
    list-style none
    padding-left 0
    .reply
      padding 10px 15px
      border-bottom 1px solid #eee
      .btn
        background #08c
        color #fff
        border-radius 2px
        padding 2px 4px
        margin 10px 15px 0 0
        float right
        &:hover
          background #005580
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
          &.name
            margin-left 10px
        .reply-info
          font-size 12px
          color #666
          margin-left 20px
      .replay-content
        padding-left 30px
</style>
