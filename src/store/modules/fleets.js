
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
        type: {
            type: "",
            description: "",
            //workspace: '',
        },
        fleets: [],
        fleet_types: [],
        listType: 'all',
        history: []
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
        },
        CHANGE_LIST_TYPE(state, payload){
            state.listType = payload
        },
        DELETE_FLEET(state, payload){
            var index = state.fleets.findIndex(fleet => fleet.id === payload.id);
            state.fleets.splice(index, 1);
        },
        UPDATE_FLEET(state, payload){
            state.fleets = state.fleets.map(fleet => {
                if (fleet.id === payload.id) {
                    return Object.assign({}, fleet, payload)
                }
                return fleet
            })
        },
        ADD_TYPE(state, tool){
            state.fleet_types.push(tool);
        },
        DELETE_TYPE(state, payload){
            var index = state.fleet_types.findIndex(type => type.id === payload.id);
            state.fleet_types.splice(index, 1);
        },
        UPDATE_TYPE(state, payload){
            state.fleet_types = state.fleet_types.map(type => {
                if (type.id === payload.id) {
                    return Object.assign({}, type, payload)
                }
                return type
            })
        },
        SET_HISTORY(state, payload){
            state.history = payload
        },
        ADD_HISTORY(state, payload){
            state.history.push(payload)
        },
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
                                fleet.vehicle_type = element;
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
        addFleet({ commit, state, rootState }, payLoad) {
            api
                .request("post", "fleets/", payLoad)
                .then(response => {
                    let fleet = response.data;
                    state.fleet_types.forEach(element => {
                        if(fleet.vehicle_type === element.id){
                            fleet.vehicle_type = element;
                        }
                    });
                    rootState.statuses.forEach(element => {
                        if(fleet.status === element.name){
                            fleet.status = element;
                        }
                    });
                    commit('ADD_FLEET', fleet)
                });
        },
        updateFleet({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "fleets/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let fleet = response.data;
                    state.fleet_types.forEach(element => {
                        if(fleet.vehicle_type === element.id){
                            fleet.vehicle_type = element;
                        }
                    });
                    rootState.statuses.forEach(element => {
                        if(fleet.status === element.name){
                            fleet.status = element;
                        }
                    });
                    commit('UPDATE_FLEET', fleet)
                });
        },
        deleteFleet({commit}, payLoad){
            api
                .request("delete", "fleets/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_FLEET', payLoad)
                });
        },
        deleteType({commit}, payLoad){
            api
                .request("delete", "fleet_types/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_TYPE', payLoad)
                });
        },
        updateType({ commit }, payLoad) {
            api
                .request("patch", "fleet_types/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let type = response.data;
                    commit('UPDATE_TYPE', type)
                });
        },
        addType({ commit, state }, payLoad) {
            api
                .request("post", "fleet_types/", payLoad)
                .then(response => {
                    let type = response.data;
                    commit('ADD_TYPE', type)
                });
        },
        getFleetHistory({ commit, state }, payLoad) {
            /* api
                .request("post", "fleet_history/", payLoad)
                .then(response => {
                    let type = response.data;
                    commit('SET_HISTORY', type)
                }); */

                commit('SET_HISTORY', [
                    {
                        id: 1,
                        type: "fault_fix",
                        reason: "punctured front tires. I had to buy new tires and replace them the faulty ones",
                        cost: "2000",
                        created: "2018-10-29T09:51:24.282608Z"
                    },
                    {
                        id: 2,
                        type: "fault_fix",
                        reason: "Damaged brakes, brake pads where worn out. got new ones for all the four wheels",
                        cost: "300",
                        created: "2018-10-29T09:51:24.282608Z"
                    },
                    {
                        id: 3,
                        type: "assignment",
                        reason: "Assigned to Joel Tunga",
                        cost: "",
                        created: "2018-10-29T09:51:24.282608Z"
                    },
                    {
                        id: 4,
                        type: "assignment",
                        reason: "Assigned to Katuula Joel",
                        cost: "",
                        created: "2018-10-29T09:51:24.282608Z"
                    }
                ])
        },
        saveFix({ dispatch, commit, state }, payLoad) {
            api
                .request("post", "fleet/fix", payLoad)
                .then(response => {
                    dispatch('updateFleet', {'id': payLoad.fleet.id, 'status': 'Avialable'})
                    let history = response.data;
                    commit('ADD_HISTORY', history)
                });

            dispatch('updateFleet', {'id': payLoad.fleet.id, 'status': 'Avialable'})
        },
    },
    getters: {
        totalVehicles: state => state.fleets.length,
        availableVehicles: state => state.fleets.filter(item => { return item.status.name === 'Avialable' }),
        assignedVehicles: state => state.fleets.filter(item => { return item.status.name === 'Assigned' }),
        brokenDownVehicles: state => state.fleets.filter(item => { return item.status.name === 'Broken Down' }),
        getFleets: (state, getters, rootState) => {
            if(state.listType === 'all'){
                return state.fleets;
            }else{
                let fleets = [];
                rootState.statuses.forEach(element => {
                    if(state.listType === element.name){
                        fleets = state.fleets.filter(item => {
                            return item.status.name === element.name;
                        });
                    }
                });
                return fleets;
            }
        },
        faultHistory: (state, getters, rootState) => {
            return state.history.filter(item => { return item.type == 'fault_fix'})
        },
        assignmentHistory: (state, getters, rootState) => {
            return state.history.filter(item => { return item.type == 'assignment'})
        }
    }
}