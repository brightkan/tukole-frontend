
import api from "../../api";

export default {
    namespaced: true,
    state: {
        site: {
            // Site object
        },
        sites: [],
        listType: 'all'
    },
    mutations: {
        SET_SITES(state, sites) {
            state.sites = sites
        },
        ADD_SITE(state, site) {
            state.sites.push(site)
        },
        CHANGE_LIST_TYPE(state, payLoad){
            state.listType = payLoad
        },
        DELETE_SITE(state, payload){
            var index = state.sites.findIndex(site => site.id === payload.id);
            state.sites.splice(index, 1);
        },
        UPDATE_SITE(state, payload){
            state.sites = state.sites.map(site => {
                if (site.id === payload.id) {
                    return Object.assign({}, site, payload)
                }
                return site
            })
        }
    },
    actions: {
        loadSites({ commit, rootState }) {
            api
                .request("get", "sites/")
                .then(response => {
                    let sites = response.data
                    
                    commit('SET_SITES', sites)
                });
        },
        addSite({ commit, rootState }, payLoad) {
            api
                .request("post", "sites/", payLoad)
                .then(response => {
                    let site = response.data;

                    commit('ADD_SITE', site)
                });
        },
        updateSite({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "sites/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let site = response.data;
                    
                    commit('UPDATE_SITE', site)
                });
        },
        deleteSite({commit}, payLoad){
            api
                .request("delete", "sites/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_SITE', payLoad)
                });
        }
    }
}