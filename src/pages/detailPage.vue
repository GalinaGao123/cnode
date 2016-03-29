<template lang="jade">
.detail-page
  h1 {{topic.title}}
  .author
    a( v-link="{name: 'user', params: {loginname: topic.author.loginname}}" )
      img(:src="topic.author.avatar_url")
    span {{topic.author.loginname}}
    span {{topic.create_at}}
  collect(:collected="topic.is_collect", :id="topic.id")
  .article-content
</template>

<script>
import request from 'superagent'
import collect from '../components/collect'

export default {
  data () {
    return {
      topic: {
        author: {}
      }
    }
  },
  components: {
    collect
  },
  route: {
    data (transition) {
      request
        .get('https://cnodejs.org/api/v1/topic/' + transition.to.params.id)
        .query({mdrender: false})
        .end((err, res) => {
          if (!err) {
            transition.next({topic: res.body.data})
          }
        })
    }
  }
}
</script>
