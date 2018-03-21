<template lang="pug">
  div.qcw-image-modal__container
    div.qcw-image-modal__overlay(@click="closeBtnHandler")
    div.qcw-image-modal__wrapper
      div.qcw-image-modal__actions
        i.qcw-image-modal__action(@click="openImage")
          icon(name="ic-link-out")
        i.qcw-image-modal__action(@click="closeBtnHandler" style="font-size: 13px")
          icon(name="ic-close")
      image-loader(:comment="comment"
        :message="comment.message")
</template>

<script>
import Icon from './Icon';
import ImageLoader from './ImageLoader';

export default {
  name: 'ImageModal',
  components: { ImageLoader, Icon },
  props: ['uri', 'closeBtnHandler', 'comment'],
  data() {
    return {
      imageSrc: '',
    };
  },
  mounted() {
    this.imageSrc = this.comment.message.substring(6, this.comment.message.length - 7).trim();
  },
  methods: {
    openImage() {
      // get url
      const url = (typeof this.comment !== 'string')
                  ? this.comment.message.substring(7, this.comment.message.length - 8)
                  : this.comment;
      window.open(url, '_blank');
    },
  },
};
</script>

<style lang="stylus">
@import '../assets/stylus/_variables.styl'
.qcw-image-modal__container
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 1
  display flex
  justify-content center
  align-items center
  overflow-y scroll
  padding 20px
  background rgba(255,255,255,.90)
.qcw-image-modal__overlay
  position fixed
  top 0
  left 0
  width 100%
  height 100%
.qcw-image-modal__wrapper
  min-width 240px
  position relative
  max-width 90%
  max-height 90%
  animation fadeInZoom 0.2s ease-out
  .image-loader
    box-shadow 0 3px 15px rgba(0,0,0,.7)
    display block
  .loading-image-container
    padding 48px 0
    margin 0px auto
    background-color $white
  .qcw-image-container
    margin 0;
    width 100%
    background-color: #fff;
    img
      border-radius 0
      margin-bottom 16px
.qcw-image-modal__actions
  position absolute
  display flex
  top -36px
  right 0
  align-items center
.qcw-image-modal__action
  cursor pointer
  margin-left 15px
</style>
