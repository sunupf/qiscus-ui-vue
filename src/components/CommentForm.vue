<template lang="pug">
  .qcw-comment-form
    //- i(@click="toggleEmojiPicker" class="qcw-emoji-btn" v-if="emojione")
      icon(name="ic-smiley" v-if="!toggleEmoji")
      icon(name="ic-close" v-if="toggleEmoji")
    
    i(class='qcw-icon')
      label
        input(class="uploader__input" name="file_all" type="file" @change="uploadFile")
        icon(name="ic-file-attachment")
    i(class='qcw-icon')
      label
        input(class="uploader__input" name="file_image" type="file" accept="image/*" @change="uploadFile")
        icon(name="ic-image-attachment")

    textarea(placeholder="Type your message" autofocus='autofocus'
      @keyup="isTyping"
      @keydown.enter="trySubmitComment($event)"
      v-model="commentInput")
    i(@click="trySubmitComment($event)")
      icon(name="ic-send-message" :fill="sendBtnStatus")
</template>

<script>
import { scrollIntoElement } from '../lib/utils';
import Icon from './Icon';

export default {
  name: 'CommentForm',
  components: { Icon },
  props: ['core', 'repliedComment', 'closeReplyHandler'],
  data() {
    return {
      commentInput: '',
      excludedEmoji: ['flags', 'objects', 'recent'],
      emojiSize: 16,
      sheetSize: 16,
      toggleEmoji: false,
      emojione,
    };
  },
  computed: {
    sendBtnStatus() { return (this.commentInput.length > 0 ? '#94ca62' : null); },
  },
  methods: {
    // toggleEmojiPicker() {
    //   this.toggleEmoji = !this.toggleEmoji;
    // },
    // addEmoji(emoji) {
    //   this.commentInput = this.commentInput + emoji.native;
    // },
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
        // this.setButtonColor('#979797');
      }
    },
    submitComment(topicId, comment) {
      if (this.repliedComment === null) {
        this.core.submitComment(topicId, comment).then(() => {
          scrollIntoElement(this.core);
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
            scrollIntoElement(this.core);
          });
      }
    },
    isTyping() {
      this.enableSend();
      this.publishTyping();
    },
    publishTyping() {
      this.core.realtimeAdapter.publishTyping(1);
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
              window.setTimeout(() => scrollIntoElement(vm.core), 0);
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
  },
};
</script>

<style lang="stylus">
  @import '../assets/stylus/_variables.styl'
  .qcw-comment-form
    display flex
    justify-content space-between
    padding 18px 8px
    position relative

  .qcw-comment-form textarea
    border 0
    flex 1
    font-size 15px
    font-family "Open Sans", sans-serif
    max-height 100%
    overflow-y auto
    resize none
    margin-left 8px
    &:focus
      border 0
      outline none

  .qcw-comment-form i
    display inline-block
    text-align center
    cursor pointer
    flex 0 20px
    padding 0 8px
    align-self center

    label
      cursor pointer

    input[type="file"]
      display none

    &.qcw-icon:hover svg.qc-icon
      fill $green
</style>
