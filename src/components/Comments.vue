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
    background $darkWhite
  .qcw-comments ul
    list-style none
    margin 0
    padding 0

  /*i.reply-btn, .qcw-comment__state
    position absolute
    top 7px
    right -28px
    display none
    cursor pointer
    .comment--me &
      right auto
      left -28px
    .qcw-comments li:hover &
      display block*/
  
  .comment--me i.reply-btn
    left -56px
  
  .qcw-comment-container
    padding 0 16px
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
    flex 0 0 36px
    img
      width 36px
      height 36px
      border-radius 50%
    .comment--me &
      order 2
      text-align right
      
  .qcw-comment__info
    padding-bottom 7px
    margin-bottom 7px
    flex 1 100%
    display flex
    justify-content: space-between;
    align-items: center;
  .qcw-comment__username
    font-weight bold
  
  .qcw-comment__state
    font-size 11px;
    text-transform lowercase
    color $darkGrey;
    position absolute
    top 16px
    
    svg.qc-icon
        margin-top 3px

  .qcw-comment
    .qcw-comment__time
        font-size 11px;
        text-transform lowercase
        color $darkGrey;
        position absolute
        min-width 50px
        top 8px
        right -58px
    &.comment--me
      .qcw-comment__time
        top 2px
        left -58px
      .qcw-comment__state
        left -20px
        svg.qc-icon
            width 12px
            height 9px
      .qcw-comment__state--read,
      .qcw-comment__state--delivered
        left -24px
        svg.qc-icon
            width 16px
            height 9px
            margin 0 auto
      .qcw-comment__state--sending
        left -19px
        -webkit-animation:spin 1s ease-in-out infinite;
        -moz-animation:spin 1s ease-in-out infinite;
        animation:spin 1s ease-in-out infinite;
      .qcw-comment__state--failed
        color $red
        text-transform capitalize
        left -17px
        cursor pointer

  .failed-info
    text-align right
    margin-top -3px
    font-size 11px
    margin-bottom 4px
    margin-right 64px
    color $red
    span
      color $green
      &:hover
        text-decoration underline
        cursor pointer
    &.failed--last
      margin-bottom 24px
      margin-top -27px
  


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
    padding 8px
    font-size 14px
    background $lightGrey
    box-shadow 0 7px 16px rgba(199,199,199,.25)
    margin-bottom 4px
    position relative
    display flex
    max-width 210px
    align-items flex-end
    .comment--parent &
      margin-left 12px
      flex-wrap wrap
    .comment--me &
      margin-left 0px
      margin-right 12px
      background $white
    .comment--parent &, .comment--mid &
      margin-left 12px
      border-radius: 8px
    .comment--mid &
      margin-left 12px
      border-radius: 8px
    .comment--last &
      margin-left 12px
      border-radius 8px
    .comment--parent.comment--last &
      margin-left 12px
      border-radius 8px
    .comment--parent &:before
      position absolute
      top 15px
      left -8px
      pointer-events none
      content " "
      height 0
      width 0
      border 4px solid transparent
      border-right-color $lightGrey
    .comment--parent.comment--me &:before
      border-left-color $white
      border-right-color transparent
      box-shadow 0 7px 16px rgba(199,199,199,.25)
      left auto
      right -8px

  .comment--last
    margin-bottom 24px
  .qcw-comment__content img.emojione
    display inline-block
    vertical-align middle
    width 14px
</style>


