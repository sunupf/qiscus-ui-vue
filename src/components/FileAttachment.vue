<template lang="pug">
  div
    image-loader(
      :comment="comment"
      :message="comment.message"
      :on-click-image="onClickImage"
      :callback="callback")
    comment-render(:text="comment.payload.caption" v-if="comment.payload.caption != ''")
</template>

<script>
import ImageLoader from './ImageLoader';
import CommentRender from './CommentRender';

export default {
  name: 'FileAttachment',
  components: { ImageLoader, CommentRender },
  props: ['comment', 'onClickImage', 'callback'],
};
</script>
