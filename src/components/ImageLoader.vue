<template>
  <div class="image-loader">
    <div class="loading-image-container" v-show="isLoading">
      <i class="">
        <icon name="ic-load"></icon>
      </i>
      <span class="label">Loading Image...</span>
    </div>
    <div class="qcw-image-container" v-show="isImage && !isLoading && error==''" @click="clickImageHandler">
      <img :src="imageSrc" :alt="imageSrc" ref="imageContainer" @error="imageFallback" @load="imageLoaded"/>
    </div>
    <div v-show="error">
      <p><i style="font-size: 2em; display: inline-block"><icon name="close"></icon></i> {{ error }}</p>
      <button @click="loadImage" class="reload-image-btn">Reload Image</button>
    </div>
    <div class="qcw-file-container" v-show="!isImage && !isLoading">
      <a :href="(!isReply) ? uri : 'javascript:void(0)'" target="_blank">
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
  // import { maintainScroll } from '../lib/utils';

  export default {
    name: 'ImageLoader',
    components: { Icon },
    props: ['comment', 'message', 'callback', 'onClickImage', 'thumbnailMode'],
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
      isReply() {
        return this.comment.type === 'reply';
      },
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
      imageFallback() {
        const comment = this.comment;
        const textMessage = (!this.isReply) ? this.message : comment.payload.replied_comment_message;
        const uri = this.getImageThumbnail(comment.getAttachmentURI(textMessage), 100, 100);
        this.imageSrc = uri;
      },
      getImageThumbnail(url, width, height) {
        const baseUrlSegment = url.split('//');
        const urlSegment = baseUrlSegment[1].split('/');
        if (urlSegment.length !== 6) return url;
        // take two last segment
        const imageRelativePath = `${urlSegment[4]}/${urlSegment[5]}`;
        const baseImagePath = url.substr(0, url.length - imageRelativePath.length);
        if (typeof width !== 'undefined' && typeof height !== 'undefined') {
          return `${baseImagePath}c_thumb,g_center,h_100,w_100/${imageRelativePath}`;
        }
        return `${baseImagePath}w_320,h_320,c_limit/${imageRelativePath}`;
      },
      clickImageHandler() {
        if (this.onClickImage) {
          return this.onClickImage(this.comment);
        }
        return false;
      },
      loadImage() {
        const self = this;
        const comment = self.comment;
        const textMessage = (!self.isReply) ? self.message : comment.payload.replied_comment_message;
        self.isLoading = true;
        self.$nextTick(() => {
          self.isImage = comment.isImageAttachment(textMessage);
          self.uri = (self.isImage && self.thumbnailMode)
                   ? self.getImageThumbnail(comment.getAttachmentURI(textMessage))
                   : comment.getAttachmentURI(textMessage);
          self.filename = self.uri.split('/').pop().split('#')[0].split('?')[0];
          self.ext = self.filename.split('.').pop();
          self.error = '';
          self.imageSrc = self.uri;
          if (!self.isImage) self.imageLoaded();
        });
      },
      imageLoaded() {
        this.isLoading = false;
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
    width 100%
    overflow hidden
    text-overflow ellipsis
    margin-top 12px
    word-break break-word
    a
      word-break break-all

  .loading-image-container
    min-width 194px
    height 194px !important
    display flex
    justify-content center
    flex-direction column

  .reply-wrapper--preview .qcw-image-container,
  .qcw-comment__message .qcw-image-container
    display flex
    align-items center
    justify-content center
    overflow hidden
    height 200px

  .qcw-image-container
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
        fill $mediumGrey
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
