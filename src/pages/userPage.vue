<template lang="jade">
.user-page
  .page-content
    .title
      a(v-link="{path: '/'}") 主页
      span /
    .brief
      .author
        img(:src="user.avatar_url")
        span {{user.loginname}}
      .collections
        h2 我的收藏
        my-collection(:collections="collections")
    .content-block
      h3 最近发布的话题
      .detail
        ul(v-if="user.recent_topics.length", v-for="topic in user.recent_topics")
          li
            a(v-link="{name: 'topic', params: {id: topic.id}}") {{topic.title}}
        span(v-else) 无
    .content-block
      h3 最近参与的话题
      .detail
        ul(v-if="user.recent_replies.length", v-for="reply in user.recent_replies")
          li
            a(v-link="{name: 'topic', params: {id: reply.id}}") {{reply.title}}
        span(v-else) 无
  user(:user-info="user")
  publish
</template>

<script>
import request from 'superagent'
import myCollection from '../components/myCollection'
import user from '../components/user'
import publish from '../components/publish'

export default {
  data () {
    return {
      user: {
        recent_replies: [],
        recent_topics: []
      },
      collections: []
    }
  },
  components: {
    myCollection,
    user,
    publish
  },
  route: {
    data (transition) {
      request
        .get('https://cnodejs.org/api/v1/user/' + transition.to.params.loginname)
        .end((err, res) => {
          if (!err) {
            let user = res.body.data
            request
              .get('https://cnodejs.org/api/v1/topic_collect/' + transition.to.params.loginname)
              .end((err, res) => {
                let collections = res.body.data
                if (!err) {
                  transition.next({ user, collections })
                }
              })
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.user-page
  &:after
    content ''
    display block
    clear both
  .page-content
    width 70%
    float left
    padding-right 30px
    h3
      margin 0
      padding 10px
      background #f6f6f6
      border-radius 3px 3px 0 0
    .title
      background #f6f6f6
      padding 10px
      border-radius 3px 3px 0 0
      a
        color #80bd01
        margin-right 5px
    .brief
      background #fff
      padding 10px
      .author
        display flex
        align-items center
        img
          width 50px
          margin-right 10px
    .collections
      h2
        font-size 18px
    .content-block
      margin 20px 0
      .detail
        background #fff
        padding 10px
  .user-aside
    width 30%
    float left
</style>
