<template lang="pug">
  div(class="qcw-comment__attachment")
    audio(
      v-if="fileType == 'audio'"
      :src="comment.payload.url"
      width="100%"
      controls) Your browser does not support the audio element.
    video(
      controls
      v-if="fileType == 'video'"
      muted
      :src="comment.payload.url"
      width="100%") Sorry, your browser doesn't support embedded videos.
    image-loader(
      v-else
      :comment="comment"
      :message="comment.message"
      :on-click-image="onClickImage"
      :thumbnailMode="true"
      :callback="callback")

    comment-render(:text="comment.payload.caption" v-if="comment.payload.caption != ''")
</template>

<script>
import ImageLoader from './ImageLoader';
import CommentRender from './CommentRender';
import Icon from './Icon';

export default {
  name: 'FileAttachment',
  components: { ImageLoader, CommentRender, Icon },
  props: ['comment', 'onClickImage', 'callback'],
  data() {
    return {
      fileType: null,
    };
  },
  mounted() {
    this.fileType = this.checkfileType(this.comment.payload);
  },
  methods: {
    checkfileType(payload) {
      const splittedURL = payload.url.split('.');
      const ext = splittedURL[splittedURL.length - 1].toLowerCase();
      const imageExts = ['jpg', 'jpeg', 'gif', 'webp', 'png'];
      const videoExts = ['mov', 'mp4', 'webm'];
      const audioExts = ['mp3'];
      if (imageExts.includes(ext)) return 'image';
      if (videoExts.includes(ext)) return 'video';
      if (audioExts.includes(ext)) return 'audio';
      return 'ic-file-attachment';
    },
  },
};
</script>

<style lang="stylus">
.qcw-comment__attachment
  overflow hidden
  border-radius 4px
  video
    max-height 150px
</style>
