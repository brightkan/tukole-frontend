
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
        }
    },
    actions: {
        loadMachines({ commit, rootState }) {
            api
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
        }
    },
    getters: {
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