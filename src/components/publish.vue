<template lang="jade">
.create-topic
  a(v-link="{name: 'create'}", v-if="getUserInfo.accessToken") 发布话题
</template>

<script>
import {getUserInfo} from '../vuex/getters'

export default {
  vuex: {
    getters: {
      getUserInfo
    }
  }
}
</script>

<style lang="stylus">
.create-topic
  padding 10px 0
  border-radius 0 0 3px 3px
  background #fff
  margin-top 20px
  width 30%
  float left
  text-align center
  a
    display inline-block
    background #80bd01
    padding 10px 20px
    border-radius 3px
    color #fff
    &:hover
      background #6ba44e
</style>
