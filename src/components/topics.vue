<template lang="jade">
.topics
  ul.tags
    li(v-for="tag in tags")
      a(@click="changeTab($index)", :class="{'current-tag': $index == currentTag}") {{tag.name}}
  ul.topic-container
    li(v-for="topic in topics")
      topic(:topic="topic")
  button(@click="loadMore") Load More
</template>

<script>
import request from 'superagent'
import topic from './topic'

export default {
  data () {
    return {
      topics: [],
      page: 1,
      limit: 10,
      tags: [
        {name: '全部', api: ''},
        {name: '精华', api: 'good'},
        {name: '分享', api: 'share'},
        {name: '问答', api: 'ask'},
        {name: '招聘', api: 'job'}
      ],
      currentTag: 0
    }
  },
  components: {
    topic
  },
  ready () {
    this.loadTopics()
  },
  methods: {
    loadTopics () {
      request
        .get('https://cnodejs.org/api/v1/topics')
        .query({
          page: this.page,
          limit: this.limit,
          mdrender: false,
          tab: this.tags[this.currentTag].api
        }).end((err, res) => {
          if (!err) {
            res.body.data.forEach(cur => this.topics.push(cur))
          }
        })
    },
    loadMore () {
      this.page += 1
      this.loadTopics()
    },
    changeTab (idx) {
      this.currentTag = idx
      this.page = 1
      request
        .get('https://cnodejs.org/api/v1/topics')
        .query({
          page: this.page,
          limit: this.limit,
          mdrender: false,
          tab: this.tags[this.currentTag].api
        }).end((err, res) => {
          if (!err) {
            this.topics = res.body.data
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.topics
  background #fff
  border-radius 5px
  ul
    list-style none
    padding-left 0
    border-radius 5px 5px 0 0
    &.tags
      background #f6f6f6
      padding 10px 20px
      li
        display inline-block
        margin-right 20px
        a
          color #80bd01
          &:hover
            color #08c
        .current-tag
          background #80bd01
          color #fff
          padding 2px 4px
          &:hover
            color #fff
  button
    margin 20px 0
  ul.topic-container
    li
      padding 10px 0
      border-bottom 1px solid #eee
      &:after
        content ''
        display block
        clear both
</style>
