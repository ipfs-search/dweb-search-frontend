<template>
  <div
    class="detail"
    style="position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;"
  >
    <v-carousel
      v-model="model"
      height="100%"
      hide-delimiters
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"
      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <v-row
            class="fill-height ma-0 pa-0"
            align="center"
            justify="center"
          >
            <div class="text-h2">
              Slide {{ i + 1 }}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet
          color="green"
          height="100%"
          tile
        >
          <v-row
            class="fill-height ma-0 pa-0"
          >
            <div
              style="position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;"
            >
              <div
                class="inline-block"
                style="height: 100% !important; overflow-y: auto !important;"
              >
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      xl="8"
                      offset-xl="2"
                    >
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                        temporibus voluptatum quibusdam consequuntur tempora praesentium architecto
                        asperiores ipsum. Voluptate minus saepe molestiae ratione vel
                        dolorum ut quae ea provident aliquid?
                      </p>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data: () => ({
    model: 0,
    colors: [
      'primary',
      'secondary',
      'yellow darken-2',
      'red',
      'orange',
    ],
  }),
};
</script>

<style lang="scss">

</style>
