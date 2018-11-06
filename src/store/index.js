import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import tools from './modules/tools'
import fleets from './modules/fleets'
import machinery from './modules/machinery'
import materials from './modules/materials'
import sites from './modules/sites'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tools,
    fleets,
    machinery,
    materials,
    sites
  },
  state,
  actions,
  mutations
})
