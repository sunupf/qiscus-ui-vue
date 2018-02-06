<template lang="pug">
  div(class="comment__card--container")
    div(class="comment__card--image" :style="{'background-image': 'url('+data.image+')'}")
    strong(class="comment__card--title") {{ data.title }}
    div(class="comment__card--description") {{ data.description }}
    comment-buttons(:buttons="data.buttons" :postbackHandler="postbackSubmit")
</template>

<script>
import QiscusCore from '../lib/SDKCore';
import CommentButtons from './CommentButtons';

export default {
  name: 'QiscusCardComment',
  components: { CommentButtons },
  props: ['data'],
  methods: {
    postbackSubmit(button) {
      const topicId = QiscusCore.selected.id;
      const labelToSend = button.postback_text ? button.postback_text : button.label;
      QiscusCore.sendComment(topicId, labelToSend, null, 'button_postback_response', JSON.stringify(button.payload));
    },
  },
};
</script>


<style lang="stylus">
  @import '../assets/stylus/_variables.styl'
  .comment--me
    .comment__card--container
      .comment__card--image
        background-color $lightGrey
  
  .comment__card--container
    margin-left -8px
    width calc(100% + 16px)
    .comment__card--description
      padding 0 8px 16px 8px
      font-size 11px
    .comment__card--image
      border-bottom 1px solid $lightGrey
      background-size cover
      background-position center
      background-color $mediumGrey
      height 160px
      margin-top -8px
      border-radius 8px 8px 0 0
    .comment__card--title
      text-transform capitalize
      font-size 12px
      font-weight 600
      margin 0px
      padding 8px
      display block
    .qcw-comment__buttons
      margin-left 0
</style>