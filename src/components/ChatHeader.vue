<template lang="pug">
div.qcw-header(:style="headerStyle")
  div.qcw-header-avatar
    img(:src="avatar")
  div.qcw-header-info(@click="$emit('header-click')")
    div
      div.qcw-user-display-name(:style="displayNameStyle") {{ displayName }}
      div.qcw-user-status.qcw-user-status--group(v-if="isGroup && !showTypingStatus" :style="userStatusStyle") {{ participants }}
      div.qcw-user-status.status--istyping(v-if="showTypingStatus" :style="typingStatusStyle") {{ typingStatus }}
      div.qcw-user-status.participant-count(v-if="isChannel") {{ participantsCount }} participants
      div.qcw-user-status(
        v-if="!showTypingStatus && !isGroup"
        :class="{'status--online': isOnline, 'status--lastseen': !isOnline}"
        :style="onlineStatusStyle") {{ userStatus }}
  i.qcw-window-toggle-btn(@click.prevent="$emit('toggle-window')")
    icon(name="ic-minimize" :fill="headerIconColor")

</template>

<script>
import Icon from './Icon';

export default {
  name: 'ChatHeader',
  components: { Icon },
  data() {
    return {
      typingStatusId: -1,
    };
  },
  mounted() {
    window.$comp = this;
  },
  computed: {
    isChannel() {
      return this.$core.selected.isChannel;
    },
    avatar() {
      const isSelected = this.$core.selected != null;
      const isAvatarEmpty = this.$core.selected.avatar === '';
      if (isSelected && !isAvatarEmpty) { return this.$core.selected.avatar; }
      return 'https://qiscuss3.s3.amazonaws.com/uploads/55c0c6ee486be6b686d52e5b9bbedbbf/2.png';
    },
    displayName() {
      return this.$core.selected.name;
    },
    showTypingStatus() {
      if (this.$core.isTypingStatus) {
        if (this.typingStatusId !== -1) {
          window.clearTimeout(this.typingStatusId);
          this.typingStatusId = -1;
        }
        this.typingStatusId = window.setTimeout(() => {
          this.$core.isTypingStatus = '';
        }, 3000);
        return true;
      }
      return false;
    },
    isGroup() { return this.$core.selected.room_type === 'group'; },
    participantsCount() {
      return this.$core.selected.participantNumber;
    },
    participants() {
      const limit = 3;
      const overflowCount = this.$core.selected.participants.length - limit;
      const participants = this.$core.selected.participants
        .slice(0, limit)
        .map(item => item.username.split(' ')[0]);
      if (this.$core.selected.participants.length <= limit) return participants.join(', ');
      return participants.concat(`and ${overflowCount} others.`)
        .join(', ');
    },
    typingStatus() { return this.$core.isTypingStatus; },
    userStatus() { return this.$core.chatmateStatus; },
    isOnline() { return this.userStatus === 'Online'; },
    headerStyle() {
      return { background: this.$core.UI.colors.headerBackgroundColor };
    },
    displayNameStyle() {
      return { color: this.$core.UI.colors.headerTitleColor };
    },
    reactiveColor() {
      if (this.$core.isTypingStatus) {
        return this.$core.UI.colors.statusTypingColor;
      } else if (this.isOnline && !this.isGroup) {
        return this.$core.UI.colors.statusOnlineColor;
      }
      return this.$core.UI.colors.statusOfflineColor;
    },
    userStatusStyle() {
      return { color: this.reactiveColor };
    },
    typingStatusStyle() {
      return { color: this.reactiveColor };
    },
    onlineStatusStyle() {
      return { color: this.reactiveColor };
    },
    headerIconColor() {
      return this.$core.UI.colors.headerIconColor;
    },
  },
};
</script>
