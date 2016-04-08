<template lang="jade">
.reply-box
  .input-box
    textarea(v-model="replyContent")
  .reply-btn(@click="addCommont") 回复
</template>

<script>
import request from 'superagent'
import {getUserInfo} from '../vuex/getters'

export default {
  data () {
    return {
      replyContent: ''
    }
  },
  props: {
    topicId: {required: true},
    replyId: {type: String}
  },
  methods: {
    addCommont () {
      let arg = {accesstoken: this.getUserInfo.accessToken, content: this.replyContent}
      if (this.replyId) {
        arg.reply_id = this.replyId
      }
      request
        .post(`https://cnodejs.org/api/v1/topic/${this.topicId}/replies`)
        .type('form')
        .send(arg)
        .end((err, res) => {
          if (!err) {
            this.$dispatch('reloadReply')
            this.replyContent = ''
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
.reply-box
  background #fff
  padding 20px 0
  &:after
    content ''
    display block
    clear both
  .input-box
    padding 0 15px
    textarea
      display block
      width 100%
      resize none
      height 80px
      border 1px solid #ccc
  .reply-btn
    display inline-block
    background #80bd01
    color #fff
    border-radius 2px
    padding 2px 4px
    float right
    margin 20px 15px 0 0
    &:hover
      background #6ba44e
</style>
