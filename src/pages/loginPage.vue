<template lang="jade">
  .login-page
    label Please input you accessToken
    input(type="text", placeholder="accessToken", v-model="value")
    input(type="submit", @click="validation") 提交
    p(v-if="err") Please input correct accesstoken
</template>

<script>
import request from 'superagent'
import {setStorage} from '../common/storage'
import {updateUserInfo} from '../vuex/actions'

export default {
  data () {
    return {
      value: '',
      err: false
    }
  },
  methods: {
    validation () {
      request
        .post('https://cnodejs.org/api/v1/accesstoken')
        .send(`accesstoken=${this.value}`)
        .end((err, res) => {
          if (err) {
            this.err = true
          } else {
            this.err = false
            this.updateUserInfo({accessToken: this.value, loginName: res.body.loginname})
            setStorage({accessToken: this.value, loginName: res.body.loginname})
            this.$route.router.go('/')
          }
        })
    }
  },
  vuex: {
    actions: {
      updateUserInfo
    }
  }
}
</script>
