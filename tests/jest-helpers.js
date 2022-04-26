import {
  createLocalVue,
  shallowMount,
  mount,
} from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import router from '@/router';
import VueClosable from 'vue-closable';

// wrapper for mount, to include vuetify
const localVue = createLocalVue();

localVue.use(VueClosable);
localVue.use(Vuex);

const vuetify = new Vuetify();

export const localShallowMount = (component, options = {}) => shallowMount(component, {
  localVue,
  router,
  vuetify,
  ...options,
});

export const localMount = (component, options = {}) => mount(component, {
  localVue,
  router,
  vuetify,
  ...options,
});
