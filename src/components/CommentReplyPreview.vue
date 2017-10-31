<template lang="pug">
  div(class="reply-wrapper reply-wrapper--preview")
    div(class="reply-sender") {{ comment.username_as }}
    i(@click="closeReplyHandler" class="reply-close-btn")
      icon(name="ic-close")
    image-loader(v-if="comment.isAttachment(comment.message)"
      :comment="comment"
      :message="comment.message"
      :on-click-image="void(0)"
      :callback="void(0)")
    
    comment-render(v-if="!comment.isAttachment(comment.message)" 
      :text="comment.message")
</template>

<script>
import ImageLoader from './ImageLoader';
import Icon from './Icon';
import CommentRender from './CommentRender';

export default {
  name: 'CommentReplyPreview',
  components: { ImageLoader, CommentRender, Icon },
  props: ['comment', 'closeReplyHandler'],
};
</script>
