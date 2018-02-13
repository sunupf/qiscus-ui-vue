<template lang="pug">
  div(class="comment__carousel"
    @mouseover="stopRotation"
    @mouseout="startRotation")

    //- <!-- cards -->
    div(class="qcw-carousel__item")
      transition-group(name="slide-y")
        comment-card(:data="cards[currentNumber]" 
          v-for="number in [currentNumber]"
          :key="currentNumber")

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
      this.timer = setInterval(this.next, 3000000);
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
.comment__carousel 
  position relative
.extra-margin
  margin-bottom 24px
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