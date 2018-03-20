<template lang="pug">
  div(class="comment__carousel")
    //- <!-- cards -->
    i(@click='prev')
      icon(name="ic-chevron-left")
    div.carousel-container
      div(ref="carousel")
        div(class="qcw-carousel__item" v-for="(card, index) in cards")
            comment-card(:data="card" 
              :key="index")
    i(@click='next')
      icon(name="ic-chevron-right")


    //- <!-- bullets -->
    //- ul(class="carousel__bullets")
      li(v-for="(card, index) in cards"
          @click="gotoCard(index)"
          :class="{'active': index == currentNumber}") 
            div(class="ic-bullet")
</template>

<script>
import CommentCard from './CommentCard';
import Icon from './Icon';

export default {
  name: 'QiscusCommentCarousel',
  props: ['cards', 'mode'],
  components: { CommentCard, Icon },
  data() {
    return {
      cardLastIndex: this.cards.length - 1,
      slideTranslate: 272,
      currentIndex: 0,
      timer: null,
    };
  },
  methods: {
    next() {
      const transformStyle = this.$refs.carousel.style.transform;
      let currentPosition = parseInt(transformStyle.replace(/[^-\d.]/g, ''), 10);
      if (!currentPosition) {
        currentPosition = 0;
      }
      if (this.currentIndex + 1 <= this.cardLastIndex) {
        if (this.mode === 'widget') {
          this.$refs.carousel.style.transform = `translateX(${(currentPosition - this.slideTranslate)}px)`;
          this.currentIndex = this.currentIndex + 1;
        } else {
          console.log('Next');
        }
      }
    },
    prev() {
      const transformStyle = this.$refs.carousel.style.transform;
      let currentPosition = parseInt(transformStyle.replace(/[^-\d.]/g, ''), 10);
      if (!currentPosition) {
        currentPosition = 0;
      }
      if (this.currentIndex > 0) {
        if (this.mode === 'widget') {
          this.$refs.carousel.style.transform = `translateX(${(currentPosition + this.slideTranslate)}px)`;
          this.currentIndex = this.currentIndex - 1;
        } else {
          console.log('Previous');
        }
      }
    },
  },
};
</script>

<style lang="stylus">
@import '../assets/stylus/_variables.styl'
.qcw-comment-container.qcw-comment--carousel
  margin-bottom 24px
  padding 0
  &.comment--me
    justify-content flex-start
  .qcw-comment__message
    margin 0
    padding 0
    max-width none; 
    &:before
      display none
  .qcw-comment
    flex 1
    overflow-x: hidden
.comment__carousel 
  position relative
  overflow hidden
  display flex
  &:hover 
    i
      opacity 1
  i
    align-self: center
    cursor: pointer
    position absolute
    z-index 1
    opacity 0
    transition opacity 0.3s ease-out
    background $lightGrey
    &:first-child
      padding 0 8px 0 4px
      margin-right 8px
    &:last-child
      padding 0 4px 0 8px
      margin-left 8px
      right 0
.carousel-container
  display flex
  padding 24px 48px
  overflow-x hidden
  & > div
    display flex
    position relative
    transition all 0.3s ease-out
  .qcw-carousel__item
    margin-right 16px
    .comment__card--container
      margin-right 0px
      margin-left 0px
      width 256px
      background-color white
      border-radius 0 0 8px 8px
      box-shadow 0 7px 16px rgba(199,199,199,0.25)
      .comment__card--image
        margin-top 0
        width 256px
    &:last-child
      margin-right 0px
  // &::-webkit-scrollbar-track
  //   display none
  // &::-webkit-scrollbar
  //   display none
  // &::-webkit-scrollbar-thumb
  //   display none

.qcw-comment .qcw-comment__message.carousel
  background-color transparent
  box-shadow none 
.extra-margin
  margin-bottom 36px
ul.carousel__bullets
  position: absolute;
  width: 100%;
  bottom -36px
ul.carousel__bullets,
ul.qcw-carousel__nav 
  list-style: none; 
  overflow: hidden; 
  text-align: center;
ul.carousel__bullets li 
  display: inline-block; 
  cursor: pointer; 
  margin: 4px 8px; 
  color: #999; 
  vertical-align: middle;
ul.carousel__bullets li.active
  font-size: 24px; 
  font-weight: bold; 
  color: #3498db;  
.ic-bullet
  border: 2px solid $green;
  height: 8px;
  width: 8px;
  border-radius: 50%;
.active
  & > .ic-bullet
    background-color $green
    border: 2px solid $green;
</style>