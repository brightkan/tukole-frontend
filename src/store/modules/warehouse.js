
import api from "../../api";

export default {
    namespaced: true,
    state: {
        wareHouseMaterial: {
            name: "",
            workspace: "",
            measurement: "",
            unit_cost: ""
        },
        warehouses: [],
        wareHouseMaterials: [],
    },
    mutations: {
        SET_WAREHOUSES(state, wareHouseMaterials) {
            state.wareHouseMaterials = wareHouseMaterials
        },
        ADD_WAREHOUSE(state, wareHouseMaterial) {
            state.wareHouseMaterials.push(wareHouseMaterial)
        },
        DELETE_WAREHOUSE(state, payload){
            var index = state.wareHouseMaterials.findIndex(wareHouseMaterial => wareHouseMaterial.id === payload.id);
            state.wareHouseMaterials.splice(index, 1);
        },
        UPDATE_WAREHOUSE(state, payload){
            state.wareHouseMaterials = state.wareHouseMaterials.map(wareHouseMaterial => {
                if (wareHouseMaterial.id === payload.id) {
                    return Object.assign({}, wareHouseMaterial, payload)
                }
                return wareHouseMaterial
            })
        }
    },
    actions: {
        async loadWarehouseMaterials({ dispatch, commit, state, rootState }, payload) {
            await dispatch("materials/loadMaterials",window.localStorage.getItem("workspace"), {root:true})
            await dispatch("sites/loadSites",window.localStorage.getItem("workspace"), {root:true})
            await api
                .request("get", "warehousematerials/?workspace=" + payload)
                .then(response => {
                    let warehouses = response.data.map( item => {
                        rootState.materials.materials.forEach(element => {
                            if(item.material == element.id){
                                item.material = element
                            }
                        });
                        rootState.sites.sites.forEach(element => {
                            if(item.site == element.id){
                                item.site = element
                            }
                        });
                        return item
                    });
                    commit('SET_WAREHOUSES', warehouses)
                });
        },
        addWarehouseMaterial({ commit, state, rootState }, payLoad) {
            api
                .request("post", "warehousematerials/", payLoad)
                .then(response => {
                    let warehouse = response.data;

                    rootState.materials.materials.forEach(element => {
                        if(warehouse.material == element.id){
                            warehouse.material = element
                        }
                    });
                    rootState.sites.sites.forEach(element => {
                        if(warehouse.site == element.id){
                            warehouse.site = element
                        }
                    });

                    commit('ADD_WAREHOUSE', warehouse)
                });
        },
        updateWarehouseMaterial({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "warehousematerials/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let warehouse = response.data;

                    rootState.materials.materials.forEach(element => {
                        if(warehouse.material == element.id){
                            warehouse.material = element
                        }
                    });
                    rootState.sites.sites.forEach(element => {
                        if(warehouse.site == element.id){
                            warehouse.site = element
                        }
                    });
                    commit('UPDATE_WAREHOUSE', warehouse)
                });
        },
        deleteWarehouseMaterial({commit}, payLoad){
            api
                .request("delete", "warehousematerials/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_WAREHOUSE', payLoad)
                });
        }
    },
    getters: {
        runningOut: (state) => {
            return state.warehouses.filter(warehouse => { return warehouse.running_out })
        }
    }
}