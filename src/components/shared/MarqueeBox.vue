<script setup>
import { ref, onBeforeMount, onBeforeUnmount, onMounted, onUpdated } from "vue";

const marquee = ref(null);

let textWidth = ref(0);
let overflowing = ref(false);
let scrollDistance = ref(0);

const calculate = () => {
  textWidth.value = marquee.value.firstChild.clientWidth;
  overflowing.value = marquee.value.clientWidth < textWidth.value;
  scrollDistance.value = `${marquee.value.clientWidth - textWidth.value}px`;
};
onBeforeMount(() => {
  window.addEventListener("resize", calculate);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", calculate);
});
onMounted(() => {
  calculate();
});
onUpdated(() => {
  calculate();
});
</script>

<template>
  <div ref="marquee" data-id="Marquee" :class="{ bounce: overflowing }" style="overflow: hidden">
    <div style="overflow: auto; display: block; width: fit-content">
      <slot />
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
  5% {
    -moz-transform: translateX(0%);
  }
  95% {
    -moz-transform: translateX(v-bind(scrollDistance));
  }
}

@-webkit-keyframes bouncing-text {
  5% {
    -webkit-transform: translateX(0%);
  }
  95% {
    -webkit-transform: translateX(v-bind(scrollDistance));
  }
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
