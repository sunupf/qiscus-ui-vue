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
  props: ['cards'],
  components: { CommentCard, Icon },
  data() {
    return {
      currentNumber: 0,
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
      console.log(currentPosition);
      this.$refs.carousel.style.transform = `translateX(${(currentPosition - 170)}px)`;
    },
    prev() {
      const transformStyle = this.$refs.carousel.style.transform;
      let currentPosition = parseInt(transformStyle.replace(/[^-\d.]/g, ''), 10);
      if (!currentPosition) {
        currentPosition = 0;
      }
      console.log(currentPosition);
      this.$refs.carousel.style.transform = `translateX(${(currentPosition + 170)}px)`;
    },
    gotoCard(index) {
      this.currentNumber = index;
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
    &:first-child
      margin-left 8px
      margin-right 16px
    &:last-child
      margin-left 16px
      margin-right 8px
      right 0
.carousel-container
  display flex
  padding 8px
  overflow-x scroll
  & > div
    display flex
    position relative
    transition all 0.3s ease-out
  &::-webkit-scrollbar-track
    display none
  &::-webkit-scrollbar
    display none
  &::-webkit-scrollbar-thumb
    display none

.qcw-carousel__item
  &:first-child
    .comment__card--container
      margin-left 8px
  &:last-child
    .comment__card--container
      margin-right 16px

  
.qcw-comment--carousel .comment__card--container
  margin-right 24px
  width 210px
  background-color white
  border-radius 0 0 8px 8px
  box-shadow 0 7px 16px rgba(199,199,199,0.25)
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