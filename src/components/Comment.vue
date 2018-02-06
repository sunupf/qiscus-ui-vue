<template lang="pug">
  div
    div(class="qcw-comment-container" :id="comment.id" :class="commentClass")
      div(class="qcw-comment-date" v-if="showDate") 
        div {{ dateToday }}
      div(v-if="comment.type == 'system_event'" class="qcw-comment--system-event")
        comment-custom(v-if="core.customTemplate && haveTemplate(comment)" :data="comment")
        div(v-else) {{ comment.message }}
      div(
        class="qcw-comment"
        v-if="comment.type != 'system_event'"
        :class="{ 'comment--me': comment.username_real == userData.email, 'comment--parent': isParent, 'comment--mid': isMid, 'comment--last': isLast }"
      )
        avatar(:src="comment.avatar" :class="{'qcw-avatar--hide': !isParent}")
        div(class="qcw-comment__message")
          //- div(class="qcw-comment__info" v-if="isParent")
            //- span(class="qcw-comment__username") {{comment.username_as}}
            //- span(class="qcw-comment__time") {{comment.time}}

          //- Comment Time
          span(class="qcw-comment__time" :class="{'qcw-comment__time--me': isMe}") {{comment.time}}

          //- reply button
          i(@click="replyHandler(comment)" class="reply-btn" :class="{'reply-btn--me': isMe}")
            icon(name="ic-reply")
          
          //- CommentType: "contact_person"
          div(v-if="comment.type == 'contact_person'" class="qcw-comment--contact")
            i
              icon(name="ic-user")
              strong {{ comment.payload.name }}
              br
            i
              icon(:name="(comment.payload.type=='phone') ? 'ic-phone' : 'ic-envelope'")
              span {{ comment.payload.value }}

          //- CommentType: "location"
          static-map(:lat="comment.payload.latitude"
            :lng="comment.payload.longitude"
            :name="comment.payload.name"
            :message="comment.message"
            :mapurl="comment.payload.map_url"
            v-if="comment.type == 'location'")

          //- CommentType: "file_attachment"
          file-attachment(v-if="comment.type == 'file_attachment'"
            :comment="comment"
            :on-click-image="onClickImage"
            :callback="onupdate")
          
          //- CommentType: "CAROUSEL"
          comment-carousel(:cards="comment.payload.cards" v-if="comment.type === 'carousel'")

          //- CommentType: "CUSTOM"
          comment-custom(v-if="comment.type === 'custom'" :data="comment")

          //- CommentType: "BUTTON"
          div(v-if="comment.type == 'buttons'" class="button-message")
            div(class="qcw-comment__content" v-html="comment.payload.text || message")
            comment-buttons(:buttons="comment.payload.buttons" :postbackHandler="postbackSubmit")

          //- CommentType: "CARD"
          comment-card(:data="comment.payload" v-if="comment.type==='card'")
          
          //- CommentType: "TEXT"
          div(class="comment-text" v-if="comment.type == 'text' || comment.type == 'reply'")
            image-loader(v-if="comment.isAttachment(comment.message) && comment.type != 'reply'"
              :comment="comment"
              :message="comment.message"
              :on-click-image="onClickImage"
              :callback="onupdate")

            comment-reply(v-if="comment.type =='reply'"
              :comment="comment"
              :isMe="isMe"
              :clickHandler="gotoComment"
              :onClickImage="onClickImage"
              :callback="onupdate")
            
            comment-render(:text="comment.message" v-if="!comment.isAttachment(comment.message) && comment.type=='text'")
          
          //- span(class="qcw-comment__time qcw-comment__time--children"
            v-if="!isParent"
            :class="{'qcw-comment__time--attachment': comment.isAttachment(comment.message)}") {{comment.time}}

          div(v-if="isMe")
            i(class="qcw-comment__state qcw-comment__state--sending" v-if="comment.isPending")
              icon(name="ic-load" class="icon--load")
            i(class="qcw-comment__state" v-if="comment.isSent && !comment.isDelivered")
              icon(name="ic-check")
            div(@click="resend(comment)" class="qcw-comment__state qcw-comment__state--failed" v-if="comment.isFailed") !!!
            div(class="qcw-comment__state qcw-comment__state--delivered" v-if="comment.isDelivered && !comment.isRead")
              icon(name="ic-double-check")
            div(class="qcw-comment__state qcw-comment__state--read" v-if="comment.isRead")
              icon(name="ic-double-check")

    //-       <!-- CommentType: "ACCOUNT_LINKING" -->
    //-       <div v-if="comment.type == 'account_linking'">
    //-         <comment-render :text="comment.payload.text || message"></comment-render>
    //-         <div class="action_buttons">
    //-           <button @click="openAccountBox">{{ comment.payload.params.button_text }} &rang;</button>
    //-         </div>
    //-       </div>
    //-     </div>
    div(class="failed-info" v-if="comment.isFailed" :class="{ 'failed--last': isLast }") Message failed to send. 
            span(@click="resend(comment)" class="" v-if="comment.isFailed") Resend
</template>

<script>
import QiscusCore from '../lib/SDKCore';
import Avatar from './Avatar';
import Icon from './Icon';
import StaticMap from './StaticMap';
import ImageLoader from './ImageLoader';
import CommentRender from './CommentRender';
import CommentReply from './CommentReply';
import CommentCustom from './CommentCustom';
import CommentCarousel from './CommentCarousel';
import CommentCard from './CommentCard';
import CommentButtons from './CommentButtons';

export default {
  name: 'Comment',
  components: {
    Avatar,
    Icon,
    StaticMap,
    ImageLoader,
    CommentRender,
    CommentReply,
    CommentCustom,
    CommentCarousel,
    CommentCard,
    CommentButtons,
  },
  props: ['comment', 'commentBefore', 'commentAfter', 'userData', 'onClickImage', 'onupdate', 'replyHandler', 'showAvatar'],
  computed: {
    showDate() {
      return this.commentBefore === null || (this.commentBefore.date !== this.comment.date);
    },
    isParent() {
      return this.commentBefore === null ||
        this.commentBefore.username_real !== this.comment.username_real;
    },
    isMid() {
      return this.commentAfter !== null && !this.isParent &&
        this.commentAfter.username_real === this.comment.username_real;
    },
    isLast() {
      return this.commentAfter === null ||
        this.commentAfter.username_real !== this.comment.username_real;
    },
    isMe() { return this.comment.username_real === this.userData.email; },
  },
  data() {
    return {
      dateToday: new Date(this.comment.date).toLocaleString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      }),
      commentClass: {
        [`qcw-comment--${this.comment.type} comment--me`]: this.comment.username_real === this.userData.email,
        [`qcw-comment--${this.comment.type}`]: !this.comment.username_real === this.userData.email,
      },
      core: QiscusCore,
    };
  },
  methods: {
    gotoComment() {
      const element = document.getElementById(this.comment.payload.replied_comment_id);
      if (!element) return;
      element.scrollIntoView({ block: 'end',  behaviour: 'smooth' });
    },
    haveTemplate(comment) {
      if (!this.core.customTemplate) return false;
      return this.core.templateFunction(comment);
    },
  },
};
</script>

<style lang="stylus">
  @import '../assets/stylus/_variables.styl'

  #ic-load,
  #ic-check,
  #ic-double-check
    fill $green
    margin-right 8px
</style>
