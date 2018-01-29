<template>
  <div>
    <div class="loading-image-container" v-if="isLoading"> 
      <i class="">
        <icon name="ic-load"></icon>
      </i>
      Loading Image...
    </div>
    <div class="qcw-image-container" v-if="isImage && !isLoading && error==''" @click="onClickImage(comment)">
      <img :src="imageSrc" :alt="imageSrc" />
    </div>
    <div v-if="error">
      <p><i style="font-size: 2em; display: inline-block"><icon name="close"></icon></i> {{ error }}</p>
      <button @click="loadImage" class="reload-image-btn">Reload Image</button>
    </div>
    <div class="qcw-file-container" v-if="!isImage && !isLoading">
      <a :href="uri" target="_blank">
        <i><icon :name="fileClassName"></icon></i>
        <div class="file-name">{{ filename }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon';

  export default {
    name: 'ImageLoader',
    components: { Icon },
    props: ['comment', 'message', 'callback', 'onClickImage'],
    data() {
      return {
        isLoading: true,
        isImage: false,
        imageSrc: '',
        uri: this.comment.getAttachmentURI(this.message),
        filename: '',
        ext: '',
        error: '',
      };
    },
    computed: {
      fileClassName() {
        const ext = this.ext.toLowerCase();
        // const videos = ['mov','mp4','avi','mkv'];
        const images = ['jpg', 'jpeg', 'gif', 'webp', 'png'];
        // const archives = ['tar', 'zip', 'rar', 'iso'];
        if (images.indexOf(ext) > -1) return 'ic-image';
        return 'ic-docs-attachment-render-buble';
      },
    },
    created() {
      this.loadImage();
    },
    destroyed() {
      URL.revokeObjectURL(this.imageSrc);
    },
    methods: {
      loadImage() {
        const self    = this;
        const comment = this.comment;
        const xhr = new XMLHttpRequest();
        self.isImage  = comment.isImageAttachment(this.message);
        self.uri      = comment.getAttachmentURI(this.message);
        self.filename = self.uri.split('/').pop().split('#')[0].split('?')[0];
        self.ext      = self.filename.split('.').pop();
        self.isLoading = true;
        self.error   = '';

        if (!self.isImage) {
          self.isLoading = false;
          return false;
        }

        xhr.onreadystatechange = function attachImage() {
          if (this.readyState === 4 && this.status === 200) {
            self.imageSrc  = URL.createObjectURL(this.response);
            self.isLoading = false;
            // setTimeout( () => self.callback(), 0 );
          }
        };
        xhr.open('GET', self.uri, true);
        xhr.onerror = function throwLoadingError() {
          self.isLoading = false;
          self.error = `Url ${self.uri} loading failed, please try again`;
          self.callback();
        };
        // xhr.setRequestHeader('Authorization', 'Token token='+window.doctortoken);
        xhr.responseType = 'blob';
        xhr.send();
        return true;
      },
    },
  };
</script>

<style lang="stylus">
  @import '../assets/stylus/_variables.styl'
  .loading-image-container
    width 100%
    height auto
    background-color $lightGrey
    padding 8px
    border-radius 2px
    i
      display block 
      width 20px
      height 20px
      margin 0px auto 8px auto
      svg
        animation spin 1s ease-in-out infinite
  .qcw-image-container 
    width calc(100%+8px)
    margin -4px
    padding-bottom -4px
    img
      zoom 2
      display: block;

      height: auto;
      max-height: 100%;

      width: auto;
      max-width: 100%;
      border-radius 2px
  .qcw-file-container
    i
      display inline-block
      width 36px
      flex 0 36px
    div.file-name
      display inline-block
      width 150px
  .reload-image-btn {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 7px 15px;
    text-align: center;
    cursor: pointer;
    background: #eee;
    color: #FFF;
    border: 2px solid #FFF;
    font-weight: bold;
    border-radius: 5px;
    color: #444;
  }
</style>