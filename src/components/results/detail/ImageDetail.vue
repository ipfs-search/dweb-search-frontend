<template>
  <div>
    <!-- Image -->
    <v-row>
      <v-col>
        <div>
          <div class="image-wrapper">
            <div
              class="image-container"
              :style="`
                background-image: url(https://picsum.photos/900/1500?random);
                height: ${$vuetify.breakpoint.mdAndDown ? '100%' : '90%'};
                width: ${$vuetify.breakpoint.mdAndDown ? '100%' : '90%'};
              `"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {

  data() {
    return {

    };
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
// Claim the biggest possible space
.image-wrapper {
  position: absolute;
  top: 0;
  left:0;
  right:0;
  bottom:0;
  // Center and make content a fraction smaller on bigger devices
  // So that the whole image is visible
  .image-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
}
</style>
