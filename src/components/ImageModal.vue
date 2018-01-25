<template lang="pug">
  div.qcw-image-modal__overlay
    div.qcw-image-modal__wrapper
      div.qcw-image-modal__actions
        i.qcw-image-modal__action(@click="openImage")
          icon(name="ic-link-out" fill="#FFFFFF")
        i.qcw-image-modal__action(@click="closeBtnHandler" style="font-size: 13px")
          icon(name="ic-close" fill="#FFFFFF")
      img(:src="uri")
</template>

<script>
import Icon from './Icon';
import ImageLoader from './ImageLoader';

export default {
  name: 'ImageModal',
  components: { ImageLoader, Icon },
  props: ['uri', 'closeBtnHandler'],
  methods: {
    openImage() {
      window.open(this.uri, '_blank');
    },
  },
};
</script>

<style lang="stylus">
.qcw-image-modal__overlay
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background rgba(0,0,0,.5)
  display flex
  justify-content center
  align-items center
  z-index 9999
.qcw-image-modal__wrapper
  box-shadow 0 3px 15px rgba(0,0,0,.7)
  position relative
  max-width 80%
  max-height 90%
  animation:fadeInZoom 0.2s ease-out
  img
    display block
    width auto
    height auto
    max-width 100%
    max-height 100%
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
