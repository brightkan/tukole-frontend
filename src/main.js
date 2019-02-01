// Import ES6 Promise
import "es6-promise/auto";

// Import System requirements
import Vue from "vue";
import VueRouter from "vue-router";

import { sync } from "vuex-router-sync";
import routes from "./routes";
import store from "./store";

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from "./filters";

// Import Views - Top level
import AppView from "./components/App.vue";

// Import Install and register helper items
Vue.filter("count", count);
Vue.filter("domain", domain);
Vue.filter("prettyDate", prettyDate);
Vue.filter("pluralize", pluralize);

var numeral = require("numeral");

Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});

Vue.use(VueRouter);
//Vue.use(require('vue-moment'));

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
 
Vue.use(VueMoment, {
    moment,
})

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  }
});

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    (!router.app.$store.state.token || router.app.$store.state.token === "null" || !window.localStorage.getItem("token"))
  ) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.console.log("Not authenticated");
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

sync(store, router);

// Check local storage to handle refreshes
if (window.localStorage) {
  var localUserString = window.localStorage.getItem("user") || "null";
  var localUser = JSON.parse(localUserString);

  if (localUser && store.state.user !== localUser) {
    store.commit("SET_USER", localUser);
    store.commit("SET_TOKEN", window.localStorage.getItem("token"));
  }
}

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: "#root",
  router: router,
  store: store,
  render: h => h(AppView)
});
