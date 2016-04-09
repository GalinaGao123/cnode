<template lang="jade">
.detail-page
  .mask(v-if="$loadingRouteData")
    h1 Loading...
  .page-content
    .topic-content
      h1 {{topic.title}}
      collect(:collected="topic.is_collect", :id="topic.id")
      p.info 发布于 {{topic.create_at}} &bullet; 来自 {{tabs[topic.tab]}}
      .topic-detail {{{topic.content | toHTML}}}
    replies(:replies="topic.replies", :topic-id="topic.id")
    reply-box(:topic-id="topic.id")
  user(:user-info="userDetail")
</template>

<script>
import request from 'superagent'
import collect from '../components/collect'
import user from '../components/user'
import replies from '../components/replies'
import replyBox from '../components/replyBox'
import {getStorage} from '../common/storage'

export default {
  data () {
    return {
      topic: {
        author: {},
        replies: []
      },
      userDetail: {},
      tabs: {share: '分享', ask: '问答', job: '招聘'}
    }
  },
  components: {
    collect,
    user,
    replies,
    replyBox
  },
  route: {
    data (transition) {
      request
        .get('https://cnodejs.org/api/v1/topic/' + transition.to.params.id)
        .query({mdrender: false, accesstoken: `${getStorage('accessToken')}`})
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
  },
  events: {
    reloadReply () {
      request
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .query({accesstoken: `${getStorage('accessToken')}`})
        .end((err, res) => {
          if (!err) {
            this.topic = res.body.data
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
  .mask
    position fixed
    z-index 10
    top 0
    left 0
    right 0
    bottom 0
    background #eee
    display flex
    align-items center
    justify-content center
  .page-content
    width 70%
    padding-right 30px
    float left
    border-radius 5px
    margin-bottom 10px
    .topic-content
      background #fff
      padding 10px 15px
      margin-bottom 20px
      .info
        font-size 12px
        color #808080
        padding-bottom 20px
        margin-bottom 0
        border-bottom 1px solid #eee
  .user-aside
    width 30%
    float left
</style>
