
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
        listType: 'all'
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
                            /* state.types.forEach(element => {
                                if(machine.type === element.id){
                                    machine.type = element;
                                }
                            }); */

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
        }
    },
    getters: {
        available: state => state.machines.filter(item => { return item.status.name === 'Avialable' }),
        assigned: state => state.machines.filter(item => { return item.status.name === 'Assigned' }),
        brokenDown: state => state.machines.filter(item => { return item.status.name === 'Broken Down' }),
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
        }
    }
}