import api from "../../api";

export default {
    namespaced: true,
    state: {
        company: {
            name: ""
        },
        companies: [],
    },
    mutations: {
        SET_COMPANIES(state, payload) {
            state.companies = payload
        },
        ADD_COMPANY(state, payload) {
            state.companies.push(payload)
        },
        DELETE_COMPANY(state, payload){
            var index = state.companies.findIndex(company => company.id === payload.id);
            state.companies.splice(index, 1);
        },
        UPDATE_COMPANY(state, payload){
            state.companies = state.companies.map(company => {
                if (company.id === payload.id) {
                    return Object.assign({}, company, payload)
                }
                return company
            })
        }
    },
    actions: {
        loadCompanies({ commit }) {
            api
                .request("get", "company/?workspace=" + window.localStorage.getItem("workspace"))
                .then(response => {
                    commit('SET_COMPANIES', response.data)
                });
        },
        addCompany({ commit }, payLoad) {
            api
                .request("post", "company/", payLoad)
                .then(response => {
                    commit('ADD_COMPANY', response.data)
                });
        },
        updateCompany({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "company/"+payLoad.id+"/", payLoad)
                .then(response => {
                    commit('UPDATE_COMPANY', response.data)
                });
        },
        deleteCompany({commit}, payLoad){
            api
                .request("delete", "company/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_COMPANY', payLoad)
                });
        }
    },
    getters: {
        getCompany: (state) => (id) => {
            let company = state.companies.filter(company => { return company.id == id })
            return company[0]
        }
    }
}