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
                    <tr
                      v-for="item in metadata"
                      :key="item.key"
                    >
                      <td>{{ item.key }}</td>
                      <td v-html="item.value" />
                    </tr>
                  </tbody>
                </v-simple-table>
                <v-simple-table>
                  <thead>
                  <tr>
                    <th>
                      Referenced in:
                    </th>
                  </tr>
                  </thead>
                  <tbody>
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
                </v-simple-table>
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>
                        Extra data:
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in extraData"
                      :key="index"
                    >
                      <td>{{ item.key }}</td>
                      <td>{{ decodeURI(item.value) }}</td>
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
    metadata() {
      const metadata = [];
      // TODO: Make pretty names (e.g. remove hyphens).
      // TODO: See if all fields are there.
      [
        'title',
        'author',
        'creation_date',
        'description',
        'first-seen',
        'last-seen',
        'size',
        'mimetype',
      ].forEach((key) => {
        if (this.file[key]) metadata.push({ key, value: this.file[key] });
      });
      return metadata;
    },
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
      const metadata = [];
      if (this.file.metadata?.language?.rawScore > 0.95) {
        metadata.push({
          key: 'language',
          value: english.languages[this.file.metadata.language.language],
        });
      }
      return metadata.concat(Object.entries(this.file.metadata?.metadata)
        .map(([key, value]) => ({
          key,
          value: value.join(', '),
        })));
    },
  },
};
</script>
