<template>
  <v-row>
    <v-col>
      <div class="text-body-1">
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
              <template v-slot:default>
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
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import DetailMixin from '@/mixins/DetailMixin';
import getResourceURL from '@/helpers/resourceURL';

export default {
  mixins: [
    DetailMixin,
  ],
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
        'type',
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
  },
};
</script>
