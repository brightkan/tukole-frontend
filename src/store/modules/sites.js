
import api from "../../api";

export default {
    namespaced: true,
    state: {
        site: {
            site_name: "",
            location_lat: "",
            location_long: "",
            start_date: "",
            expected_end_date: "",
            archivedStatus: true,
            clientId: "",
            ackStatus: true,
            current_stage: 0,
            workspace: 0
        },
        surveyResults: [],
        sites: [],
        listType: 'all'
    },
    mutations: {
        SET_SITE(state, site) {
            state.site = site
        },
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
        },
        SET_SURVEY_RESULTS(state, payload){
            state.surveyResults = payload;
        },
        ADD_SURVEY_RESULT(state, payload){
            state.surveyResults.push(payload);
        }
    },
    actions: {
        async loadCurrentStage({commit}, payload){
            return await api.request("get", "sitestatus/?site"+payload.id);
        },
        loadSites({ commit, state }) {
            api
                .request("get", "sites/")
                .then(response => {
                    let sites = response.data

                    commit('SET_SITES', sites)
                });
        },
        loadSite({commit}, payload) {
            api
                .request("get", "sites/"+payload+"/")
                .then(response => {
                    let site = response.data

                    commit('SET_SITE', site)
                });
        },
        
        addSite({ commit, rootState }, payload) {
            api
                .request("post", "sites/", payload)
                .then(response => {
                    let site = response.data;

                    commit('ADD_SITE', site)
                });
        },
        updateSite({ commit, state, rootState }, payload) {
            api
                .request("patch", "sites/"+payload.id+"/", payload)
                .then(response => {
                    let site = response.data;
                    
                    commit('UPDATE_SITE', site)
                });
        },
        deleteSite({commit}, payload){
            api
                .request("delete", "sites/"+payload.id+"/")
                .then(() => {
                    commit('DELETE_SITE', payload)
                });
        },
        getSurveyImages({commit}, payload){
            // some api to get image
            commit('SET_SURVEY_RESULTS', payload)
        },
        addSurveyResult({commit}, payload){
            // some api to get image
            commit('ADD_SURVEY_RESULT', payload)
        }
    },
    getters: {
        getSites: (state) => {
            //logic goes here

            return state.sites
        }
    }
}