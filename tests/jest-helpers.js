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
};

const mounter = (mountFunction, component, options = {}) => {
  const child = mountFunction(component, {
    ...inject,
    ...options,
  });
  const app = mount({
    template: '<div data-app="true" id="app" class="v-application"></div>',
  });
  app.element.appendChild(child.element);
  return app;
};

export const localMount = (component, options = {}) => mounter(mount, component, options);
export const localShallowMount = (component, options = {}) => mounter(shallowMount, component, options);
