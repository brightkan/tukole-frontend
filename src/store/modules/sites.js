
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
        listType: 'all',
        requests: [],
        requestStatus: ['accepted','pending','all'],
        siteRoles: [],
        siteFleets: []
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
        },
        SET_SITE_REQUESTS(state, payload){
            state.requests = payload;
        },
        ADD_SITE_REQUEST(state, payload){
            state.requests.push(payload);
        },
        DELETE_SITE_REQUEST(state, payload){
            var index = state.requests.findIndex(request => request.id === payload.id);
            state.requests.splice(index, 1);
        },
        CHANGE_LIST_TYPE(state, payLoad){
            state.listType = payLoad
        },
        SET_SITE_ROLES(state, payload){
            state.siteRoles = payload;
        },
        ADD_SITE_ROLE(state, payload){
            state.siteRoles.push(payload);
        },
        DELETE_SITE_ROLE(state, payload){
            var index = state.siteRoles.findIndex(siteRole => siteRole.id === payload.id);
            state.siteRoles.splice(index, 1);
        },
        SET_SITE_FLEETS(state, payload){
            state.siteFleets = payload;
        },
        ADD_SITE_FLEET(state, payload){
            state.siteFleets.push(payload);
        },
        DELETE_SITE_FLEET(state, payload){
            var index = state.siteFleets.findIndex(siteFleet => siteFleet.id === payload.id);
            state.siteFleets.splice(index, 1);
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
        loadSite({dispatch, commit}, payload) {
            dispatch("loadSiteRoles", payload)
            dispatch("loadSiteFleets", payload)
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
        },
        loadRequests({commit}, payload){
            // some api to get image
            commit('SET_SITE_REQUESTS', payload)
        },
        addRequest({commit}, payload){
            // some api to get image
            commit('ADD_SITE_REQUEST', payload)
        },
        deleteRequest({commit}, payload){
            // some api to get image
            commit('DELETE_SITE_REQUEST', payload)
        },
        async loadSiteRoles({dispatch, commit, rootState}, payload){
            await dispatch("users/loadUsers",{}, {root:true});
            await api
                .request("get", "siteroles/?site="+payload)
                .then((response) => {
                    let siteroles = response.data.map(item => {
                        let siteRole = item;
                        rootState.users.users.forEach(user => {
                            if(item.user === user.id){
                                siteRole.user =  user;
                            }
                        })
                        return siteRole;
                    });
                    commit('SET_SITE_ROLES', siteroles)
                });
        },
        addSiteRole({commit, rootState}, payload){
            api
                .request("post", "siteroles/", payload)
                .then(response => {
                    let siteRole = response.data;

                    rootState.users.users.forEach(user => {
                        if(siteRole.user === user.id){
                            siteRole.user =  user;
                        }
                    })

                    commit('ADD_SITE_ROLE', siteRole)
                });
        },
        deleteSiteRole({commit}, payload){
            api
                .request("delete", "siteroles/"+payload.id+"/")
                .then(() => {
                    commit('DELETE_SITE_ROLE', payload)
                });
        },

        
        async loadSiteFleets({dispatch, commit, rootState}, payload){
            await dispatch("fleets/loadFleets",{}, {root:true});
            await api
                .request("get", "sitefleets/?site="+payload)
                .then((response) => {
                    let sitefleets = response.data.map(item => {
                        let siteFleet = item;
                        rootState.fleets.fleets.forEach(fleet => {
                            if(item.fleet === fleet.id){
                                siteFleet.fleet = fleet;
                            }
                        })
                        return siteFleet;
                    });
                    commit('SET_SITE_FLEETS', sitefleets)
                });
        },
        addSiteFleet({commit, rootState}, payload){
            api
                .request("post", "sitefleets/", payload)
                .then(response => {
                    let siteFleet = response.data;

                    rootState.fleets.fleets.forEach(fleet => {
                        if(siteFleet.fleet === fleet.id){
                            siteFleet.fleet =  fleet;
                        }
                    })

                    commit('ADD_SITE_FLEET', siteFleet)
                });
        },
        deleteSiteFleet({commit}, payload){
            api
                .request("delete", "sitefleets/"+payload.id+"/")
                .then(() => {
                    commit('DELETE_SITE_FLEET', payload)
                });
        }
    },
    getters: {
        getSites: (state) => {
            //logic goes here

            return state.sites
        },
        getRequests: (state) => {
            if(state.listType === 'all'){
                return state.requests;
            }else{
                let requests = [];
                state.requestStatus.forEach(element => {
                    if(state.listType === element.name){
                        requests = state.requests.filter(item => {
                            return item.status === element;
                        });
                    }
                });
                return requests;
            }
        }
    }
}