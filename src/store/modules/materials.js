
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
    },
    mutations: {
        SET_MATERIALS(state, materials) {
            state.materials = materials
        },
        ADD_MATERIAL(state, material) {
            state.materials.push(material)
        }
    },
    actions: {
        loadMaterials({ commit }) {
            api
                .request("get", "materials/")
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
        }
    }
}