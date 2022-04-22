import { createLocalVue, mount as mountUtil } from '@vue/test-utils';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
let vuetify = new Vuetify();
export const mount = (component, options) => mountUtil(component, { localVue, vuetify, ...options });
