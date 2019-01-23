
import api from "../../api";

export default {
    namespaced: true,
    state: {
        qualityCheck: {
            "title": "",
            "description": "",
            "affected_teams": "",
            "site": 0,
            "priority": "",
            "user": ""
        },
        qualityChecks: [],
    },
    mutations: {
        SET_QUALITY_CHECKS(state, payload) {
            state.qualityChecks = payload
        },
        UPDATE_QUALITY_CHECKS(state, payload){
            state.qualityChecks = state.qualityChecks.map(qualityCheck => {
                if (qualityCheck.id === payload.id) {
                    return Object.assign({}, qualityCheck, payload)
                }
                return qualityCheck
            })
        }
    },
    actions: {
        loadQualityChecks({ commit }) {
            api
                .request("get", "comments/")
                .then(response => {
                    let challenges = response.data
                    commit('SET_QUALITY_CHECKS', challenges)
                });
        },
        updateQualityCheck({ commit }, payload){
            api
                .request("patch", "comments/"+payload.id+"/", payload)
                .then(response => {
                    commit('UPDATE_QUALITY_CHECKS', response.data)
                });
        }
    }
}