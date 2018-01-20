<template lang="pug">
  .qcw-container(:class="{'qcw-container--open': chatWindowStatus}")
    chat-window(:core="core" :toggleWindowStatus="toggleWindowStatus")
    qcw-trigger(:clickHandler="toggleWindowStatus")
</template>

<script>
import QiscusCore from './lib/SDKCore';
import QcwTrigger from './components/QcwTrigger';
import ChatWindow from './components/ChatWindow';
import { scrollIntoElement } from './lib/utils';

export default {
  name: 'app',
  components: {
    QcwTrigger,
    ChatWindow,
  },
  data() {
    return {
      core: QiscusCore,
      chatWindowStatus: false,
    };
  },
  created() {
    const self = this;
    self.core.UI = {
      colors: {},
      chatTarget(target) {
        self.core.chatTarget(target).then(() => {
          if (!self.chatWindowStatus) self.toggleWindowStatus();
          window.setTimeout(() => scrollIntoElement(self.core), 0);
        });
      },
    };
  },
  methods: {
    toggleWindowStatus() {
      this.chatWindowStatus = !this.chatWindowStatus;
    },
  },
};
</script>

<style lang="stylus">
.qcw-container 
  font-family 'Open Sans', sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #444
  position: fixed
  bottom: 20px
  right: 42px
  display flex
  flex-direction column
  align-items flex-end
.qcw-container *, .qcw-container *:after, .qcw-container *:before
  box-sizing border-box
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
