<template lang="jade">
div
  navigation
  .main
    .main-content
      router-view
  .footer
    .main-content
      .copyright
        p &copy;
</template>

<script>
import navigation from './components/nav'
import store from './vuex/store'

export default {
  components: {
    navigation
  },
  store
}
</script>
<style src="normalize.css/normalize.css"></style>
<style lang="stylus">
*
  box-sizing border-box
a
  color #333
  text-decoration none
  &:hover
    text-decoration underline
ul
ol
  padding-left 18px
  margin 0
body
  margin 0
  color #333
  font-size 14px
  background #eee
  .main-content
    max-width 960px
    margin 0 auto
.footer
  background #444
  padding 10px 0
  p
    margin 0
    color #fff
</style>
