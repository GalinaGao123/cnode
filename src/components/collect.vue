<template lang="jade">
.collect-button
  button(@click="collect", v-if="getUserInfo.accessToken") {{collected ? '取消收藏' : '收藏'}}
</template>

<script>
import request from 'superagent'
import {getUserInfo} from '../vuex/getters'

export default {
  data () {
    return {
    }
  },
  props: ['collected', 'id'],
  vuex: {
    getters: {
      getUserInfo
    }
  },
  methods: {
    collect () {
      if (this.collected === false) {
        request
          .post('https://cnodejs.org/api/v1/topic_collect/collect')
          .type('form')
          .send({accesstoken: this.getUserInfo.accessToken, topic_id: this.id})
          .end((err, res) => {
            if (!err) {
              this.collected = true
            }
          })
      } else {
        request
          .post('https://cnodejs.org/api/v1/topic_collect/de_collect')
          .type('form')
          .send({accesstoken: this.getUserInfo.accessToken, topic_id: this.id})
          .end((err, res) => {
            if (!err) {
              this.collected = false
            }
          })
      }
    }
  }
}
</script>

<style lang="stylus">
button
  float right
  padding 5px 10px
  background #80bd01
  border none
  border-radius 3px
  color #fff
  &:hover
    background #6ba44e
</style>
