
import api from "../../api";

export default {
    namespaced: true,
    state: {
        reinstallations: [],
        trenchDistances: [],
        roadCrossings: [],
        manholeInstallations: [],
    },
    mutations: {
        SET_REINSTALLATIONS(state, payLoad) {
            state.reinstallations = payLoad
        },
        SET_TRENCH_DISTANCES(state, payLoad) {
            state.trenchDistances = payLoad
        },
        SET_ROAD_CROSSING(state, payLoad) {
            state.roadCrossings = payLoad
        },
        SET_MANHOLE_INSTALLATION(state, payLoad) {
            state.manholeInstallations = payLoad
        },
    },
    actions: {
        async loadReports({ commit }, payLoad) {
            await api
                .request("get", "reinstallation/?site=" + payLoad)
                .then(response => {
                    commit('SET_REINSTALLATIONS', response.data)
                });

                await api
                .request("get", "roadcrossing/?site=" + payLoad)
                .then(response => {
                    commit('SET_ROAD_CROSSING', response.data)
                });

                await api
                .request("get", "distance/trenched/?site=" + payLoad)
                .then(response => {
                    commit('SET_TRENCH_DISTANCES', response.data)
                });

                await api
                .request("get", "manholesinstallation/?site=" + payLoad)
                .then(response => {
                    commit('SET_MANHOLE_INSTALLATION', response.data)
                });
        }
    },
    getters: {
        getReports: (state, getters, rootState) => {
            let reports = [];
            let index = 0
            state.reinstallations.forEach(element => {
                let mat = null;
                rootState.materials.materials.forEach(material => {
                    if(element.material == material.id){
                        mat = material
                    }
                })

                if(mat != null){
                    reports.push({"index": index, "created": element.created, "message": "Reinstallation with " + element.amount 
                                + " " + mat.measurement ? mat.measurement : '' + " of " + mat.name })
                    index++;
                }
            });

            state.roadCrossings.forEach(element => {
                let toolUsed = null;
                rootState.tools.tools.forEach(tool => {
                    if(element.tool == tool.id){
                        toolUsed = tool
                    }
                })
                if(toolUsed != null){
                    reports.push({"index": index, "created": element.created, "message": "Road crossing of " + element.distance_crossed 
                                + " meters with " + toolUsed.name })
                    index++;
                }
            });

            state.trenchDistances.forEach(element => {
                reports.push({"index": index, "created": element.created, "message": "Trenched " + element.distance 
                                + " meters at depth of " + element.depth + " meters"})
                index++;
            });

            state.manholeInstallations.forEach(element => {
                console.log(element)
                reports.push({"index": index, "created": element.created, "message": "Installed " + element.number_installed 
                                + " manholes "})
                index++;
            });

            reports.sort(function(a,b){
                return new Date(b.created) - new Date(a.created);
            });

            return reports
        }
    }
}