<template lang="pug">
  .qcw-comment-form
    textarea(placeholder="Type here then press Enter to send"
      @keyup="publishTyping"
      @keydown.enter="trySubmitComment($event)"
      v-model="commentInput")
    i
      label
        input(class="uploader__input" name="file_all" type="file" @change="uploadFile")
        icon(name="ic-attachment")
    i
      label
        input(class="uploader__input" name="file_image" type="file" accept="image/*" @change="uploadFile")
        icon(name="ic-image")
    i(@click="trySubmitComment($event)")
      icon(name="ic-send")
</template>

<script>
import Icon from './Icon';

export default {
  name: 'CommentForm',
  components: { Icon },
  props: ['core', 'repliedComment', 'closeReplyHandler'],
  data() {
    return {
      commentInput: '',
    };
  },
  methods: {
    trySubmitComment(e) {
      if (!e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        let message = this.commentInput.trim();
        if (typeof emojione !== 'undefined') message = emojione.shortnameToUnicode(message);
        if (this.commentInput.trim().length < 1) return;
        // this.$store.dispatch('setNewCommentText', '');
        this.commentInput = '';
        this.submitComment(this.core.selected.id, message);
        // this.commentFormHandler();
        // this.showActions = false;
      }
    },
    submitComment(topicId, comment) {
      if (this.repliedComment === null) {
        this.core.submitComment(topicId, comment).then(() => {
          this.scrollToBottom();
        });
      } else {
        const payload = {
          text: comment,
          replied_comment_id: this.repliedComment.id,
          replied_comment_message: this.repliedComment.message,
          replied_comment_payload: null,
          replied_comment_sender_email: this.repliedComment.username_real,
          replied_comment_sender_username: this.repliedComment.username_as,
          replied_comment_type: this.repliedComment.type,
        };
        this.core.submitComment(topicId, comment, null, 'reply', JSON.stringify(payload))
          .then(() => {
            this.closeReplyHandler();
            this.scrollToBottom();
          });
      }
    },
    publishTyping() {
      // this.core.publishTyping();
    },
    uploadFile(e) {
      const vm = this;
      const files    = e.target.files || e.dataTransfer.files;
      const formData = new FormData();
      const roomId   = this.core.selected.id;
      formData.append('file', files[0]);
      formData.append('token', vm.core.userData.token);
      vm.core.addUploadedFile(files[0].name);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${vm.core.baseURL}/api/v2/sdk/upload`, true);
      xhr.onload = function responseReceived() {
        if (xhr.status === 200) {
          // file(s) uploaded), let's post to comment
          const url = JSON.parse(xhr.response).results.file.url;
          vm.core.submitComment(roomId, `[file] ${url} [/file]`)
            .then(() => {
              vm.core.removeUploadedFile(files[0].name, roomId);
              window.setTimeout(() => self.scrollToBottom(), 0);
            });
        } else {
          vm.$toasted.error('File uploading failed');
          vm.core.removeUploadedFile(files[0].name, roomId);
        }
      };
      xhr.send(formData);

      // reader.onload = (e) => { vm.uploadedFiles.push(e.target.result) };
      // reader.readAsDataURL(files[0]);
    },
    scrollToBottom() {
      const latestCommentId = this.core
        .selected.comments[this.core.selected.comments.length - 1].id;
      const element = document.getElementById(latestCommentId);
      if (element) {
        element.scrollIntoView({ block: 'end', behaviour: 'smooth' });
      }
    },
  },
};
</script>

<style lang="stylus">
  .qcw-comment-form
    display flex
    justify-content space-between
    padding 7px 20px
  
  .qcw-comment-form textarea
    border 0
    flex 1
    font-size 11px
    font-family sans-serif
    max-height 100%
    overflow-y auto
    resize none
  
  .qcw-comment-form i
    display inline-block
    text-align center
    cursor pointer
    flex 0 36px
    align-self center

    label
      cursor pointer

    input[type="file"]
      display none
</style>
