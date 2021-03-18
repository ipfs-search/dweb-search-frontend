<template>
  <dialog-detail-base-layout>

    <template v-slot:dialog-detail-meta>
      <div class="text-caption mb-n7 text-truncate">
        <span class="green--text">Last seen 1 day ago</span><span> | Size 478mb</span><span> | Mimetype text/html</span>
      </div>
    </template>

    <template v-slot:dialog-detail-title>
      <div class="text-h5">
        Unlimited Music Now
      </div>
    </template>

    <template v-slot:dialog-detail-content>
      <div class="text-body-1">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum maxime officia recusandae! Cum id molestiae doloribus officia possimus optio omnis, consequuntur at. In aliquam saepe numquam enim pariatur sint quos. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore vel temporibus maxime dignissimos, deserunt animi veritatis nulla velit? Quidem pariatur repellendus ab excepturi voluptatem neque veritatis, natus maxime! Cumque, voluptatem.</p>
      </div>
    </template>

  </dialog-detail-base-layout>
</template>

<script>
import DialogDetailBaseLayout from '@/components/DialogDetailBaseLayout.vue';

export default {

  components: {
    DialogDetailBaseLayout,
  },
}
</script>

<style lang="">

</style>