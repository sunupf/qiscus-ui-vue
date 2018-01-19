<template lang="pug">
  div.qcw-chat-wrapper

    svg-icon

    image-modal(:uri="imageModalContent" :closeBtnHandler="closeImageModal" v-if="imageModalIsActive")

    comment-reply-preview(v-if="repliedComment" :comment="repliedComment" :closeReplyHandler="closeReply")

    div.qcw-header(v-if="core.selected" :style="{background: core.UI.colors.headerBackgroundColor}")
      div.qcw-header-avatar
        img(:src="core.selected.avatar")
      div.qcw-header-info
        div
          div.qcw-user-display-name {{ core.selected.name }}
          div.qcw-user-status online

      i(@click="toggleWindowStatus" class="qcw-window-toggle-btn")
        icon(name="ic-minimize")

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
import ImageModal from './ImageModal';

export default {
  name: 'ChatWindow',
  props: ['core', 'toggleWindowStatus'],
  components: { Comments, SvgIcon, Icon, CommentForm, CommentReplyPreview, ImageModal },
  data() {
    return {
      repliedComment: null,
      imageModalContent: null,
      imageModalIsActive: false,
    };
  },
  methods: {
    openImageModal(uri) {
      console.info('opening modal');
      this.imageModalContent = uri;
      this.imageModalIsActive = true;
    },
    closeImageModal() {
      this.imageModalIsActive = false;
      this.imageModalContent = null;
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
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600')
  @import '../assets/stylus/_variables.styl'

  .qcw-chat-wrapper
    font "Open Sans",sans-serif
    line-height 130%
    height 480px
    width 360px
    display flex
    flex-direction column
    box-shadow 0 7px 16px rgba(46,46,46,.15)
    border-radius 19px
    overflow hidden
    position absolute
    bottom -700px
    transition all .32s ease

    .qcw-container.qcw-container--open &
      bottom 45px
  
  .qcw-window-toggle-btn
    cursor pointer
  .qcw-header
    flex 0 0 73px
    background $white
    display flex
    align-items center
    padding 13px 16px
    border-bottom 0.5px solid $lightGrey
    .qcw-header-avatar 
      flex 0 0 48px
    .qcw-header-avatar img
      width 48px
      height 48px
      border-radius 50%
      margin-top 6px
    .qcw-header-info
      flex 1
      color $darkGrey
      margin-left 16px
      .qcw-user-display-name
        font-size 15px
        font-weight 600 
      .qcw-user-status
        font-size 13px 

  
  .qcw-comments
    flex 1
    overflow hidden
    overflow-y auto
    position relative
  
  .qcw-comment-form
    flex 0 0 64px
    background #FFF
    border-top 0.5px solid $lightGrey

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


