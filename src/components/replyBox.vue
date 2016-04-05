<template lang="jade">
.reply-box
  h3 添加回复
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
  props: ['topicId'],
  methods: {
    addCommont () {
      request
        .post(`https://cnodejs.org/api/v1/topic/${this.topicId}/replies`)
        .type('form')
        .send({accesstoken: this.getUserInfo.accessToken, content: this.replyContent})
        .end((err, res) => {
          if (!err) {
            console.log(213)
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
  h3
    margin 0 0 20px 0
    background #f6f6f6
    padding 10px
  .input-box
    padding 0 15px
    textarea
      display block
      width 100%
      height 80px
  .reply-btn
    display inline-block
    background #08c
    color #fff
    border-radius 2px
    padding 2px 4px
    margin 15px
    &:hover
      background #005580
</style>
