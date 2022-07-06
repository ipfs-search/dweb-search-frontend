// https://stackoverflow.com/a/65275641/2380702
import 'regenerator-runtime/runtime'; // To ensure that regeneratorRuntime is defined globally
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Vuetify from 'vuetify';

Vue.use(VueCompositionApi);
Vue.use(Vuetify);
