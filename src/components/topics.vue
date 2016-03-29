<template lang="jade">
.topics
  ul
    li(v-for="topic in topics")
      .author
        a(v-link="{ name: 'user', params: {loginname: topic.author.loginname} }")
          img(:src="topic.author.avatar_url")
      a(v-link="{ name: 'topic', params: {id: topic.id} }") {{topic.title}}
  button(@click="loadMore") Load More
</template>

<script>
import request from 'superagent'

export default {
  data () {
    return {
      topics: [],
      page: 1,
      limit: 10
    }
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
          mdrender: false
        }).end((err, res) => {
          if (!err) {
            res.body.data.forEach(cur => this.topics.push(cur))
          }
        })
    },
    loadMore () {
      this.page += 1
      this.loadTopics()
    }
  }
}
</script>
