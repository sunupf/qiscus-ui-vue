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
    input(type="file", @change="uploadFile")
</template>

<script>
import Icon from './Icon';
import { scrollIntoLastElement } from '../lib/utils';

export default {
  name: 'FileDragDrop',
  components: { Icon },
  props: ['title', 'core'],
  data() {
    return {
      dragging: false,
    };
  },
  computed: {
    uploadedFiles() {
      if (!this.core.selected) return [];
      return this.core.uploadedFiles
        .filter(f => f.roomId === this.core.selected.id);
    },
  },
  methods: {
    uploadFile(e) {
      const vm = this;
      const files    = e.target.files || e.dataTransfer.files;
      const formData = new FormData();
      const roomId   = this.core.selected.id;

      this.dragging = false;

      // check allowed file type
      // ambil dulu extensi file nya sebelumnya.
      // console.log(files);
      let ext = files[0].name.split('.');
      ext = ext[ext.length - 1] || null;
      if (this.core.allowedFileTypes && this.core.allowedFileTypes.indexOf(ext) < 0) {
        return vm.$toasted.error('File uploading failed');
      }

      // all clear, let's upload
      formData.append('file', files[0]);
      formData.append('token', vm.core.userData.token);
      vm.core.addUploadedFile(files[0].name, roomId);
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (uploadEvent) => {
        this.updateProgress(uploadEvent, files[0].name);
      });
      xhr.open('POST', `${vm.core.baseURL}/api/v2/sdk/upload`, true);
      xhr.setRequestHeader('qiscus_sdk_app_id', `${vm.core.AppId}`);
      xhr.setRequestHeader('qiscus_sdk_user_id', `${vm.core.user_id}`);
      xhr.setRequestHeader('qiscus_sdk_token', `${vm.core.userData.token}`);
      xhr.onload = function responseReceived() {
        if (xhr.status === 200) {
          // file(s) uploaded), let's post to comment
          const url = JSON.parse(xhr.response).results.file.url;
          const attachmentPayload = {
            url,
            caption: '',
            file_name: files[0].name,
          };
          vm.core.sendComment(roomId, `[file] ${url} [/file]`, null,
          'file_attachment', JSON.stringify(attachmentPayload))
            .then(() => {
              vm.core.removeUploadedFile(files[0].name, roomId);
              e.target.value = null;
              window.setTimeout(() => scrollIntoLastElement(vm.core), 0);
            });
        } else {
          vm.$toasted.error('File uploading failed');
          vm.core.removeUploadedFile(files[0].name, roomId);
        }
      };
      xhr.send(formData);
      return true;
    },
    updateProgress(e, fileName) {
      if (e.lengthComputable) {
        const percentComplete = e.loaded / e.total;
        const fileObject = this.uploadedFiles
          .find(f => f.name === fileName);
        if (fileObject) fileObject.progress = Math.round(percentComplete * 100);
        // console.log('%s', fileObject.progress);
      } else {
        console.log('unkown');
      }
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