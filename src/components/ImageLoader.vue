<template>
  <div class="image-loader">
    <div class="loading-image-container" v-if="isLoading">
      <i class="">
        <icon name="ic-load"></icon>
      </i>
      <span class="label">Loading Image...</span>
    </div>
    <div class="qcw-image-container" v-if="isImage && !isLoading && error==''" @click="clickImageHandler">
      <img :src="imageSrc" :alt="imageSrc" :onload="adjustScrollPosition" ref="imageContainer"/>
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
  import { maintainScroll } from '../lib/utils';

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
      adjustScrollPosition() {
        // console.log('position maintained');
        maintainScroll();
      },
      clickImageHandler() {
        if (this.onClickImage) {
          return this.onClickImage(this.comment);
        }
        return false;
      },
      loadImage() {
        const self    = this;
        const comment = this.comment;
        const xhr = new XMLHttpRequest();
        if (comment.type !== 'reply') {
          self.isImage  = comment.isImageAttachment(this.message);
          self.uri      = comment.getAttachmentURI(this.message);
        } else {
          self.isImage  = comment.isImageAttachment(comment.payload.replied_comment_message);
          self.uri      = comment.getAttachmentURI(comment.payload.replied_comment_message);
        }
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
            self.isLoading = false;
            self.imageSrc  = URL.createObjectURL(this.response);
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
  .reply-wrapper .image-loader
    margin-top 4px
    padding-bottom 4px
  .reply-wrapper .qcw-image-container
    margin 0
    width 100%
  .image-loader + .qcw-comment__content
    margin-top 12px

  .loading-image-container
    display flex
    flex-direction column
    justify-content center
    align-items center

  .reply-wrapper--preview .qcw-image-container,
  .qcw-comment__message .qcw-image-container
    display flex
    align-items center
    justify-content center
    overflow hidden
    min-height 120px
    max-height 120px

  .qcw-image-container
    width calc(100%+8px)
    margin -4px
    padding-bottom -4px
    border-radius 3px
    img
      height 100%
      width 100%
      display block
      object-fit: cover

  .reply-wrapper--preview .qcw-file-container
    margin 4px 0 0 0
    a
      justify-content flex-start

  .qcw-file-container
    background-color $darkWhite
    padding 4px 8px
    border-radius 4px
    margin -4px
    word-break break-word
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
        font-size 12px
      .file-description
        font-size 11px
        font-weight 200
        line-height 14px

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
