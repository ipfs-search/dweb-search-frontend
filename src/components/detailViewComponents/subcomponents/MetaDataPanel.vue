<script setup>
import { useRoute } from "vue-router";
import prettyBytes from "pretty-bytes";
import resourceURL from "@/helpers/resourceURL";
import moment from "moment";
import { elasticSearchEscape } from "@/helpers/ApiHelper";
import { nsfwClassificationFormatter } from "@/helpers/nsfwClassifier";
import { formatTime } from "@/composables/audioControls";

const route = useRoute();

const metadataLink = (item) => `metadata.${elasticSearchEscape(item.label)}:"${item.value}"`;
const filterLink = (filter) => ({
  name: "Search",
  query: {
    ...route.query,
    q: decodeURI(route.query.q).includes(filter)
      ? route.query.q
      : `${route.query.q ?? ""} ${filter}`.trim(),
  },
});

import index from "@/helpers/indexed-metadata.json";
const indexedMetadata = (item) =>
  Object.keys(index.ipfs_files_v9.mappings.properties.metadata.properties).includes(item.label);
</script>

<template>
  <v-row>
    <v-col>
      <div class="text-body-1">
        <v-expansion-panels v-model="$data.expand">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <template #default="{}">
                <div>File details:</div>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="ml-n2 mr-0">
              <template #default>
                <v-table>
                  <tbody>
                    <tr v-if="file.metadata?.metadata?.['title']">
                      <th>Title:</th>
                      <td>
                        <router-link
                          v-sane-html="file.metadata.metadata['title']"
                          :to="
                            filterLink(
                              metadataLink({
                                label: 'title',
                                value: file.metadata.metadata['title'],
                              })
                            )
                          "
                        />
                      </td>
                    </tr>
                    <tr v-if="file.author || file.metadata?.metadata?.['dc:creator']">
                      <th>Author:</th>
                      <td v-if="file.metadata?.metadata?.['dc:creator']">
                        <router-link
                          v-sane-html="file.metadata.metadata['dc:creator']"
                          :to="
                            filterLink(
                              metadataLink({
                                label: 'dc:creator',
                                value: file.metadata.metadata['dc:creator'],
                              })
                            )
                          "
                        />
                      </td>
                      <td v-else v-sane-html="file.author" />
                    </tr>
                    <tr v-if="file.metadata?.metadata?.['xmpDM:album']">
                      <th>Album:</th>
                      <td>
                        <router-link
                          v-sane-html="file.metadata.metadata['xmpDM:album']"
                          :to="
                            filterLink(
                              metadataLink({
                                label: 'xmpDM:album',
                                value: file.metadata.metadata['xmpDM:album'],
                              })
                            )
                          "
                        />
                      </td>
                    </tr>
                    <tr v-if="file.metadata?.metadata?.['xmpDM:trackNumber']">
                      <th>Track number:</th>
                      <td>
                        <router-link
                          v-sane-html="file.metadata.metadata['xmpDM:trackNumber']"
                          :to="
                            filterLink(
                              `metadata.${elasticSearchEscape('xmpDM:trackNumber')}:${parseInt(
                                file.metadata.metadata['xmpDM:trackNumber']
                              )}`
                            )
                          "
                        />
                      </td>
                    </tr>
                    <tr
                      v-if="
                        file.metadata?.metadata?.['length'] ||
                        file.metadata?.metadata?.['xmpDM:duration']
                      "
                    >
                      <th>Length:</th>
                      <td
                        v-if="file.metadata?.metadata?.['xmpDM:duration']"
                        v-sane-html="formatTime(file.metadata.metadata['xmpDM:duration'], false)"
                      />
                      <td
                        v-else
                        v-sane-html="formatTime(file.metadata.metadata['length'], false)"
                      />
                    </tr>
                    <tr v-if="file.metadata?.metadata?.['subject']">
                      <th>Subject:</th>
                      <td>
                        <router-link
                          v-sane-html="file.metadata.metadata['subject']"
                          :to="
                            filterLink(
                              metadataLink({
                                label: 'subject',
                                value: file.metadata.metadata['subject'],
                              })
                            )
                          "
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>File Name:</th>
                      <td v-sane-html="file.title" />
                    </tr>
                    <tr v-if="file.description">
                      <th>Description:</th>
                      <td v-sane-html="file.description" />
                    </tr>
                    <tr v-if="file.metadata?.language?.confidence === 'HIGH'">
                      <th>Language:</th>
                      <td>
                        <router-link
                          v-sane-html="
                            languages[file.metadata.language.language] ??
                            file.metadata.language.language
                          "
                          :to="{
                            name: 'Search',
                            query: {
                              ...filterLink(`language.language:${file.metadata.language.language}`)
                                .query,
                              language: undefined,
                            },
                          }"
                        />
                      </td>
                    </tr>
                    <tr v-if="file.metadata?.metadata?.width && file.metadata.metadata.height">
                      <th>Image dimensions:</th>
                      <td>
                        <router-link
                          v-sane-html="
                            `${file.metadata?.metadata?.width} x ${file.metadata.metadata.height}`
                          "
                          :to="
                            filterLink(
                              [
                                `metadata.width:${parseInt(file.metadata.metadata['width'])}`,
                                `metadata.height:${parseInt(file.metadata.metadata['height'])}`,
                              ].join(' ')
                            )
                          "
                        />
                      </td>
                    </tr>
                    <tr v-if="file.size">
                      <th>File size:</th>
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
                    <tr>
                      <th>Direct gateway link:</th>
                      <td>
                        <a
                          v-sane-html="resourceURL(file.hash)"
                          :href="resourceURL(file.hash)"
                          target="_blank"
                        />
                      </td>
                    </tr>
                    <tr v-if="file.nsfwClassification">
                      <th>NSFW classification</th>
                      <td>
                        {{ nsfwClassificationFormatter(file.nsfwClassification) }}
                      </td>
                    </tr>
                    <tr v-if="file.mimetype || file.metadata?.metadata?.['Content-Type']">
                      <th>Content type:</th>
                      <td v-if="file.metadata?.metadata?.['Content-Type']">
                        <router-link
                          v-sane-html="file.metadata.metadata['Content-Type']"
                          :to="
                            filterLink(
                              metadataLink({
                                label: 'Content-Type',
                                value: file.metadata.metadata['Content-Type'],
                              })
                            )
                          "
                        />
                      </td>

                      <td v-else v-sane-html="file.mimetype">{{ file.mimetype }}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>File locations:</th>
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
                      <i>More details: </i>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-table>
                        <tbody>
                          <tr v-for="(item, index) in extraData" :key="index">
                            <th>{{ item.label }}:</th>
                            <td v-if="indexedMetadata(item)">
                              <span v-for="(value, valueIndex) in item.value" :key="valueIndex">
                                <router-link
                                  v-sane-html="decodeURI(value)"
                                  :to="filterLink(metadataLink({ ...item, value }))"
                                >
                                </router-link>
                                <span v-if="valueIndex < item.value.length - 1">, </span>
                              </span>
                            </td>
                            <td v-else>
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
import { languages } from "@/store/modules/queryFilters/filterDefinitions/languageFilter";

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
          value: [
            languages[this.file.metadata.language.language] ?? this.file.metadata.language.language,
          ],
        });
      }
      return extraData.concat(
        Object.entries(this.file.metadata?.metadata ?? {}).map(([label, value]) => ({
          label,
          value,
        }))
      );
    },
  },
};
</script>
