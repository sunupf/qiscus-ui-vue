<template lang="pug">
  div
    div(class="reply-wrapper" :class="{'reply-wrapper--me': isMe }" @click="clickHandler")
      div(class="reply-sender") {{ comment.payload.replied_comment_sender_username }}
      image-loader(v-if="comment.isAttachment(comment.payload.replied_comment_message)"
        :comment="comment"
        :message="comment.payload.replied_comment_message"
        :on-click-image="onClickImage"
        :callback="callback")
      
      comment-render(v-if="!comment.isAttachment(comment.payload.replied_comment_message)" 
        :text="comment.payload.replied_comment_message")
    
    image-loader(v-if="comment.isAttachment(comment.payload.text)"
      :comment="comment"
      :message="comment.payload.text"
      :on-click-image="onClickImage"
      :callback="callback")
    
    comment-render(v-if="!comment.isAttachment(comment.payload.text)"
      :text="comment.payload.text")
</template>

<script>
import ImageLoader from './ImageLoader';
import CommentRender from './CommentRender';

export default {
  name: 'CommentReply',
  components: { ImageLoader, CommentRender },
  props: ['comment', 'isMe', 'clickHandler', 'onClickImage', 'callback'],
};
</script>
