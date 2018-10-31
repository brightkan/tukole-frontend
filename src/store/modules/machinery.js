
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
        machines: []
    },
    mutations: {
        SET_MACHINES(state, machines) {
            state.machines = machines
        },
        ADD_MACHINE(state, machine) {
            state.machines.push(machine)
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
        addMachine({ commit, state }, payLoad) {
            api
                .request("post", "machinery/", payLoad)
                .then(response => {
                    let machine = response.data;

                    commit('ADD_MACHINE', machine)
                });
        }
    }
}