<template lang="pug">
  .qcw-trigger-btn(@click="clickHandler")
    | {{ (label) ? label : 'Chat' }}
</template>

<script>
export default {
  name: 'QiscusTriggerButton',
  props: ['label', 'clickHandler'],
};
</script>

<style lang="stylus">
@import '../assets/stylus/_variables.styl'

.qcw-trigger-btn
  background: $primary-color
  color: #FFF
  padding: 5px 15px
  border-radius: 15px
  vertical-align middle
  width 70px
  text-align center
  cursor pointer
  transition all .3s ease
  box-shadow 0 2px 3px rgba(0,0,0,.3)
  margin-top: 15px
  
  &:hover
    transform translateY(-3px)
  
  .qcw-container.qcw-container--wide &
    display none
</style>


