
import api from "../../api";

export default {
    namespaced: true,
    state: {
        metric: {
            team: "",
            action: "",
            min_time: 0,
            max_time: 0,
            points: 0
        },
        metrics: [],
        userMetrics: []
    },
    mutations: {
        SET_METRICS(state, metrics) {
            state.metrics = metrics
        },
        SET_USER_METRICS(state, userMetrics) {
            state.userMetrics = userMetrics
        },
        ADD_METRIC(state, metrics) {
            state.metrics.push(metrics)
        },
        DELETE_METRIC(state, payload){
            var index = state.metrics.findIndex(metric => metric.id === payload.id);
            state.metrics.splice(index, 1);
        },
        UPDATE_METRIC(state, payload){
            state.metrics = state.metrics.map(metric => {
                if (metric.id === payload.id) {
                    return Object.assign({}, metric, payload)
                }
                return metric
            })
        }
    },
    actions: {
        async loadUserMetrics({ commit }){
            api
            .request("get", "usermetrics/")
            .then(response => {
                commit('SET_USER_METRICS', response.data)
            });
        },
        loadMetrics({ commit }) {
            api
                .request("get", "metrics/")
                .then(response => {
                    commit('SET_METRICS', response.data)
                });
        },
        addMetric({ commit }, payLoad) {
            api
                .request("post", "metrics/", payLoad)
                .then(response => {
                    commit('ADD_METRIC', response.data)
                });
        },
        updateMetric({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "metrics/"+payLoad.id+"/", payLoad)
                .then(response => {
                    commit('UPDATE_METRIC', response.data)
                });
        },
        deleteMetric({commit}, payLoad){
            api
                .request("delete", "metrics/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_METRIC', payLoad)
                });
        }
    }
}