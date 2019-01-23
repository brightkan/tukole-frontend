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
import users from './modules/users'
import notifications from './modules/notifications'
import challenges from './modules/challenges'
import warehouse from './modules/warehouse'
import manholes from './modules/manholes'
import checklist from './modules/checklist'
import companies from './modules/companies'
import qualityChecks from './modules/qaulityChecks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tools,
    fleets,
    machinery,
    materials,
    sites,
    users,
    notifications,
    challenges,
    warehouse,
    manholes, 
    checklist,
    companies,
    qualityChecks,
  },
  state,
  actions,
  mutations
})
