<template>
  <div>
    <!-- Subheader -->
    <v-row>
      <v-col>
        <div class="text-caption mb-n8 text-truncate">
          <span class="">Last seen 1 day ago</span>
          <span> | Size 478mb</span><span> | Mimetype text/html</span>
        </div>
      </v-col>
    </v-row>

    <!-- Title -->
    <v-row>
      <v-col>
        <div class="text-h6 font-weight-regular">
          Unlimited Music Now
        </div>
      </v-col>
    </v-row>

    <!-- Content -->
    <v-row>
      <v-col>
        <div class="text-body-1">
          <v-treeview
            v-model="tree"
            :open="initiallyOpen"
            :items="items"
            activatable
            item-key="name"
            open-on-click
          >
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="!item.file">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ files[item.file] }}
              </v-icon>
            </template>
          </v-treeview>
        </div>
      </v-col>
    </v-row>

    <!-- Meta data -->
    <v-row>
      <v-col>
        <div class="text-body-1 mt-n3">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <div>
                    {{ `${open ? 'Hide' : 'Show'}` }} meta data
                  </div>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="ml-n2 mr-0">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Name
                        </th>
                        <th class="text-left">
                          Calories
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in desserts"
                        :key="item.name"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import VideoPlayer from '@/components/VideoPlayer.vue';
export default {

  components: {
    // VideoPlayer,
  },

  data: () => ({
    initiallyOpen: ['public'],
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
    },
    tree: [],
    items: [
      {
        name: '.git',
      },
      {
        name: 'node_modules',
      },
      {
        name: 'public',
        children: [
          {
            name: 'static',
            children: [{
              name: 'logo.png',
              file: 'png',
            }],
          },
          {
            name: 'favicon.ico',
            file: 'png',
          },
          {
            name: 'index.html',
            file: 'html',
          },
        ],
      },
      {
        name: '.gitignore',
        file: 'txt',
      },
      {
        name: 'babel.config.js',
        file: 'js',
      },
      {
        name: 'package.json',
        file: 'json',
      },
      {
        name: 'README.md',
        file: 'md',
      },
      {
        name: 'vue.config.js',
        file: 'js',
      },
      {
        name: 'yarn.lock',
        file: 'txt',
      },
    ],
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
  }),

  methods: {

  },
};
</script>

<style lang="scss" scoped>

</style>
