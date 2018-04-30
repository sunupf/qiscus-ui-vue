<template lang="pug">
  .qcw-dropzone-area(
      :class="{ 'qcw-dropzone-over': dragging }",
      drag-over="handleDragOver",
      @dragenter="onDragging(true)",
      @dragleave="onDragging(false)"
    )
    .qcw-dropzone-text
      span.qcw-dropzone-title {{ title || 'Drag and Drop file here for upload...' }}
    |
    input(type="file", @change="changeFile")
</template>

<script>
import Icon from './Icon';
import { uploadFile } from '../lib/fileUploader';

export default {
  name: 'FileDragDrop',
  components: { Icon },
  props: ['title', 'core', 'dragging'],
  methods: {
    changeFile(e) {
      uploadFile(e, this.core);
      this.onDragging(false);
    },
    onDragging(status) {
      this.$emit('onDragging', status);
    },
  },
};
</script>

<style lang="stylus">
@import '../assets/stylus/_variables.styl'
$width = 350px; 
$height = $width;
$fontSizeTitle = 16px;
$fontColorTitle = $darkGrey;
$bgContent = $darkerWhite;

.qcw-dropzone-area
  display flex
  justify-content center
  align-items center
  width $width
  height 100%
  position absolute
  overflow hidden
  background transparent
  opacity 0
  &.qcw-dropzone-over
    background $bgContent
    opacity 1
    z-index 3
    position fixed
    height $height
    .qcw-dropzone-text
      position fixed
  input
    position absolute
    cursor pointer
    top 0px
    right 0
    bottom 0
    left 0
    width 100%
    height 100%
    opacity 0

.qcw-dropzone-text
  position absolute
  top 60%
  text-align center
  transform translate(0, -50%)
  width $width
  height $height
  display flex
  justify-content center
  align-items center
  span
    display block
    font-family Arial, Helvetica
    line-height 1.9
    
.qcw-dropzone-title
  font-size $fontSizeTitle
  color $fontColorTitle
  letter-spacing 0.4px

.qcw-container.qcw-container--wide
  .qcw-dropzone-area
    width 100%
    opacity 0
    &.qcw-dropzone-over
      background $bgContent
      opacity 1
      height calc(100% - 135px)
      position fixed

  .qcw-dropzone-text
    top 50%
</style>