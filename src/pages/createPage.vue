<template lang="jade">
.create-page
  .page-content
    .title
      a(v-link="{path: '/'}") 主页
      span /
      span 发布话题
    .select-tab
      span 请选择板块:
      select(v-model="selectedTab")
        option 请选择
        option 分享
        option 问答
        option 招聘
    .topic-title
      input(type="text", placeholder="标题字数10字以上", v-model="topicTitle")
    .topic-content
      textarea(v-model="topicContent")
      a.publish-btn(@click="publish") 发布
  user(:user-info="userDetail")
</template>

<script>
import request from 'superagent'
import {getUserInfo} from '../vuex/getters'
import user from '../components/user'
let tabs = {分享: 'share', 问答: 'ask', 招聘: 'job'}

export default {
  data () {
    return {
      userDetail: {},
      selectedTab: '请选择',
      topicTitle: '',
      topicContent: ''
    }
  },
  components: {
    user
  },
  ready () {
    request
      .get(`https://cnodejs.org/api/v1/user/${this.getUserInfo.loginName}`)
      .end((err, res) => {
        if (!err) {
          this.userDetail = res.body.data
        }
      })
  },
  methods: {
    publish () {
      request
        .post('https://cnodejs.org/api/v1/topics')
        .type('form')
        .send({
          accesstoken: this.getUserInfo.accessToken,
          title: this.topicTitle,
          tab: tabs[this.selectedTab],
          content: this.topicContent
        })
        .end((err, res) => {
          if (!err) {
            console.log(111)
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
.create-page
  &:after
    content ''
    display block
    clear both
  .page-content
    width 70%
    float left
    padding-right 30px
  .title
    background #f6f6f6
    padding 10px
    a
      color #80bd01
    span
      margin-left 5px
  .select-tab
    margin 20px 0
    span
      margin-right 20px
  .topic-title
    input
      width 100%
      border-radius 3px
      border 1px solid #ccc
      padding 0 10px
      height 40px
      margin-bottom 20px
  .topic-content
    textarea
      width 100%
      height 400px
      border 1px solid #ccc
    .publish-btn
      background #80bd01
      color #fff
      padding 5px 10px
      text-align center
      display inline-block
      margin 10px 0 20px 0
      &:hover
        background #6ba44e
</style>
