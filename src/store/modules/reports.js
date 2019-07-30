
import api from "../../api";

export default {
    namespaced: true,
    state: {
        reinstallations: [],
        trenchDistances: [],
        roadCrossings: [],
        manholeInstallations: [],

        activities: []
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

        SET_ACTIVITIES(state, payLoad) {
            state.activities = payLoad
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
        },
        async loadActivities({dispatch, commit, state, rootState}, payload){
            await dispatch("users/loadUsers", window.localStorage.getItem("workspace"), { root: true });
            await api
                .request("get", "activity/?site=" + payload)
                .then(response => {
                    let mappedActivity = []

                    response.data.forEach(activity => {
                        rootState.users.users.forEach(user => {
                            if(user.id == activity.user){
                                mappedActivity.push({"user": user, "title": activity.title, "description": activity.description, "start_time": activity.start_time, "end_time": activity.end_time, "duration": activity.duration, "created": activity.created, "image": activity.image})
                            }
                        })
                    })
                    commit('SET_ACTIVITIES', mappedActivity)
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
                    if (element.material == material.id) {
                        mat = material
                    }
                })

                if (mat != null) {
                    reports.push({
                        "index": index, "created": element.created, "message": "Reinstallation with " + element.amount
                            + " " + mat.measurement ? mat.measurement : '' + " of " + mat.name
                    })
                    index++;
                }
            });

            state.roadCrossings.forEach(element => {
                let toolUsed = null;
                rootState.tools.tools.forEach(tool => {
                    if (element.tool == tool.id) {
                        toolUsed = tool
                    }
                })
                if (toolUsed != null) {
                    reports.push({
                        "index": index, "created": element.created, "message": "Road crossing of " + element.distance_crossed
                            + " meters with " + toolUsed.name
                    })
                    index++;
                }
            });

            state.trenchDistances.forEach(element => {
                reports.push({
                    "index": index, "created": element.created, "message": "Trenched " + element.distance
                        + " meters at depth of " + element.depth + " meters"
                })
                index++;
            });

            state.manholeInstallations.forEach(element => {
                console.log(element)
                reports.push({
                    "index": index, "created": element.created, "message": "Installed " + element.number_installed
                        + " manholes "
                })
                index++;
            });

            reports.sort(function (a, b) {
                return new Date(b.created) - new Date(a.created);
            });

            return reports
        }
    }
}