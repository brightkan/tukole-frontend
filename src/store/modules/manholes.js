
import api from "../../api";

export default {
    namespaced: true,
    state: {
        manhole: {
            number: "",
            site: ""
        },
        manholes: [],
        manholedurations: []
    },
    mutations: {
        SET_MANHOLE(state, payload) {
            state.manholes = payload
        },
        ADD_MANHOLE(state, payload) {
            state.manholes.push(payload)
        },
        DELETE_MANHOLE(state, payload){
            var index = state.manholes.findIndex(manhole => manhole.id === payload.id);
            state.manholes.splice(index, 1);
        },
        UPDATE_MANHOLE(state, payload){
            state.manholes = state.manholes.map(manhole => {
                if (manhole.id === payload.id) {
                    return Object.assign({}, manhole, payload)
                }
                return manhole
            })
        },
        SET_MANHOLE_DURATION(state, payload) {
            state.manholedurations = payload
        }
    },
    actions: {
        async loadManholes({ dispatch, commit, state, rootState }) {
            await dispatch('sites/loadSites', window.localStorage.getItem("workspace"), {root:true})
            await api
                .request("get", "manholes/?workspace=" + window.localStorage.getItem("workspace"))
                .then(response => {
                    let manholes = response.data
                    manholes.map(manhole => {
                        if(manhole.site){
                            rootState.sites.sites.forEach(element => {
                                if(manhole.site === element.id){
                                    manhole.site = element;
                                }
                            });
                        }
                    })
                    commit('SET_MANHOLE', manholes)
                });
        },
        addManhole({ commit, state, rootState }, payLoad) {
            api
                .request("post", "manholes/", payLoad)
                .then(response => {
                    let manhole = response.data;
                    if(manhole.site){
                        rootState.sites.sites.forEach(element => {
                            if(manhole.site === element.id){
                                manhole.site = element;
                            }
                        });
                    }
                    commit('ADD_MANHOLE', manhole)
                });
        },
        updateManhole({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "manholes/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let manhole = response.data;
                    if(manhole.site){
                        rootState.sites.sites.forEach(element => {
                            if(manhole.site === element.id){
                                manhole.site = element;
                            }
                        });
                    }
                    commit('UPDATE_MANHOLE', manhole)
                });
        },
        deleteManhole({commit}, payLoad){
            api
                .request("delete", "manholes/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_MANHOLE', payLoad)
                });
        },
        getDurations({commit}, payload){
            api
                .request("get", "manholeduration/?user="+ payload.user +"&&manhole="+ payload.manhole)
                .then(response => {
                    commit('SET_MANHOLE_DURATION', response.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    commit('SET_MANHOLE_DURATION', [])
                });
        }
    },
    getters: {
        getManhole: (state) => (manholeId) => {
            let manholes = state.manholes.filter(item => { return item.id == manholeId})
            return manholes[0]
        },
    }
}