<template lang="pug">
  .qcw-dropzone-area(
      :class="{ 'qcw-dropzone-over': dragging }",
      drag-over="handleDragOver",
      @dragenter="dragging=true",
      @dragleave="dragging=false"
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
  props: ['title', 'core'],
  data() {
    return {
      dragging: false,
    };
  },
  methods: {
    changeFile(e) {
      this.dragging = false;
      uploadFile(e, this.core);
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
  width $width
  height 100%
  position absolute
  z-index 1
  overflow hidden
  background transparent
  opacity 0
  &.qcw-dropzone-over
    background $bgContent
    opacity 1
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
  position fixed
  top 60%
  text-align center
  transform translate(0, -50%)
  width $width
  height $height
  display flex
  justify-content center
  align-items center
  span
    display: block
    font-family: Arial, Helvetica
    line-height: 1.9
    
.qcw-dropzone-title
  font-size: $fontSizeTitle
  color: $fontColorTitle
  letter-spacing: 0.4px
</style>