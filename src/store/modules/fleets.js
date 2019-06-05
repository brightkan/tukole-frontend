
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
        history: [],
        assignmentHistory: []
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
        CHANGE_LIST_TYPE(state, payload) {
            state.listType = payload
        },
        DELETE_FLEET(state, payload) {
            var index = state.fleets.findIndex(fleet => fleet.id === payload.id);
            state.fleets.splice(index, 1);
        },
        UPDATE_FLEET(state, payload) {
            state.fleets = state.fleets.map(fleet => {
                if (fleet.id === payload.id) {
                    return Object.assign({}, fleet, payload)
                }
                return fleet
            })
        },
        ADD_TYPE(state, tool) {
            state.fleet_types.push(tool);
        },
        DELETE_TYPE(state, payload) {
            var index = state.fleet_types.findIndex(type => type.id === payload.id);
            state.fleet_types.splice(index, 1);
        },
        UPDATE_TYPE(state, payload) {
            state.fleet_types = state.fleet_types.map(type => {
                if (type.id === payload.id) {
                    return Object.assign({}, type, payload)
                }
                return type
            })
        },
        SET_HISTORY(state, payload) {
            state.history = payload
        },
        ADD_HISTORY(state, payload) {
            state.history.push(payload)
        },
        SET_ASSIGNMENT_HISTORY(state, payload) {
            state.assignmentHistory = payload
        }
    },
    actions: {
        async loadFleetTypes({ commit }) {
            await api
                .request("get", "fleet_types/?workspace=" + window.localStorage.getItem("workspace"))
                .then(response => {
                    commit('SET_FLEET_TYPES', response.data)
                });
        },
        async loadFleets({ dispatch, commit, state, rootState }) {
            await dispatch('loadFleetTypes')
            await api
                .request("get", "fleets/?workspace=" + window.localStorage.getItem("workspace"))
                .then(response => {
                    let fleets = response.data.map(fleet => {
                        state.fleet_types.forEach(element => {
                            if (fleet.vehicle_type === element.id) {
                                fleet.vehicle_type = element;
                            }
                        });
                        rootState.statuses.forEach(element => {
                            if (fleet.status === element.name) {
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
                        if (fleet.vehicle_type === element.id) {
                            fleet.vehicle_type = element;
                        }
                    });
                    rootState.statuses.forEach(element => {
                        if (fleet.status === element.name) {
                            fleet.status = element;
                        }
                    });
                    commit('ADD_FLEET', fleet)
                });
        },
        updateFleet({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "fleets/" + payLoad.id + "/", payLoad)
                .then(response => {
                    let fleet = response.data;
                    state.fleet_types.forEach(element => {
                        if (fleet.vehicle_type === element.id) {
                            fleet.vehicle_type = element;
                        }
                    });
                    rootState.statuses.forEach(element => {
                        if (fleet.status === element.name) {
                            fleet.status = element;
                        }
                    });
                    commit('UPDATE_FLEET', fleet)
                });
        },
        deleteFleet({ commit }, payLoad) {
            api
                .request("delete", "fleets/" + payLoad.id + "/")
                .then(() => {
                    commit('DELETE_FLEET', payLoad)
                });
        },
        deleteType({ commit }, payLoad) {
            api
                .request("delete", "fleet_types/" + payLoad.id + "/")
                .then(() => {
                    commit('DELETE_TYPE', payLoad)
                });
        },
        updateType({ commit }, payLoad) {
            api
                .request("patch", "fleet_types/" + payLoad.id + "/", payLoad)
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
        async getHistory({ dispatch, commit, state }, payLoad) {
            await dispatch("checklist/loadChecklist", {}, { root: true });
            await dispatch("checklist/loadChecklistResults", {}, { root: true });
            await api
                .request("get", "userfleetsassignments/")
                .then(response => {
                    let type = response.data;
                    commit('SET_ASSIGNMENT_HISTORY', type)
                });
        },
        getRepairHistory({ commit, state }, payLoad) {
            /* api
                .request("get", "repairhistory/?fleet="+payLoad.id+"&fleet_type="+payLoad.type)
                .then(response => {
                    let type = response.data;
                    commit('SET_HISTORY', type)
                }); */

            api
                .request("get", "repairticket/")
                .then(response => {
                    let type = response.data;
                    commit('SET_HISTORY', type)
                });
        },

        saveFix({ dispatch, commit, state }, payLoad) {
            api
                .request("post", "repairhistory/", payLoad)
                .then(response => {
                    dispatch('updateFleet', { 'id': payLoad.fleet, 'status': 'available' })
                    let history = response.data;
                    commit('ADD_HISTORY', history)
                });
        },
    },
    getters: {
        totalVehicles: state => state.fleets.length,
        availableVehicles: state => state.fleets.filter(item => { return item.status.name === 'available' }),
        assignedVehicles: state => state.fleets.filter(item => { return item.status.name === 'assigned' }),
        brokenDownVehicles: state => state.fleets.filter(item => { return item.status.name === 'broken_down' }),
        getFleets: (state, getters, rootState) => {
            if (state.listType === 'all') {
                return state.fleets;
            } else {
                let fleets = [];
                rootState.statuses.forEach(element => {
                    if (state.listType === element.name) {
                        fleets = state.fleets.filter(item => {
                            return item.status.name === element.name;
                        });
                    }
                });
                return fleets;
            }
        },
        faultHistory: (state, getters, rootState) => (id, type) =>{
            console.log(state.history.filter(item => { return item.object_id == id && item.type == type }))
            return state.history.filter(item => { return item.object_id == id && item.type == type })
        },
        assignmentHistory: (state, getters, rootState) => (id) => {
            let history = state.assignmentHistory.filter(item => {
                return item.object_id === id
            })

            let mappedHistory = []
            history.forEach(item => {
                rootState.users.users.forEach(user => {
                    if (item.user == user.id) {
                        let checklistResult = []
                        rootState.checklist.checklistResults.forEach(listItem => {
                            if (listItem.request_object_id == item.id) {
                                checklistResult.push(listItem)
                            }
                        })

                        let checklistResultBefore = checklistResult.filter(listItem => listItem.status == "before")
                        let checklistResultAfter = checklistResult.filter(listItem => listItem.status == "after")

                        mappedHistory.push({ "checklistResultBefore": checklistResultBefore, "checklistResultAfter": checklistResultAfter, "id": item.id, "assigned_to": user.first_name + " " + user.last_name, "from": item.start_date, "to": item.end_date, "status": item.status })
                    }
                })
            })
            return mappedHistory
        }
    }
}