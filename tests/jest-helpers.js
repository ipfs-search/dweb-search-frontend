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

const inject = {
  localVue,
  router,
  vuetify,
}

export const localShallowMount = (component, options = {}) => shallowMount(component, {
  ...inject,
  ...options,
});

export const localMount = (component, options = {}) => mount(component, {
  ...inject,
  ...options,
});
