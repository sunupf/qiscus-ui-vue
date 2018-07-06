<template lang="pug">
  div
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
      v-if="fileType == 'image'"
      :comment="comment"
      :message="comment.message"
      :on-click-image="onClickImage"
      :callback="callback")
    div(v-else class="qcw-file-container")
      a(:href="comment.payload.url" target="_blank")
        i
          icon(:name="fileClassName")
        div(class='file-meta')
          div(class="file-name") {{ filename }}

    comment-render(:text="comment.payload.caption" v-if="comment.payload.caption != ''")
</template>

<script>
import ImageLoader from './ImageLoader';
import CommentRender from './CommentRender';

export default {
  name: 'FileAttachment',
  components: { ImageLoader, CommentRender },
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
      const imageExts = ['jpg', 'jpeg', 'gif', 'webp','png'];
      const videoExts = ['mov', 'mp4', 'webm'];
      const audioExts = ['mp3'];
      if (imageExts.includes(ext)) return 'image';
      if (videoExts.includes(ext)) return 'video';
      if (audioExts.includes(ext)) return 'audio';
      return 'unavailable';
    },
  },
};
</script>
