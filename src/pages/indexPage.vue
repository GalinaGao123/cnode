<template lang="jade">
.home-page
  .page-content
    topics
  user(:user-info="userDetail", v-if="user.accessToken")
  publish
</template>

<script>
import topics from '../components/topics'
import user from '../components/user'
import publish from '../components/publish'
import {getUserInfo} from '../vuex/getters'
import request from 'superagent'

export default {
  data () {
    return {
      userDetail: {}
    }
  },
  components: {
    topics,
    user,
    publish
  },
  vuex: {
    getters: {
      user: getUserInfo
    }
  },
  ready () {
    request
      .get(`https://cnodejs.org/api/v1/user/${this.user.loginName}`)
      .end((err, res) => {
        if (!err) {
          this.$set('userDetail', res.body.data)
        }
      })
  }
}
</script>

<style lang="stylus">
.home-page
  &:after
    content ''
    display block
    clear both
  .page-content
    width 70%
    float left
    padding-right 30px
</style>
