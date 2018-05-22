<template lang="pug">
  div(class="qcw-attachment-form")
    span(class="qcw-attachment-form__close-btn" @click="closeFormHandler") &times;
    label
      div(class="qcw-attachment-form__btn") {{ label }}
      input(class="qcw-attachment-form__input" name="file_image" type="file" accept="image/*" @change="changeFile")
    img(class="qcw-attachment-form__preview-img" :src="thumbnail" v-if="thumbnail")
    div(class="qcw-attachment-form__action" v-if="thumbnail")
      input(class="qcw-attachment-form__caption-txt" placeholder="type your caption ..." v-model="caption")
      button(class="qcw-attachment-form__btn" @click="uploadFile") Upload
</template>

<script>
  export default {
    name: 'AttachmentForm',
    props: ['uploadHandler', 'closeFormHandler'],
    data() {
      return {
        thumbnail: '',
        label: 'pick a file',
        file: null,
        caption: '',
      };
    },
    methods: {
      changeFile(event) {
        const self = this;
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
          self.thumbnail = fileReader.result;
          self.label = 'change file';
          self.file = event;
        };
        fileReader.readAsDataURL(file);
      },
      uploadFile() {
        this.uploadHandler(this.file, this.caption);
      },
    },
  };
</script>

<style lang="stylus">
  .qcw-attachment-form
    padding 10px
    position absolute
    bottom 0
    left 0
    width 100%
    height 300px
    background #FFF
    display flex
    flex-direction column
    justify-content center
    align-content center
    box-shadow 0 -3px 7px rgba(0,0,0,.15)
    label + div
      cursor pointer
  .qcw-attachment-form__action
    display flex
    justify-content space-between
    margin-top 10px
  .qcw-attachment-form__caption-txt
    flex 1
    margin-right 10px
    border 0
    border-bottom 1px solid grey
  .qcw-attachment-form__btn
    border 2px solid gray
    color gray
    background-color white
    padding 8px 20px
    border-radius 8px
    font-size 20px
    font-weight bold
    flex 0 0 auto
    text-align center
  .qcw-attachment-form__input
    display none
  .qcw-attachment-form__preview-img
    width 150px
    height 150px
    margin 10px auto
  .qcw-attachment-form__close-btn
    position absolute
    top 10px
    right 10px
    cursor pointer
</style>
