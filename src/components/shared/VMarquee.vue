<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount, onMounted, onUpdated } from "vue";

const marquee = ref({} as HTMLDivElement);

let textWidth = ref(0);
let overflowing = ref(false);
let scrollDistance = ref("0px");

const recalculateMarquee = () => {
  textWidth.value = marquee.value?.children[0]?.clientWidth;
  overflowing.value = marquee.value?.clientWidth < textWidth.value;
  scrollDistance.value = `${marquee.value?.clientWidth - textWidth.value}px`;
};
onBeforeMount(() => {
  window.addEventListener("resize", recalculateMarquee);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", recalculateMarquee);
});
onMounted(() => {
  recalculateMarquee();
});
onUpdated(() => {
  recalculateMarquee();
});
</script>

<template>
  <div ref="marquee" data-id="v-marquee" :class="{ bounce: overflowing }" style="overflow: hidden">
    <div style="display: block; width: fit-content; height: fit-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bounce {
  position: relative;
}

.bounce div {
  width: 100%;
  height: 100%;
  text-align: center;
  transform: translateX(0%);
  animation: bouncing-text 10s linear infinite alternate;
}

@keyframes bouncing-text {
  0% {
    transform: translateX(0%);
  }
  5% {
    transform: translateX(0%);
  }
  95% {
    transform: translateX(v-bind(scrollDistance));
  }
  100% {
    transform: translateX(v-bind(scrollDistance));
  }
}
</style>
