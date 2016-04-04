<template lang="jade">
.user-page
  .page-content
    h1 {{user.loginname}}
    h2 this is my collections
    my-collection(:collections="collections")
  user(:user-info="user")
</template>

<script>
import request from 'superagent'
import myCollection from '../components/myCollection'
import user from '../components/user'

export default {
  data () {
    return {
      user: {},
      collections: []
    }
  },
  components: {
    myCollection,
    user
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
  .user-aside
    width 30%
    float left
</style>
