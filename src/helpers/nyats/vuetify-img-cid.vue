<template>
  <v-img ref="img" :src="thumbURL()" v-bind="$attrs" @error="thumbErr()">
    <template #placeholder>
      <slot v-if="generateErr" name="failed" />
      <slot v-else name="placeholder" />
    </template>

    <template #failed> <slot name="failed" /> </template>

    <template #default>
      <slot name="default" />
    </template>
  </v-img>
</template>

<script>
import { DefaultConfig, GetClient } from "nyats-client";

const config = {
  endpoint: import.meta.env.VITE_NYATS_API || DefaultConfig.endpoint,
  gatewayURL: import.meta.env.VITE_NYATS_IPFS_GATEWAY || DefaultConfig.gatewayURL,
  ipnsRoot: import.meta.env.VITE_NYATS_IPNS_ROOT || DefaultConfig.ipnsRoot,
};

const { IPNSThumbnailURL, GenerateThumbnailURL } = GetClient(config);

export default {
  props: {
    cid: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: null,
    },
  },
  data: () => ({
    ipnsErr: false,
    generateErr: false,
    width: null,
    height: null,
  }),
  mounted() {
    this.updateSize(this.$refs.img);
  },
  updated() {
    this.updateSize(this.$refs.img);
  },
  methods: {
    updateSize(el) {
      if (el) {
        this.height = el.$el.clientHeight;
        this.width = el.$el.clientHeight;
      }
    },
    thumbErr() {
      if (this.ipnsErr) {
        this.generateErr = true;
      } else {
        this.ipnsErr = true;
      }
    },
    thumbURL() {
      if (this.width && this.height) {
        if (this.ipnsErr) {
          return GenerateThumbnailURL(this.cid, this.width, this.height, this.type);
        }

        return IPNSThumbnailURL(this.cid, this.width, this.height);
      }
    },
  },
};
</script>
