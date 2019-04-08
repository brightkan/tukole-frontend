
import api from "../../api";

export default {
    namespaced: true,
    state: {
        fuelRequest: {
            object_id: 1,
            user: 3,
            requested_fuel_in_litres: 0,
            received_fuel_in_litres: 0,
            mileage_at_fuelling_time: 0,
            status: 0,
            refuel_reject_reason: "",
            created: "",
            approved: false,
            fuel_amount: 0,
            pump_screenshot: null,
            type: "",
            type_entity_object: null,
            allow_full_tank: false,
            humanUuid: null
        },
        fuelRequests: [],
        summary: {
            fleet: 0,
            machine: 0,
            user: 0
        }
    },
    mutations: {
        SET_FUEL_REQUESTS(state, fuelRequests) {
            state.fuelRequests = fuelRequests
        },
        SET_FLEET_SUMMARY(state, summary) {
            state.summary.fleet = summary
        },
        SET_MACHINE_SUMMARY(state, summary) {
            state.summary.machine = summary
        },
        SET_USER_SUMMARY(state, summary) {
            state.summary.user = summary
        }
    },
    actions: {
        loadSummary({ commit }, payload){
            api
                .request("post", "fleetfuelrequest/summary/", payload)
                .then(response => {
                    let value = response.data
                    if(payload.type == 'fleet'){
                        commit('SET_FLEET_SUMMARY', value.total)
                    }else if(payload.type == 'machine'){
                        commit('SET_MACHINE_SUMMARY', value.total)
                    }else{
                        commit('SET_USER_SUMMARY', value.total)
                    }
                });
        },
        loadFuelRequests({ commit }, payload) {
            api
                .request("get", "fleetfuelrequest/?type="+ payload.page +"&&created__gte=" + payload.end + "&&created__lt=" + payload.start)
                .then(response => {
                    commit('SET_FUEL_REQUESTS', response.data)
                });
        }
    },
    getters: {
        getSummary: (state) => {
            return state.summary
        }
    }
}