<template lang="pug">
  div(class="qcw-comment__buttons")
    div(class="action_buttons" v-for="button in buttons" :key="button.label")
      button(@click="postbackHandler(button)" v-if="button.type == 'postback'") {{ button.label }}
      a(:href="button.payload.url" target="_blank" v-else) {{ button.label }}
</template>

<script>
export default {
  name: 'QiscusCommentButtons',
  props: ['buttons', 'postbackHandler'],
  methods: {
    handleClick(button) {
      if (button.type === 'postback') {
        this.postbackHandler(button);
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '../assets/stylus/_variables.styl'
  .qcw-comment__buttons 
    margin-left -8px
    margin-bottom -8px
    margin-top 8px
    button
      border-radius 0 0 7px 7px
      width 210px
      margin 0 
      height 48px
      background-color #fff
      border 0
      color $blue
      text-transform capitalize
</style>