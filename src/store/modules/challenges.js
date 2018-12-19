
import api from "../../api";

export default {
    namespaced: true,
    state: {
        challenge: {
            name: "",
            workspace: "",
            measurement: "",
            unit_cost: ""
        },
        challenges: [],
        incident: {
            name: "",
            workspace: "",
            measurement: "",
            unit_cost: ""
        },
        incidents: [],
    },
    mutations: {
        SET_CHALLENGES(state, challenges) {
            state.challenges = challenges
        },
        SET_INCIDENTS(state, incidents) {
            state.incidents = incidents
        }
    },
    actions: {
        loadChallenges({ commit }) {
            api
                .request("get", "challenges/")
                .then(response => {
                    let challenges = response.data
                    commit('SET_CHALLENGES', challenges)
                });
        },
        loadIncidents({ commit }) {
            api
                .request("get", "incidents/")
                .then(response => {
                    let incidents = response.data
                    commit('SET_INCIDENTS', incidents)
                });
        }
    }
}