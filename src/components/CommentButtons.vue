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
  .qcw-comment__content
    margin-left -8px
    padding 0 8px
  .qcw-comment__buttons 
    margin-left -8px
    margin-bottom -8px
    .action_buttons:last-child
        border-radius 0 0 7px 7px
    .action_buttons 
      background-color #fff
      border-top 1px solid $lightGrey
      &:hover
        a,button
          /*transform translateY(-4px)*/
          text-decoration underline
          cursor pointer
      &:last-child
        border-radius 0 0 7px 7px
      button, a
        /*transition transform .5s ease-out*/
        background-color transparent
        font-size 13px
        font-weight 600
        font-family "Open sans", sans-serif
        width 210px
        margin 0 
        height 48px
        border 0
        color $blue
        text-transform capitalize
        text-decoration none
        display block 
        width 100%
      a
        line-height 48px
        text-align center
</style>