<template lang="jade">
  .collections
    //- button(@click="seeCollections") Click to see his collections
    //- h1 this is {{user.loginname}} collections
    ul
      li(v-for="collection in collections")
        a(v-link="{name: 'topic', params: {id: collection.id}}") {{collection.title}}
</template>

<script>
export default {
  props: ['collections']
}
</script>
