<template>
  <div>
    <!-- Image -->
    <v-row>
      <v-col>
        <div>
          <div
            class="image-container"
            :style="`background-image: url(https://picsum.photos/1500/900?image=${3 * 5 + 10})`"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {

  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    };
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
.image-container {
  position: absolute;
  top: 0;
  left:0;
  right:0;
  bottom:0;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
</style>
