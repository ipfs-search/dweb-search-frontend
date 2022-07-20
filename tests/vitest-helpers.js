import {
  shallowMount,
  mount,
} from '@vue/test-utils';
import VueClosable from 'vue-closable';
import vuetify from '@/plugins/vuetify';
import store from '@/store';
import router from '@/router';

const global = {
  plugins: [
    VueClosable,
    vuetify,
    store,
    router,
  ],
};

const mounter = (mountFunction, component, options = {}) => {
  const child = mountFunction(component, {
    global,
    ...options,
  });
  const app = mount({
    template: '<div data-app="true" id="app" class="v-application"></div>',
  });
  app.element.appendChild(child.element);
  return app;
};

export const localMount = (component, options = {}) => mounter(mount, component, options);
export const localShallowMount = (component, options = {}) => mounter(
  shallowMount,
  component,
  options,
);
