<template lang="pug">
  div.qcw-chat-wrapper

    svg-icon

    comment-reply-preview(v-if="repliedComment" :comment="repliedComment" :closeReplyHandler="closeReply")

    div.qcw-header(v-if="core.selected" :style="{background: core.UI.colors.headerBackgroundColor}")
      div.qcw-header-avatar
        img(:src="core.selected.avatar")
      div.qcw-header-info
        strong {{ core.selected.name }}

      i(@click="toggleWindowStatus" class="qcw-window-toggle-btn")
        icon(name="ic-chevron-down" fill="#FFFFFF")

    comments(:core="core" :on-click-image="openImageModal" 
      :repliedComment="repliedComment"
      :replyHandler="setReply" :onupdate="scrollToBottom")

    comment-form(:core="core" :repliedComment="repliedComment" :closeReplyHandler="closeReply")
</template>

<script>
import SvgIcon from './SVGIcon';
import Icon from './Icon';
import Comments from './Comments';
import CommentForm from './CommentForm';
import CommentReplyPreview from './CommentReplyPreview';
import { scrollIntoElement } from '../lib/utils';

export default {
  name: 'ChatWindow',
  props: ['core', 'toggleWindowStatus'],
  components: { Comments, SvgIcon, Icon, CommentForm, CommentReplyPreview },
  data() {
    return {
      repliedComment: null,
    };
  },
  methods: {
    openImageModal() {
      console.info('opening modal');
    },
    setReply(comment) {
      console.info('set reply');
      this.repliedComment = comment;
      // focus the textarea of commentform
      const element = document.querySelector('.qcw-comment-form textarea');
      if (element) element.focus();
    },
    closeReply() {
      this.repliedComment = null;
    },
    scrollToBottom() {
      scrollIntoElement(this.core);
    },
  },
};
</script>

<style lang="stylus">
  @import '../assets/stylus/_variables.styl'
  .qcw-chat-wrapper
    height 450px
    width 400px
    display flex
    flex-direction column
    box-shadow 0 2px 15px rgba(0,0,0,.3)
    border-radius 5px
    overflow hidden
    position absolute
    bottom -700px
    transition all .32s ease

    .qcw-container.qcw-container--open &
      bottom 45px
  
  .qcw-window-toggle-btn
    cursor pointer
  .qcw-header
    flex 0 0 50px
    background $primary-color
    display flex
    align-items center
    padding 5px 10px
    .qcw-header-avatar 
      flex 0 0 35px
    .qcw-header-avatar img
      width 24px
      height 24px
      border-radius 50%
    .qcw-header-info
      flex 1
      color #FFF
  
  .qcw-comments
    flex 1
    overflow hidden
    overflow-y auto
    position relative
  
  .qcw-comment-form
    flex 0 0 50px
    background #FFF

  .qcw-avatar--hide
    visibility hidden
  
  .reply-wrapper
    position relative
    padding 15px
    background $mybubble-color

  .reply-wrapper:before
    content ""
    position: absolute
    left 5px
    width 3px
    height calc(100% - 30px)
    background #444
  
  .reply-wrapper.reply-wrapper--preview
    position absolute
    bottom 50px
    z-index 500
    background $mybubble-color
    width 100%
    box-shadow 0 -3px 5px rgba(0,0,0,.3)

  .reply-sender
    font-size 13px
    margin-bottom 10px
  
  .reply-close-btn
    position absolute
    right 10px
    top 10px
    font-size 10px
    cursor pointer
</style>


