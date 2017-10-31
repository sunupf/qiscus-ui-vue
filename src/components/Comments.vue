<template lang="pug">
  div.qcw-comments
    div.qcw-load-comment-indicator(v-if="core.isLoading")
      loader(width="70px" height="70px" borderWidth="5px")

    ul(v-if="core.selected")
      li(v-for="(comment, index) in core.selected.comments" :key="comment.id")
        comment(
          :comment="comment"
          :comment-before="(index-1 < 0) ? null : core.selected.comments[index-1]"
          :comment-after="(index+1 <= core.selected.comments.length-1) ? core.selected.comments[index+1] : null"
          :on-click-image="onClickImage"
          :replyHandler="replyHandler"
          :onupdate="onupdate"
          :userData="core.userData"
          :showAvatar="core.options.avatar"
        )
</template>

<script>
import Loader from './Loader';
import Comment from './Comment';

export default {
  name: 'Comments',
  components: { Loader, Comment },
  props: ['core', 'onClickImage', 'onupdate', 'replyHandler'],
};
</script>

<style lang="stylus">
  @import '../assets/stylus/_variables.styl'
  .qcw-load-comment-indicator
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    display flex
    justify-content center
    align-items center
    background rgba(0,0,0,.5)

  .qcw-comments
    background #e0f2f1
  .qcw-comments ul
    list-style none
    margin 0
    padding 0

  i.reply-btn, .qcw-comment__state
    position absolute
    top 7px
    right -20px
    display none
    cursor pointer
    .comment--me &
      right auto
      left -20px
    .qcw-comments li:hover &
      display block
  
  .comment--me i.reply-btn
    left -40px
  
  .qcw-comment-container
    padding 0 25px
    display: flex;
    flex-wrap: wrap;
    &.comment--me
      justify-content flex-end
  
  .qcw-comment-date
    text-align center
    font-weight bold
    font-size 12px
    margin 10px auto
    flex: 1 100%;
  
  .qcw-image-container
    width 90%
    height 100px
    img
      width 100%
      height 100px
  
  .qcw-comment
    display flex
    flex 0 auto
  
  .qcw-avatar
    flex 0 0 50px
    img
      width 36px
      height 36px
      border-radius 50%
    .comment--me &
      order 2
      text-align right
      
  .qcw-comment__info
    border-bottom 1px dashed #ddd
    padding-bottom 7px
    margin-bottom 7px
    flex 1 100%
    display flex
    justify-content: space-between;
    align-items: center;
  .qcw-comment__username
    font-weight bold
  .qcw-comment__time
    font-size: 10px;
    color: #717171;
    margin-left: 10px;
    min-width 50px
  
  .qcw-comment--system-event
    text-align: center;
    align-self: center !important;
    background $mybubble-color
    padding: 5px 20px;
    border-radius: 15px;
    flex: 0 auto;
    box-shadow: 0 3px 3px rgba(0,0,0,.15);
    margin: 0 auto;

  .qcw-comment__message
    flex 0 auto
    padding 10px
    font-size 13px
    background $bubble-color
    box-shadow 0 2px 3px rgba(0,0,0,.15)
    margin-bottom 3px
    position relative
    display flex
    max-width 249px
    align-items flex-end
    .comment--parent &
      flex-wrap wrap
    .comment--me &
      background $mybubble-color
    .comment--parent &, .comment--mid &
      border-radius: 5px 5px 5px 0
    .comment--mid &
      border-radius: 0 5px 5px 0
    .comment--last &
      border-radius 0 5px 5px 5px
    .comment--parent.comment--last &
      border-radius 5px
    .comment--parent &:before
      position absolute
      top 12px
      left -16px
      pointer-events none
      content " "
      height 0
      width 0
      border 8px solid transparent
      border-right-color $bubble-color
    .comment--parent.comment--me &:before
      border-left-color $mybubble-color
      border-right-color transparent
      left auto
      right -16px

  .comment--last
    margin-bottom 1.5em
</style>


