<template lang="pug">
  .qcw-container(:class="{'qcw-container--open': chatWindowStatus}")
    chat-window(v-if="core.isInit" :core="core" :toggleWindowStatus="toggleWindowStatus")
    div(v-if="!core.isInit" class="qcw-connecting-indicator") Connecting to chat server ...
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
    const colors = {
      white: '#ffffff',
      darkWhite: '#fafafa',
      lightGrey: '#e8e8e8',
      mediumGrey: '#979797',
      darkGrey: '#666666',
      green: '#94ca62',
      blue: '34b6ff',
      red: '#ff2424',
    };

    const config = {
      widgetButtonBackgroundColor: colors.green,

      headerBackgroundColor: colors.white,
      headerTitleColor: colors.darkGrey,
      headerIconColor: colors.mediumGrey,

      formMessageIconColor: colors.mediumGrey,
      formMessageIconHoverColor: colors.green,
      formMessagePlaceholderColor: colors.mediumGrey,
      formMessageTextColor: colors.darkGrey,

      statusOnlineColor: colors.green,
      statusOfflineColor: colors.mediumGrey,
      statusTypingColor: colors.blue,

      bubleLeftColor: colors.lightGrey,
      bubleLeftTextColor: colors.darkGrey,
      bubleRightColor: colors.white,
      bubleTextColor: colors.darkGrey,

      messageTimeColor: colors.mediumGrey,
      messageStatusIconColor: colors.green,
      messageFailedIconColor: colors.red,
    };
    self.core.UI = {
      useCustomColors: false,
      colors: config,
      chatTarget(target) {
        self.core.chatTarget(target).then(() => {
          if (!self.chatWindowStatus) self.toggleWindowStatus();
          window.setTimeout(() => scrollIntoElement(self.core), 0);
        });
      },
      chatGroup(id) {
        self.core.chatGroup(id).then(() => {
          if (!self.chatWindowStatus) self.toggleWindowStatus();
          window.setTimeout(() => scrollIntoElement(self.core), 0);
        });
      },
      setCustomColors(customColors) {
        self.core.UI.useCustomColors = true;
        self.core.UI.colors = Object.assign({}, self.core.UI.colors, customColors);
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
.qcw-connecting-indicator
  background #FFF
  padding 20px
  border-radius 20px
.qcw-container *, .qcw-container *:after, .qcw-container *:before
  box-sizing border-box
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInLeftBig {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
