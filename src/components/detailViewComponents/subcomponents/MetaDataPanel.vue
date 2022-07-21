<script setup>
import prettyBytes from "pretty-bytes";
import resourceURL from "@/helpers/resourceURL";
import moment from "moment";
</script>

<template>
  <v-row>
    <v-col>
      <div class="text-body-1">
        <v-expansion-panels v-model="expand">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <template #default="{ expanded: hide }">
                <div>{{ `${hide ? "Hide" : "Show"}` }} file info</div>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="ml-n2 mr-0">
              <template #default>
                <v-table>
                  <tbody>
                    <tr>
                      <th>Location:</th>
                      <td>
                        <a
                          v-sane-html="resourceURL(file.hash)"
                          :href="resourceURL(file.hash)"
                          target="_blank"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Title:</th>
                      <td v-sane-html="file.title" />
                    </tr>
                    <tr v-if="file.author">
                      <th>Author:</th>
                      <td v-sane-html="file.author" />
                    </tr>
                    <tr v-if="file.description">
                      <th>Description:</th>
                      <td v-sane-html="file.description" />
                    </tr>
                    <tr v-if="file.size">
                      <th>Size:</th>
                      <td>{{ prettyBytes(file.size) }}</td>
                    </tr>
                    <tr v-if="file.creation_date">
                      <th>Created:</th>
                      <td v-sane-html="moment(file.creation_date)" />
                    </tr>
                    <tr v-if="file['first-seen']">
                      <th>First seen:</th>
                      <td v-sane-html="moment(file['first-seen'])" />
                    </tr>
                    <tr v-if="file['last-seen']">
                      <th>Last seen:</th>
                      <td v-sane-html="moment(file['last-seen'])" />
                    </tr>
                    <tr v-if="file.mimetype">
                      <th>Mimetype:</th>
                      <td>{{ file.mimetype }}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>Referenced in:</th>
                      <td v-if="!references.length">
                        <i>No references</i>
                      </td>
                    </tr>
                    <tr v-for="(item, index) in references" :key="index">
                      <td />
                      <td>
                        <a v-sane-html="item.name" :href="item.url" target="_blank" />
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <v-expansion-panels v-if="extraData.length">
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <i
                        >Extra metadata from
                        <a
                          href="https://app.swaggerhub.com/apis-docs/ipfs-search/ipfs-search/1.0.2#/default/get_metadata__hash__"
                        >
                          metadata API:
                        </a>
                      </i>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-table>
                        <tbody>
                          <tr v-for="(item, index) in extraData" :key="index">
                            <th>{{ item.label }}:</th>
                            <td>
                              {{ decodeURI(item.value) }}
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import getResourceURL from "@/helpers/resourceURL";
import english from "@cospired/i18n-iso-languages/langs/en.json";

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
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
          label: "language",
          value: english.languages[this.file.metadata.language.language],
        });
      }
      return extraData.concat(
        Object.entries(this.file.metadata?.metadata ?? {}).map(([label, value]) => ({
          label,
          value: value.join(", "),
        }))
      );
    },
  },
};
</script>
