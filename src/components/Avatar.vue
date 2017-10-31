<template lang="pug">
  div(class="qcw-avatar")
    img(:src="src")
</template>

<script>
export default {
  name: 'Avatar',
  props: ['src'],
};
</script>