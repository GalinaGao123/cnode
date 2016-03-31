<template lang="jade">
div
  .nav
    .main-content
      a(v-link="{ name: 'login' }", v-if="!loged") 登录
  .main
    .main-content
      .page-content
        router-view
      .user
        .avatar
          a(v-link="{name: 'user', params: {loginname: loginname}}")
            img(:src=" avatar_url")
        .name
          a(v-link="{name: 'user', params: {loginname: loginname}}") {{loginname}}
  .footer
    .main-content
      .copyright
        p &copy; GalinaGao123
</template>

<script>
export default {
  data () {
    return {
      loginname: '',
      loged: false,
      avatar_url: ''
    }
  },
  ready () {
    this.loged = window.localStorage.getItem('loged')
    this.loginname = window.localStorage.getItem('loginname')
    this.avatar_url = window.localStorage.getItem('avatar_url')
  }
}
</script>
<style lang="stylus">
*
  box-sizing border-box
body
  margin 0
  .main-content
    max-width 940px
    margin 0 auto
.nav
  background #369
  padding 20px 0
  margin-bottom 30px
  a
    color #fff
.main
  &:after
    content ''
    display block
    clear both
  .page-content
    width 70%
    padding-right 30px
    float left
  .user
    width 30%
    float left

.footer
  position fixed
  bottom 0
  width 100%
  background #369
  padding 10px 0
  p
    margin 0
    color #fff
</style>
