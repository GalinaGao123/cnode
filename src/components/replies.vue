<template lang="jade">
.replies
  p.reply-count {{replies.length}} 条回复
  ul
    li(v-for="reply in replies")
      reply(:reply="reply", :index="$index")
  h3 添加回复
</template>

<script>
import {getUserInfo} from '../vuex/getters'
import reply from './reply'

export default {
  components: {
    reply
  },
  props: ['replies', 'topicId'],
  vuex: {
    getters: {
      getUserInfo
    }
  }
}
</script>

<style lang="stylus">
.replies
  h3
    margin 20px 0 0
    font-size 14px
    background #f6f6f6
    padding 10px
  .reply-count
    background #f6f6f6
    padding 10px
    margin-bottom 0
  ul
    list-style none
    padding-left 0
</style>
