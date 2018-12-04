
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
        requestListType: 'all',
        requestStatus: ['accepted','pending','all'],
        siteRoles: [],
        siteFleets: [],
        siteTools: [],
        siteBoqs: [],
        siteCosts: [],
        siteManholes: [],
        siteReInstallations: [],
        siteRoadCrossings: [],
        siteTrenchDistances: []
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
        CHANGE_LIST_TYPE(state, payLoad){
            state.listType = payLoad
        },
        CHANGE_REQUEST_LIST(state, payLoad){
            state.requestListType = payLoad
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
        },
        SET_SITE_TOOLS(state, payload){
            state.siteTools = payload;
        },
        ADD_SITE_TOOL(state, payload){
            state.siteTools.push(payload);
        },
        DELETE_SITE_TOOL(state, payload){
            var index = state.siteTools.findIndex(siteTool => siteTool.id === payload.id);
            state.siteTools.splice(index, 1);
        },
        SET_SITE_BOQS(state, payload){
            state.siteBoqs = payload;
        },
        SET_SITE_COSTS(state, payload){
            state.siteCosts = payload;
        },
        SET_SITE_MANHOLES(state, payload){
            state.siteManholes = payload;
        },
        SET_SITE_RE_INSTALLATIONS(state, payload){
            state.siteReInstallations = payload;
        },
        SET_SITE_ROAD_CROSSINGS(state, payload){
            state.siteRoadCrossings = payload;
        },
        SET_SITE_TRENCH_DISTANCES(state, payload){
            state.siteTrenchDistances = payload;
        },
    },
    actions: {
        async loadCurrentStage({commit}, payload){
            return await api.request("get", "sitestatus/?site"+payload.id);
        },
        loadSites({ commit, state }, payload) {
            api
                .request("get", "sites/?workspace="+payload)
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
                .request("patch", "sites/"+payload.id+"/", {site_deleted: true})
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
            await dispatch("users/loadUsers",window.localStorage.getItem("workspace"), {root:true});
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
        addUserSiteFleet({commit}, payload){
            api
                .request("post", "usersitefleets/", payload)
                .then(response => {
                    console.log("" + response.data );
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
        },



        async loadSiteTools({dispatch, commit, rootState}, payload){
            await dispatch("tools/loadTools",{}, {root:true});
            await api
                .request("get", "sitetools/?site="+payload)
                .then((response) => {
                    let sitetools = response.data.map(item => {
                        let siteTool = item;
                        rootState.tools.tools.forEach(tool => {
                            if(item.tool === tool.id){
                                siteTool.tool = tool;
                            }
                        })
                        return siteTool;
                    });
                    commit('SET_SITE_TOOLS', sitetools)
                });
        },
        addSiteTool({commit, rootState}, payload){
            api
                .request("post", "sitetools/", payload)
                .then(response => {
                    let siteTool = response.data;

                    rootState.tools.tools.forEach(tool => {
                        if(siteTool.tool === tool.id){
                            siteTool.tool =  tool;
                        }
                    })

                    commit('ADD_SITE_TOOL', siteTool)
                });
        },
        deleteSiteTool({commit}, payload){
            api
                .request("delete", "sitetools/"+payload.id+"/")
                .then(() => {
                    commit('DELETE_SITE_TOOL', payload)
                });
        },
        loadBoqs({commit}, payload){
            api
                .request("get", "siteboqs/?site="+payload)
                .then((response) => {
                    
                    commit('SET_SITE_BOQS', response.data)
                });
        },
        loadCosts({commit}, payload) {
            api
                .request("get", "cost/?site="+payload)
                .then((response) => {
                    
                    commit('SET_SITE_COSTS', response.data)
                });
        },
        loadSiteManholes({commit}, payload) {
            api
                .request("get", "manholes/?site="+payload)
                .then((response) => {
                    
                    commit('SET_SITE_MANHOLES', response.data)
                });
        },
        async loadSiteReInstallations({dispatch, commit, rootState}, payload) {
            await dispatch("materials/loadMaterials",{}, {root:true});
            await api
                .request("get", "reinstallation/?site="+payload)
                .then((response) => {
                    let reinstallations = response.data.map(item => {
                        let reinstallation = item;
                        rootState.materials.materials.forEach(material => {
                            if(item.material === material.id){
                                reinstallation.material = material;
                            }
                        })
                        return reinstallation;
                    });

                    commit('SET_SITE_RE_INSTALLATIONS', reinstallations)
                });
        },
        async loadSiteRoadCrossings({dispatch, commit, rootState}, payload) {
            await dispatch("tools/loadTools",{}, {root:true});
            await api
                .request("get", "roadcrossing/?site="+payload)
                .then((response) => {

                    let roadcrossings = response.data.map(item => {
                        let roadcrossing = item;
                        rootState.tools.tools.forEach(tool => {
                            if(item.tool === tool.id){
                                roadcrossing.tool = tool;
                            }
                        })
                        return roadcrossing;
                    });
                    
                    commit('SET_SITE_ROAD_CROSSINGS', roadcrossings)
                });
        },
        loadSiteTrenchDistance({commit}, payload) {
            api
                .request("get", "distance/trenched/?site="+payload)
                .then((response) => {
                    
                    commit('SET_SITE_TRENCH_DISTANCES', response.data)
                });
        },
    },
    getters: {
        getBoqTotal: (state) => {
            let total = 0;
            state.siteBoqs.forEach(boq => {
                total += boq.estimate_quantity * boq.material_unit_cost
            })
            return total
        },
        getSites: (state) => {
            //logic goes here

            if(window.localStorage.getItem('clientType') === 'client'){
                return state.sites.filter(item => (JSON.parse(window.localStorage.getItem('user'))).user_id == item.clientId && item.ackStatus);
            }else{
                return state.sites.filter(item => item.ackStatus);
            }   
        },
        getRequests: (state) => {
            if(state.requestListType === 'all'){
                if(window.localStorage.getItem('clientType') === 'client'){
                    return state.sites.filter(item => (JSON.parse(window.localStorage.getItem('user'))).user_id == item.clientId);
                }else{
                    return state.sites;
                }   
            }else{
                let requests = [];
                state.requestStatus.forEach(element => {
                    if(state.requestListType === 'pending'){
                        requests = state.sites.filter(item => !item.ackStatus);
                    }else if(state.requestListType === 'accepted'){
                        requests = state.sites.filter(item => item.ackStatus);
                    }
                });

                if(window.localStorage.getItem('clientType') === 'client'){
                    return requests.filter(item => (JSON.parse(window.localStorage.getItem('user'))).user_id == item.clientId);
                }else{
                    return requests;
                }   

                
            }
        }
    }
}