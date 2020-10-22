import Vue from 'vue'
import vuetify from '../plugins/vuetify';


import { createDialogContainer } from "./createDialogContainer";

function hideDialog() {
  this.$destroy();
  this.$el.parentNode.removeChild(this.$el);
}

function showDialog(component, data) {
  const container = createDialogContainer();
  document.getElementById("app").appendChild(container);

  const ComponentClass = Vue.extend(component);
  const instance = new ComponentClass({
    vuetify,
    // store,
    propsData: {
      data,
    },
  });
  instance.$mount('#dialog-container');
}

export {
  hideDialog,
  showDialog,
};