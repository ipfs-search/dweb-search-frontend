<script setup>
import { computed, ref } from 'vue';

const marquee = ref(null)

const textWidth = computed(() => marquee.value?.firstChild.clientWidth)
const overflowing = computed(() => marquee.value?.clientWidth < textWidth.value)
const scrollDistance = computed(() => `${marquee.value?.clientWidth - textWidth.value}px`)

</script>

<template>
  <div data-id="Marquee" ref="marquee" :class="{bounce: overflowing}" style="overflow: hidden">
    <div style="overflow: auto; display: block; width: fit-content">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.bounce {
  height: 50px;
  overflow: hidden;
  position: relative;
}

.bounce div {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;
  -moz-transform: translateX(0%);
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
  -moz-animation: bouncing-text 5s linear infinite alternate;
  -webkit-animation: bouncing-text 5s linear infinite alternate;
  animation: bouncing-text 10s linear infinite alternate;
}

@-moz-keyframes bouncing-text {
  0% {
    -moz-transform: translateX(0%);
  }
  100% {
    -moz-transform: translateX(v-bind(scrollDistance));
  }
}

@-webkit-keyframes bouncing-text {
  0% {
    -webkit-transform: translateX(0%);
  }
  100% {
    -webkit-transform: translateX(v-bind(scrollDistance));
  }
}

@keyframes bouncing-text {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(v-bind(scrollDistance));
  }
}
</style>
