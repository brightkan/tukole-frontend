
import api from "../../api";

export default {
    namespaced: true,
    state: {
        machine: {
            name: '',
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
        types: [],
        machines: [],
        listType: 'all',
        history: [],
        assignmentHistory: []
    },
    mutations: {
        SET_MACHINES(state, machines) {
            state.machines = machines
        },
        ADD_MACHINE(state, machine) {
            state.machines.push(machine)
        },
        CHANGE_LIST_TYPE(state, payLoad){
            state.listType = payLoad
        },
        DELETE_MACHINE(state, payload){
            var index = state.machines.findIndex(machine => machine.id === payload.id);
            state.machines.splice(index, 1);
        },
        UPDATE_MACHINE(state, payload){
            state.machines = state.machines.map(machine => {
                if (machine.id === payload.id) {
                    return Object.assign({}, machine, payload)
                }
                return machine
            })
        },
        ADD_TYPE(state, tool){
            state.types.push(tool);
        },
        DELETE_TYPE(state, payload){
            var index = state.types.findIndex(type => type.id === payload.id);
            state.types.splice(index, 1);
        },
        UPDATE_TYPE(state, payload){
            state.types = state.types.map(type => {
                if (type.id === payload.id) {
                    return Object.assign({}, type, payload)
                }
                return type
            })
        },
        SET_TYPES(state, types) {
            state.types = types
        },
        SET_HISTORY(state, payload){
            state.history = payload
        },
        ADD_HISTORY(state, payload){
            state.history.push(payload)
        },
        SET_ASSIGNMENT_HISTORY(state, payload){
            state.assignmentHistory = payload
        },
    },
    actions: {
        async loadTypes({ commit }) {
            await api
                .request("get", "machinery_types/")
                .then(response => {
                    commit('SET_TYPES', response.data)
                });
        },
        async loadMachines({ dispatch, commit, state, rootState }) {
            await dispatch('loadTypes')
            await api
                .request("get", "machinery/")
                .then(response => {
                    let machines = response.data.map(
                        machine => {
                            rootState.statuses.forEach(element => {
                                if(machine.status === element.name){
                                    machine.status = element;
                                }
                            });
                            return machine;
                        }
                    )
                    commit('SET_MACHINES', machines)
                });
        },
        addMachine({ commit, rootState }, payLoad) {
            api
                .request("post", "machinery/", payLoad)
                .then(response => {
                    let machine = response.data;

                    rootState.statuses.forEach(element => {
                        if(machine.status === element.name){
                            machine.status = element;
                        }
                    });

                    commit('ADD_MACHINE', machine)
                });
        },
        updateMachine({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "machinery/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let machine = response.data;
                    rootState.statuses.forEach(element => {
                        if(machine.status === element.name){
                            machine.status = element;
                        }
                    });
                    commit('UPDATE_MACHINE', machine)
                });
        },
        deleteMachine({commit}, payLoad){
            api
                .request("delete", "machinery/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_MACHINE', payLoad)
                });
        },
        deleteType({commit}, payLoad){
            api
                .request("delete", "machinery_types/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_TYPE', payLoad)
                });
        },
        updateType({ commit }, payLoad) {
            api
                .request("patch", "machinery_types/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let type = response.data;
                    commit('UPDATE_TYPE', type)
                });
        },
        addType({ commit, state }, payLoad) {
            api
                .request("post", "machinery_types/", payLoad)
                .then(response => {
                    let type = response.data;
                    commit('ADD_TYPE', type)
                });
        },
        getHistory({ commit, state }, payLoad) {
            api
                .request("get", "machinehistory/?machine="+payLoad)
                .then(response => {
                    let type = response.data;
                    commit('SET_ASSIGNMENT_HISTORY', type)
                });
        },
        getRepairHistory({ commit, state }, payLoad) {
            api
                .request("get", "repairhistory/?fleet="+payLoad.id+"&fleet_type="+payLoad.type)
                .then(response => {
                    let type = response.data;
                    commit('SET_HISTORY', type)
                });
        },

        saveFix({ dispatch, commit, state }, payLoad) {
            api
                .request("post", "repairhistory/", payLoad)
                .then(response => {
                    dispatch('updateMachine', {'id': payLoad.fleet, 'status': 'Available'})
                    let history = response.data;
                    commit('ADD_HISTORY', history)
                });

        },
    },
    getters: {
        available: state => state.machines.filter(item => { return item.status.name === 'available' }),
        assigned: state => state.machines.filter(item => { return item.status.name === 'assigned' }),
        brokenDown: state => state.machines.filter(item => { return item.status.name === 'broken_down' }),
        getMachines: (state, getters, rootState) => {
            if(state.listType === 'all'){
                return state.machines;
            }else{
                let machines = [];
                rootState.statuses.forEach(element => {
                    if(state.listType === element.name){
                        machines = state.machines.filter(item => {
                            return item.status.name === element.name;
                        });
                    }
                });
                return machines;
            }
        },
        faultHistory: (state, getters, rootState) => {
            return state.history.filter(item => { return item.type == 'fault_fix'})
        },
        assignmentHistory: (state, getters, rootState) => {
            return state.assignmentHistory
        }
    }
}