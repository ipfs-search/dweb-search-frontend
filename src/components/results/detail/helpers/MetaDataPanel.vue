<template>
  <v-row>
    <v-col>
      <div class="text-body-1">
        <v-expansion-panels
          v-model="expand"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              <template #default="{ open }">
                <div>
                  {{ `${open ? 'Hide' : 'Show'}` }} file info
                </div>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="ml-n2 mr-0">
              <template #default>
                <v-simple-table>
                  <tbody>
                    <tr>
                      <th>
                        <i>
                          Metadata from
                          <a href="https://app.swaggerhub.com/apis-docs/ipfs-search/ipfs-search/1.0.2#/default/get_search">
                            search API:
                          </a>
                        </i>
                      </th>
                    </tr>
                    <tr>
                      <th>Title:</th>
                      <td v-html="file.title" />
                    </tr>
                    <tr v-if="file.author">
                      <th>Author:</th>
                      <td v-html="file.author" />
                    </tr>
                    <tr v-if="file.description">
                      <th>Description:</th>
                      <td v-html="file.description" />
                    </tr>
                    <tr>
                      <th>Size:</th>
                      <td>{{ file.size | prettyBytes }}</td>
                    </tr>
                    <tr v-if="file.creation_date">
                      <th>Created:</th>
                      <td v-html="new Date(file.creation_date)" />
                    </tr>
                    <tr v-if="file['first-seen']">
                      <th>First seen:</th>
                      <td v-html="new Date(file['first-seen'])" />
                    </tr>
                    <tr v-if="file['last-seen']">
                      <th>Last seen:</th>
                      <td v-html="new Date(file['last-seen'])" />
                    </tr>
                    <tr>
                      <th>Mimetype:</th>
                      <td>{{ file.mimetype }}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>
                        Referenced in:
                      </th>
                      <td v-if="! references.length">
                        <i>No references</i>
                      </td>
                    </tr>
                    <tr
                      v-for="(item, index) in references"
                      :key="index"
                    >
                      <td>
                        <a
                          :href="item.url"
                          target="_blank"
                          v-html="item.name"
                        />
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>
                        <i>Extra metadata from
                          <a href="https://app.swaggerhub.com/apis-docs/ipfs-search/ipfs-search/1.0.2#/default/get_metadata__hash__">
                            metadata API:
                          </a></i>
                      </th>
                    </tr>
                    <tr
                      v-for="(item, index) in extraData"
                      :key="index"
                    >
                      <th>{{ item.label }}:</th>
                      <td>
                        {{ Date.parse(item.value) ? Date(item.value) : decodeURI(item.value) }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import DetailMixin from '@/components/results/detail/mixins/DetailMixin';
import getResourceURL from '@/helpers/resourceURL';
import english from '@cospired/i18n-iso-languages/langs/en.json';

export default {
  mixins: [
    DetailMixin,
  ],
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expand: this.expanded ? 0 : -1,
    };
  },
  computed: {
    references() {
      const references = [];
      if (this.file.references) {
        this.file.references.forEach((reference) => {
          references.push({
            name: reference.name,
            url: getResourceURL(reference.parent_hash),
          });
        });
      }
      return references;
    },
    extraData() {
      const extraData = [];
      if (this.file.metadata?.language?.rawScore > 0.95) {
        extraData.push({
          label: 'language',
          value: english.languages[this.file.metadata.language.language],
        });
      }
      return extraData.concat(Object.entries(this.file.metadata?.metadata)
        .map(([label, value]) => ({
          label,
          value: value.join(', '),
        })));
    },
  },
};
</script>
