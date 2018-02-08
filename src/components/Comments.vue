<template lang="pug">
  div.qcw-comments
    div.qcw-load-comment-indicator(v-if="core.isLoading")
      loader(width="70px" height="70px" borderWidth="5px")

    ul(v-if="core.selected")
      li(class="qcw-load-more-btn" @click="loadMore") 
        icon(name="ic-load" class="ic-load-more__state" v-if="isLoadingMore")
        span Load More
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
      //- component for uploader progress
      li(v-if="uploadedFiles.length > 0")
        div(v-for="file in uploadedFiles" class="qcw-upload-progress") Uploading {{ `${file.name}` }}
</template>

<script>
import Icon from './Icon';
import Loader from './Loader';
import Comment from './Comment';

export default {
  name: 'Comments',
  components: { Icon, Loader, Comment },
  props: ['core', 'onClickImage', 'onupdate', 'replyHandler'],
  computed: {
    uploadedFiles() {
      return this.core.uploadedFiles
        .filter(f => f.room_id === this.core.selected.id);
    },
  },
  data() {
    return {
      isLoadingMore: false,
    };
  },
  methods: {
    loadMore() {
      this.isLoadingMore = true;
      this.core.loadComments(this.core.selected.id,
        this.core.selected.comments[0].id,
        null,
        'false').then(() => {
          this.isLoadingMore = false;
        });
    },
  },
};
</script>

<style lang="stylus">
  @import '../assets/stylus/_variables.styl'
  .qcw-load-more-btn
    width 82px
    border-radius 10px
    text-align center
    font-weight bold
    font-size: 9px;
    margin: 12px auto 0px auto;
    flex: 1 100%;
    color $white
    background-color $green
    text-transform uppercase
    cursor pointer
    transition transform .32s ease
    display flex
    align-items center
    justify-content center
    &:hover
      transform translatey(-2px)
  .qc-icon
    &.ic-load__state,
    &.ic-check__state,
    &.ic-double-check__state
      fill $green
      margin-right 8px
    &.ic-load-more__state
      fill: #fff;
      margin: 0 4px 0 0;
      height: 12px;
      width: 12px;
      animation spin 1s ease-in-out infinite
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

  .comment-text
    width 100%

  .qcw-comments
    background $darkWhite
    &::-webkit-scrollbar-track
      border-radius: 10px;
      background-color: #fafafa;

    &::-webkit-scrollbar
      width: 8px;
      background-color: #fafafa;

    &::-webkit-scrollbar-thumb
      border-radius: 4px;
      background-color: #e0e0e0;

  .qcw-comments ul
    list-style none
    margin 0
    padding 0

  i.reply-btn
    position absolute
    overflow hidden
    right -32px
    top 6px
    height 24px
    cursor pointer
    width 24px
    border-radius 50%
    background: $lightGrey
    display: none;
    z-index 2
    animation:fadeInLeftBig 0.3s ease-out;
    transition: background 0.3s ease-out
    &.reply-btn--me
      left -32px
    &:hover
      background-color $green
      .qc-icon
        fill $white
    & svg.qc-icon
      display block
      width 12px
      height 12px
      margin 6px auto

  .qcw-comments li:hover
    i.reply-btn
      display inline-block
    .qcw-comment__state
      display none
    .qcw-comment__time
      display none
  
  .qcw-comment__time, .qcw-comment__state
    animation:fadeInDown 0.3s ease-out;

  .qcw-comment-container
    padding 0 16px
    display: flex;
    flex-wrap: wrap;
    &.comment--me
      justify-content flex-end
      .qcw-avatar
        display none
  
  .qcw-comment-date
    text-align center
    font-weight bold
    font-size 9px
    margin 24px auto 12px auto
    flex: 1 100%;
    color $darkGrey
    text-transform uppercase
    div
      width: 170px;
      margin: auto;
      padding: 2px 8px;
      background-color: $lightGrey;
      border-radius: 12px;
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
    width: calc(100% - 27px);
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
    min-width 56px
    max-width 210px
    align-items flex-end
    border-radius 8px
    .comment--parent &
      margin-left 60px
      flex-wrap wrap
    .comment--me &
      margin-left 0px
      margin-right 12px
      background $white
    .comment--parent &, .comment--mid &
      margin-left 12px
    .comment--mid &
      margin-left 12px
    .comment--last &
      margin-left 12px
      margin-right 60px
    .comment--parent.comment--me &
      margin-left 60px
    .comment--last.comment--me &
      margin-left 60px
      margin-right 12px
    .comment--parent.comment--last &
      margin-left 12px
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

  @media only screen and (min-width: 640px)
    .qcw-container--wide
      .qcw-comment__message
        max-width 400px
  @media only screen and (min-width: 1024px)
    .qcw-container--wide
      .qcw-comment__message
        max-width 800px

  .comment--last
    margin-bottom 24px
  .comment-text
    .qcw-comment__content 
      margin 0
      word-break break-word
      word-wrap break-word
      white-space pre-line
  .qcw-comment__content
    img.emojione
      display inline-block
      vertical-align middle
      width 14px

</style>


