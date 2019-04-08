
import api from "../../api";

export default {
    namespaced: true,
    state: {
        material: {
            name: "",
            workspace: "",
            measurement: "",
            unit_cost: ""
        },
        materials: [],
        loading: false
    },
    mutations: {
        SET_MATERIALS(state, materials) {
            state.materials = materials
        },
        ADD_MATERIAL(state, material) {
            state.materials.push(material)
        },
        DELETE_MATERIAL(state, payload){
            var index = state.materials.findIndex(material => material.id === payload.id);
            state.materials.splice(index, 1);
        },
        UPDATE_MATERIAL(state, payload){
            state.materials = state.materials.map(material => {
                if (material.id === payload.id) {
                    return Object.assign({}, material, payload)
                }
                return material
            })
        },
        CHANGE_LOADING(state, payload){
            state.loading = payload
        }
    },
    actions: {
        loadMaterials({ commit }) {
            api
                .request("get", "materials/?workspace=" + window.localStorage.getItem("workspace"))
                .then(response => {
                    let materials = response.data
                    commit('SET_MATERIALS', materials)
                });
        },
        addMaterial({ commit }, payLoad) {
            api
                .request("post", "materials/", payLoad)
                .then(response => {
                    let material = response.data;
                    commit('ADD_MATERIAL', material)
                });
        },
        updateMaterial({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "materials/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let material = response.data;
                    rootState.statuses.forEach(element => {
                        if(material.status === element.name){
                            material.status = element;
                        }
                    });
                    commit('UPDATE_MATERIAL', material)
                });
        },
        deleteMaterial({commit}, payLoad){
            api
                .request("delete", "materials/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_MATERIAL', payLoad)
                });
        },
        massAddMaterials({ commit, rootState }, payload){
            commit('CHANGE_LOADING', true)
            api
                .request("post", "materials/import/", payload)
                .then(response => {
                    commit('CHANGE_LOADING', false)
                    dispatch('materials/loadMaterials', {root:true})
                });
        }
    },
    getters: {
        runningOut: (state) => {
            return state.materials.filter(material => { return material.running_out })
        }
    }
}