
import api from "../../api";

export default {
    namespaced: true,
    state: {
        fleet: {
            name: '',
            vehicle_type: '',
            uuid: '',
            humanUuid: '',
            status: '',
            workspace: ''
        },
        fleets: [],
        fleet_types: []
    },
    mutations: {
        SET_FLEET_TYPES(state, fleet_types) {
            state.fleet_types = fleet_types
        },
        SET_FLEETS(state, fleets) {
            state.fleets = fleets
        },
        ADD_FLEET(state, fleet) {
            state.fleets.push(fleet)
        }
    },
    actions: {
        async loadFleetTypes({ commit }) {
            await api
                .request("get", "fleet_types/")
                .then(response => {
                    commit('SET_FLEET_TYPES', response.data)
                });
        },
        async loadFleets({ dispatch, commit, state, rootState }) {
            await dispatch('loadFleetTypes')
            await api
                .request("get", "fleets/")
                .then(response => {
                    let fleets = response.data.map(fleet => {
                        state.fleet_types.forEach(element => {
                            if(fleet.vehicle_type === element.id){
                                fleet.vehicle_type = element.type;
                            }
                        });
                        rootState.statuses.forEach(element => {
                            if(fleet.status === element.name){
                                fleet.status = element;
                            }
                        });
                        return fleet;
                    })
                    commit('SET_FLEETS', fleets)
                });
        },
        addFleet({ commit, state }, payLoad) {
            api
                .request("post", "fleets/", payLoad)
                .then(response => {
                    let fleet = response.data;
                    state.fleet_types.forEach(element => {
                        if(fleet.vehicle_type === element.id){
                            fleet.vehicle_type = element.type;
                        }
                    });

                    commit('ADD_FLEET', fleet)
                });
        }
    }
}