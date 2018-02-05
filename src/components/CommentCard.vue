<template lang="pug">
  div(class="comment__card--container")
    div(class="comment__card--image" :style="{'background-image': 'url('+data.image+')'}")
    strong(class="comment__card--title") {{ data.title }}
    div(class="comment__card--description") {{ data.description }}
    comment-buttons(:buttons="data.buttons" :postbackHandler="postbackSubmit")
</template>

<script>
import QiscusCore from '../lib/SDKCore';
import CommentButtons from './CommentButtons';

export default {
  name: 'QiscusCardComment',
  components: { CommentButtons },
  props: ['data'],
  methods: {
    postbackSubmit(button) {
      const topicId = QiscusCore.selected.id;
      const labelToSend = button.postback_text ? button.postback_text : button.label;
      QiscusCore.sendComment(topicId, labelToSend, null, 'button_postback_response', JSON.stringify(button.payload));
    },
  },
};
</script>