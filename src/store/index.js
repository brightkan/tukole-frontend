import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import tools from './modules/tools'

import api from "../api";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tools
  },
  state,
  actions,
  mutations
})
