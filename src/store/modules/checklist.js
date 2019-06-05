
import api from "../../api";

export default {
    namespaced: true,
    state: {
        checklistItem: {
            name: ""
        },
        checklist: [],
        checklistResults: [],
    },
    mutations: {
        SET_CHECKLIST_RESULT(state, payload) {
            state.checklistResults = payload
        },
        SET_CHECKLIST(state, payload) {
            state.checklist = payload
        },
        ADD_CHECKLIST_ITEM(state, payload) {
            state.checklist.push(payload)
        },
        DELETE_CHECKLIST_ITEM(state, payload){
            var index = state.checklist.findIndex(item => item.id === payload.id);
            state.checklist.splice(index, 1);
        },
        UPDATE_CHECKLIST_ITEM(state, payload){
            state.checklist = state.checklist.map(item => {
                if (item.id === payload.id) {
                    return Object.assign({}, item, payload)
                }
                return item
            })
        }
    },
    actions: {
        async loadChecklist({ dispatch, commit, state, rootState }) {
            await api
                .request("get", "fleetchecklistitems/?workspace=" + window.localStorage.getItem("workspace"))
                .then(response => {
                    let checklist = response.data
                    commit('SET_CHECKLIST', checklist)
                });
        },
        async loadChecklistResults({ dispatch, commit, state, rootState }) {
            await api
                .request("get", "fleetchecklistresults/")
                .then(response => {
                    let result = []
                    response.data.forEach(element => {
                        state.checklist.forEach(item => {
                            if(item.id == element.fleet_check_list_item){
                                result.push({"created": element.created, "request_object_id": element.request_object_id, "status": element.status, "checklist": item })
                            }
                        })
                    });
                    commit('SET_CHECKLIST_RESULT', result)
                });
        },
        addChecklistItem({ commit, state, rootState }, payLoad) {
            api
                .request("post", "fleetchecklistitems/", payLoad)
                .then(response => {
                    commit('ADD_CHECKLIST_ITEM', response.data)
                });
        },
        updateChecklistItem({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "fleetchecklistitems/"+payLoad.id+"/", payLoad)
                .then(response => {
                    commit('UPDATE_CHECKLIST_ITEM', response.data)
                });
        },
        deleteChecklistItem({commit}, payLoad){
            api
                .request("delete", "fleetchecklistitems/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_CHECKLIST_ITEM', payLoad)
                });
        }
    }
}