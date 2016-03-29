<template lang="jade">
.collect-button
  button(@click="collect") Click to collect {{collected}}
</template>

<script>
  import request from 'superagent'

  export default {
    data () {
      return {
      }
    },
    props: ['collected', 'id'],
    methods: {
      collect () {
        if (this.collected === false) {
          request
            .post('https://cnodejs.org/api/topic_collect/collect')
            .set('Content-Type', 'application/json')
            .send({accessToken: '166cc9bc-ddcc-42f2-87ba-8d276f6bb333', topic_id: this.id})
            .end((err, res) => {
              if (!err) {
                console.log(res)
              }
            })
        } else {
          // request
          //   .post('https://cnodejs.org/api/topic_collect/de_collect')
          //   .end(() => {
          //     this.collected = false
          //   })
        }
      }
    }
  }
</script>
