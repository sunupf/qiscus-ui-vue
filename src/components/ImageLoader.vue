<template>
  <div class="image-loader">
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
        <div class='file-meta'>
          <div class="file-name">{{ filename }}</div>
          <!-- <div class="file-ext">{{ ext }}</div> -->
        </div>
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
        return 'ic-file-attachment';
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
    background-color $darkWhite
    padding 8px
    border-radius 2px
    text-align center
    i
      display block 
      margin 0px auto 8px auto
      svg
        animation spin 1s ease-in-out infinite
  .reply-wrapper .image-loader
    margin-top 4px
    padding-bottom 4px
  .reply-wrapper .qcw-image-container
    margin 0
    width 100%

  .reply-wrapper--preview .qcw-image-container, 
  .qcw-comment__message .qcw-image-container 
    display flex
    align-items center
    justify-content center
    overflow hidden
    max-height 120px

  .qcw-image-container 
    width calc(100%+8px)
    margin -4px
    padding-bottom -4px
    border-radius 3px
    img
      zoom 2
      display: block;

      height: auto;
      max-height: 100%;

      width: auto;
      max-width: 100%;

  .reply-wrapper--preview .qcw-file-container 
    margin 4px 0 0 0
    a
      justify-content flex-start

  .qcw-file-container
    background-color $darkWhite
    padding 4px 8px
    border-radius 2px
    margin -4px
    a
      color $darkGrey
      text-decoration none
      display flex
      align-items top
      justify-content center
    i
      margin-top 4px
      display inline-block
      margin-right 8px
      svg
        margin 0
        fill $mediumGreyGrey
        width 36px
        height 36px
    .file-meta
      font-size 13px
      overflow ellipsis
      .file-name
        font-weight 600
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