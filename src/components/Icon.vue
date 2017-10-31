<template lang="pug">
  svg(class="qc-icon" :style="{ fill: fillOverride }")
    use(:xlink:href="xlink")
</template>

<script>
export default {
  name: 'Icon',
  props: ['name', 'fill'],
  computed: {
    xlink() { return `#${this.name}`; },
    fillOverride() { return this.fill; },
  },
};
</script>

<style>
.qc-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: #444;
}
.qc-icon--light {
  fill: #FFF;
}
</style>

