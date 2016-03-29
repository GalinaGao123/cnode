<template lang="jade">
.user-page
  h1 {{user.loginname}}
  my-collection(:collections="collections")
</template>
<script>
import request from 'superagent'
import myCollection from '../components/myCollection'

export default {
  data () {
    return {
      user: {},
      collections: []
    }
  },
  components: {
    myCollection
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
