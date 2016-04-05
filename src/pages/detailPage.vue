<template lang="jade">
.detail-page
  .page-content
    .topic-content
      h1 {{topic.title}}
      collect(:collected="topic.is_collect", :id="topic.id")
      p.info 发布于 {{topic.create_at}} &bullet; 来自 {{topic.tab}}
      .topic-detail {{{topic.content}}}
      reply(:topic="topic")
    reply-box(:topic-id="topic.id")
  user(:user-info="userDetail")
</template>

<script>
import request from 'superagent'
import collect from '../components/collect'
import user from '../components/user'
import reply from '../components/reply'
import replyBox from '../components/replyBox'
import {getStorage} from '../common/storage'

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
    user,
    reply,
    replyBox
  },
  route: {
    data (transition) {
      request
        .get('https://cnodejs.org/api/v1/topic/' + transition.to.params.id)
        .query({mdrender: true, accesstoken: `${getStorage('accessToken')}`})
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
    width 65%
    float left
    border-radius 5px
    margin-bottom 10px
    .topic-content
      background #fff
      padding 10px 15px 0
      margin-bottom 20px
      .info
        font-size 12px
        color #808080
        padding-bottom 20px
        margin-bottom 0
        border-bottom 1px solid #eee
  .user-aside
    width 30%
    margin-left 5%
    float left
</style>
