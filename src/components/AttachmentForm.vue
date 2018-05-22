<template lang="pug">
  div(class="qcw-attachment-form" :style="style")
    div(class="qcw-attachment-form__header")
      span Preview
      span(class="qcw-attachment-form__close-btn" @click="closeFormHandler") &times;
    label()
      div(class="qcw-attachment-form__picker-btn") {{ label }}
      input(class="qcw-attachment-form__input" name="file_image" type="file" accept="image/*" @change="changeFile")
    div(class="qcw-attachment-form__action")
      input(class="qcw-attachment-form__caption-txt" placeholder="add your caption ..." v-model="caption")
      i(@click="uploadFile")
        icon(name="ic-send-message" :fill="grey")
</template>

<script>
  import Icon from './Icon';

  export default {
    name: 'AttachmentForm',
    props: ['uploadHandler', 'closeFormHandler'],
    components: { Icon },
    data() {
      return {
        thumbnail: '',
        label: 'pick a file',
        file: null,
        caption: '',
      };
    },
    computed: {
      style() {
        return this.thumbnail
          ? `background: url(${this.thumbnail}) no-repeat center; background-size: cover`
          : 'background: #FFF';
      },
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
    position absolute
    top 70px
    left 0
    width 100%
    height calc(100% - 70px)
    background #FFF
    display flex
    flex-direction column
    justify-content space-between
    align-content center
    box-shadow 0 -3px 7px rgba(0,0,0,.15)
    z-index 999
    label + div
      cursor pointer
  .qcw-attachment-form__header
    display flex
    justify-content space-between
    background linear-gradient(97.59deg, rgba(50, 181, 157, 0.94) 0%, rgba(111, 207, 151, 0.94) 100%);
    padding 15px
    color #FFF
  .qcw-attachment-form__action
    display flex
    justify-content space-between
    margin-top 10px
    padding 20px
    background #FFF
    color #666
  .qcw-attachment-form__caption-txt
    flex 1
    margin-right 10px
    border 0
    outline none
    font-size 15px
  .qcw-attachment-form__picker-btn
    border 2px solid gray
    color gray
    background-color white
    padding 8px 20px
    border-radius 8px
    font-size 20px
    font-weight bold
    flex 0 0 auto
    max-width 170px
    text-align center
    margin 0 auto
  .qcw-attachment-form__input
    display none
  .qcw-attachment-form__preview-img
    width 150px
    height 150px
    margin 10px auto
  .qcw-attachment-form__close-btn
    cursor pointer
</style>
