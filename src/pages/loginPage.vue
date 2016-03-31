<template lang="jade">
  .login-page
    label Please input you accessToken
    input(type="text", placeholder="accessToken", v-model="accessToken")
    input(type="submit", @click="validation") 提交
    p(v-if="err") Please input correct accesstoken
    p(v-if="success") back to former page
</template>

<script>
import request from 'superagent'

export default {
  data () {
    return {
      accessToken: '',
      err: false,
      success: false
    }
  },
  methods: {
    validation () {
      request
        .post('https://cnodejs.org/api/v1/accesstoken')
        .send(`accesstoken=${this.accessToken}`)
        .end((err, res) => {
          if (err) {
            this.err = true
          } else {
            this.err = false
            this.success = true

            window.localStorage.setItem('accesstoken', `${this.accessToken}`)
            window.localStorage.setItem('loginname', `${res.body.loginname}`)
            window.localStorage.setItem('avatar_url', `${res.body.avatar_url}`)
            window.localStorage.setItem('loged', `${res.body.success}`)
            setTimeout(() => {
              window.history.back()
              this.success = false
            }, 500)
          }
        })
    }
  }
}
</script>
