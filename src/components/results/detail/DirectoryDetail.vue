<template>
  <v-sheet
    :light="!$vuetify.theme.dark"
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
                :class="$vuetify.breakpoint.mdAndUp ? 'mb-16' : ''"
              >
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
                        :open="$data.initiallyOpen"
                        :items="$data.items"
                        activatable
                        item-key="name"
                        open-on-click
                      >
                        <template v-slot:prepend="{ item, open }">
                          <v-icon v-if="!item.file">
                            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                          </v-icon>
                          <v-icon v-else>
                            {{ $data.files[item.file] }}
                          </v-icon>
                        </template>
                      </v-treeview>
                    </div>
                  </v-col>
                </v-row>

                <MetaDataPanel
                  :file="$props.file"
                  test-class="metadatapanel"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-row>
  </v-sheet>
</template>

<script>
import MetaDataPanel from '@/components/results/detail/MetaDataPanel';

export default {

  components: {
    MetaDataPanel,
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
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
  }),
};
</script>

<style lang="scss" scoped>

</style>
