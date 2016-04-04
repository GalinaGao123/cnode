<template lang="jade">
.collect-button
  button(@click="collect") {{collected ? '取消收藏' : '收藏'}}
</template>

<script>
  import request from 'superagent'

  export default {
    data () {
      return {
      }
    },
    props: ['collected', 'id'],
    methods: {
      collect () {
        if (this.collected === false) {
          request
            .post('https://cnodejs.org/api/v1/topic_collect/collect')
            .send('accesstoken=166cc9bc-ddcc-42f2-87ba-8d276f6bb333')
            .send(`topic_id=${this.id}`)
            .end((err, res) => {
              if (!err) {
                this.button = '取消收藏'
              }
            })
        } else {
          request
            .post('https://cnodejs.org/api/v1/topic_collect/de_collect')
            .send('accesstoken=166cc9bc-ddcc-42f2-87ba-8d276f6bb333')
            .send(`topic_id=${this.id}`)
            .end((err, res) => {
              if (!err) {
                this.button = '收藏'
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
  color #fff
  &:hover
    background #6ba44e
</style>
