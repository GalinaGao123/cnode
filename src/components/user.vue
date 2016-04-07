<template lang="jade">
.user-aside
  h2 个人信息
  .author
    .basic-info
      a.avatar(v-link="{name: 'user', params: {loginname: userInfo.loginname}}")
        img(:src="userInfo.avatar_url")
      a(v-link="{name: 'user', params: {loginname: userInfo.loginname}}") {{userInfo.loginname}}
    .description
      p 积分： {{userInfo.score}}
</template>

<script>
export default {
  props: ['userInfo']
}
</script>

<style lang="stylus">
.user-aside
  width 30%
  float left
  background #fff
  border-radius 3px 3px 0 0
  h2
    font-size 14px
    background #f6f6f6
    border-radius 3px 3px 0 0
    margin 0
    padding 10px
  .author
    padding 10px
    .basic-info
      display flex
      align-items center
      .avatar
        width 50px
        margin-right 20px
        img
          width 100%
</style>
