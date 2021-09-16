<template>
  <!-- Meta data -->
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
                      v-for="item in metaData"
                      :key="item.key"
                    >
                      <td>{{ item.key }}</td>
                      <td v-html="item.value" />
                    </tr>
                    <tr>
                      <td>Referenced in:</td>
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
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    metaData() {
      const metaData = [];
      // TODO: filters on size, firstseen, lastseen, etc. Make pretty names (e.g. remove hyphens).
      [
        'author',
        'creation_date',
        'description',
        'first-seen',
        'last-seen',
        'size',
        'type',
      ].forEach((key) => {
        if (this.file[key]) metaData.push({ key, value: this.file[key] });
      });
      return metaData;
    },
    references() {
      const references = [];
      console.log(this.file);
      if (this.file.references) {
        this.file.references.forEach((reference) => {
          references.push({ name: reference.name, url: `https://gateway.ipfs.io/ipfs/${reference.parent_hash}` });
        });
      }
      return references;
    },
  },
};
</script>
