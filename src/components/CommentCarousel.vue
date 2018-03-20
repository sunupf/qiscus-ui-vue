<template lang="pug">
  div(class="comment__carousel")
    //- <!-- cards -->
    i(@click='prev')
      icon(name="ic-chevron-left")
    div.carousel-container(ref="carouselContainer")
      div(ref="carousel")
        div(class="qcw-carousel__item" ref="carouselItem" v-for="(card, index) in cards")
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
      slideTranslate: 0,
      currentIndex: 0,
      timer: null,
    };
  },
  methods: {
    cardLength() {
      return this.$refs.carouselItem[0].offsetWidth
        + parseInt(window.getComputedStyle(this.$refs.carouselItem[0])
        .marginLeft, 10) + parseInt(window.getComputedStyle(this.$refs.carouselItem[0])
        .marginRight, 10);
    },
    next() {
      const transformStyle = this.$refs.carousel.style.transform;
      let currentPosition = parseInt(transformStyle.replace(/[^-\d.]/g, ''), 10);
      if (!currentPosition) {
        currentPosition = 0;
      }

      this.slideTranslate = this.cardLength();

      const containerWidth = this.$refs.carouselContainer.offsetWidth;
      const paddingLeftContainer  = parseInt(window.getComputedStyle(this.$refs.carouselContainer)
        .paddingLeft, 10);
      const paddingRightContainer  = parseInt(window.getComputedStyle(this.$refs.carouselContainer)
        .paddingRight, 10);
      const paddingContainer =  paddingLeftContainer + paddingRightContainer;
      const innerContainer = containerWidth - paddingContainer;

      const carouselWidth = this.$refs.carousel.offsetWidth;
      const cardsInViewPort = Math.floor(innerContainer / this.slideTranslate);
      const carouselMod = carouselWidth % innerContainer;

      this.cardLastIndex = Math.floor(carouselWidth / innerContainer);

      if (this.currentIndex + 1 <= this.cardLastIndex) {
        if ((this.currentIndex + 1 === this.cardLastIndex && carouselMod === 0)
          || (this.cardLastIndex === 1)) {
          this.$refs.carousel.style.transform = `translateX(${(currentPosition - (carouselMod))}px)`;
        } else if (this.currentIndex + 1 === this.cardLastIndex && carouselMod !== 0) {
          this.$refs.carousel.style.transform = `translateX(${(currentPosition - (carouselMod + paddingLeftContainer))}px)`;
        } else {
          this.$refs.carousel.style.transform = `translateX(${currentPosition - (cardsInViewPort * this.slideTranslate)}px)`;
        }
        this.currentIndex = this.currentIndex + 1;
      }
    },
    prev() {
      // const transformStyle = this.$refs.carousel.style.transform;
      // let currentPosition = parseInt(transformStyle.replace(/[^-\d.]/g, ''), 10);
      // if (!currentPosition) {
      //   currentPosition = 0;
      // }

      // this.slideTranslate = this.cardLength();

      // const containerWidth = this.$refs.carouselContainer.offsetWidth;
      // const paddingLeftContainer  = parseInt(window.
      //    getComputedStyle(this.$refs.carouselContainer)
      //   .paddingLeft, 10);
      // const paddingRightContainer  = parseInt(window
      //   .getComputedStyle(this.$refs.carouselContainer)
      //   .paddingRight, 10);
      // const paddingContainer =  paddingLeftContainer + paddingRightContainer;
      // const innerContainer = containerWidth - paddingContainer;

      // const carouselWidth = this.$refs.carousel.offsetWidth;
      // // const cardsInViewPort = Math.floor(innerContainer / this.slideTranslate);
      // const carouselMod = carouselWidth % innerContainer;

      // this.cardLastIndex = Math.floor(carouselWidth / innerContainer);
      // if (this.currentIndex > 0) {
      //   if ((this.currentIndex === 1 && carouselMod !== 0) && this.cardLastIndex !== 1) {
      //     this.$refs.carousel.style.transform = `translateX(${(currentPosition
      //     + (carouselMod + paddingLeftContainer))}px)`;
      //   } else if ((this.currentIndex === 1 && carouselMod !== 0) && this.cardLastIndex === 1) {
      //     console.log(3);
      //     this.$refs.carousel.style.transform = `translateX(${(currentPosition
      //     + (carouselMod))}px)`;
      //   }
      //   this.currentIndex = this.currentIndex + 1;
      // }
      console.log('ok');
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
    background rgba(255,255,255,0.8)
    &:first-child
      padding 0 8px 0 4px
      margin-right 8px
    &:last-child
      padding 0 4px 0 8px
      margin-left 8px
      right 0
.carousel-container
  display flex
  padding 24px 40px
  overflow-x hidden
  & > div
    display flex
    position relative
    transition all 0.3s ease-out
  .qcw-carousel__item
    margin-left 8px
    margin-right 8px
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
      // margin-right 0px
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