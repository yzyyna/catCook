import App from "./App";

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import pinia from "./stores";
import i18n from "./locales";
import { setI18nInstance } from "./utils/i18n";

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  app.use(i18n);

  setI18nInstance(i18n);

  return {
    app,
  };
}
// #endif
