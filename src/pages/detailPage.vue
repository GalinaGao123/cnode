<template lang="jade">
.detail-page
  .page-content
    h1 {{topic.title}}
    collect(:collected="topic.is_collect", :id="topic.id")
    .topic-detail {{{topic.content}}}
  user(:user-info="userDetail")
</template>

<script>
import request from 'superagent'
import collect from '../components/collect'
import user from '../components/user'

export default {
  data () {
    return {
      topic: {
        author: {}
      },
      userDetail: {}
    }
  },
  components: {
    collect,
    user
  },
  route: {
    data (transition) {
      request
        .get('https://cnodejs.org/api/v1/topic/' + transition.to.params.id)
        .query({mdrender: true, accesstoken: `${window.localStorage.getItem('accesstoken')}`})
        .end((err, res) => {
          if (!err) {
            let a = res.body.data
            request
              .get(`https://cnodejs.org/api/v1/user/${res.body.data.author.loginname}`)
              .end((err, res) => {
                if (!err) {
                  transition.next({topic: a, userDetail: res.body.data})
                }
              })
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.detail-page
  &:after
    content ''
    display block
    clear both
  .page-content
    width 70%
    float left
    padding-right 30px
    h1
      margin-top 0
  .user-aside
    width 30%
    float left
</style>
