<template lang="jade">
.topic
  .author
    a(v-link="{ name: 'user', params: {loginname: topic.author.loginname} }")
      img(:src="topic.author.avatar_url")
  p {{topic.reply_count}} / {{topic.visit_count}}
  .tag(:class="{grey: !topic.top && !topic.good}") {{tag}}
  .topic-title
    a(v-link="{ name: 'topic', params: {id: topic.id} }") {{topic.title}}

</template>

<script>
let tabs = {share: '分享', ask: '问答', job: '招聘'}

export default {
  props: ['topic'],
  computed: {
    tag () {
      if (this.topic.top) {
        return '置顶'
      } else if (this.topic.good) {
        return '精华'
      } else {
        return tabs[this.topic.tab]
      }
    }
  }
}
</script>

<style lang="stylus">
.topic
  display flex
  padding 0 20px
  align-items center
  .author
    a
      display block
      &:hover
        text-decoration none
      img
        width 40px
        display block
  p
    margin 0 10px
    width 80px
  .tag
    width 40px
    text-align center
    background #80bd01
    border-radius 2px
    color #fff
    &.grey
      background #aaa
  .topic-title
    margin-left 10px
    width 70%
    a
      display block
      color #333
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      width 100%

</style>
