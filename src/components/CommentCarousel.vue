<template lang="pug">
  div(class="comment__carousel"
    @mouseover="stopRotation"
    @mouseout="startRotation")

    //- <!-- cards -->
    div.carousel-container
      div(class="qcw-carousel__item" v-for="(card, index) in cards")
          comment-card(:data="card" 
            :key="index")

    ul(class="qcw-carousel__nav")
      li(@click="pref")
        i
          icon(name="ic-chevron-left")
      li(@click="next")
        i
          icon(name="ic-chevron-right")

    //- <!-- bullets -->
    ul(class="carousel__bullets")
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
  mounted() {
    this.startRotation();
  },
  methods: {
    startRotation() {
      this.timer = setInterval(this.next, 10000);
    },
    stopRotation() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    next() {
      if (this.currentNumber !== this.cards.length - 1) {
        this.currentNumber += 1;
      } else {
        this.currentNumber = 0;
      }
    },
    pref() {
      if (this.currentNumber === 0) {
        this.currentNumber = 0;
      } else {
        this.currentNumber -= 1;
      }
    },
    gotoCard(index) {
      this.currentNumber = index;
    },
  },
};
</script>

<style lang="stylus">
@import '../assets/stylus/_variables.styl'
.qcw-comment-container.qcw-comment--carousel.comment--me
  justify-content flex-start
  margin-left 36px
.carousel-container
  display flex
.qcw-carousel__item:last-child
  .comment__card--container
    margin-right 0
.qcw-comment--carousel .comment__card--container
  margin-right 24px
  width 210px
  background-color white
  border-radius 0 0 8px 8px
  box-shadow 0 7px 16px rgba(199,199,199,0.25)
.qcw-comment .qcw-comment__message.carousel
  background-color transparent
  box-shadow none 
.comment__carousel 
  position relative
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

ul.qcw-carousel__nav li 
  position: absolute; 
  top: 50%; 
  transform: translateY(-50%);
  fill:$lightGrey;
  border-radius: 50%; 
  padding: 0 5px; 
  cursor: pointer
ul.qcw-carousel__nav li:nth-child(1)
  left: -42px;
ul.qcw-carousel__nav li:nth-child(2)
  right: -42px  
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