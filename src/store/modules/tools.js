
import api from "../../api";

export default {
    namespaced: true,
    state: {
        tool: {
            name: '',
            type: '',
            humanUuid: '',
            status: '',
            workspace: '',
        },
        type: {
            type: "",
            description: "",
            //workspace: '',
        },
        tools: [],
        tool_types: [],
        listType: 'all',
        history: []
    },
    mutations: {
        SET_TOOL_TYPES(state, tool_types) {
            state.tool_types = tool_types
        },
        SET_TOOLS(state, tools) {
            state.tools = tools
        },
        ADD_TOOL(state, tool) {
            state.tools.push(tool)
        },
        CHANGE_LIST_TYPE(state, payload){
            state.listType = payload
        },
        DELETE_TOOL(state, payload){
            var index = state.tools.findIndex(tool => tool.id === payload.id);
            state.tools.splice(index, 1);
        },
        UPDATE_TOOL(state, payload){
            state.tools = state.tools.map(tool => {
                if (tool.id === payload.id) {
                    return Object.assign({}, tool, payload)
                }
                return tool
            })
        },
        ADD_TYPE(state, tool){
            state.tool_types.push(tool);
        },
        DELETE_TYPE(state, payload){
            var index = state.tool_types.findIndex(type => type.id === payload.id);
            state.tool_types.splice(index, 1);
        },
        UPDATE_TYPE(state, payload){
            state.tool_types = state.tool_types.map(type => {
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
        async loadToolTypes({ commit }) {
            await api
                .request("get", "tools_types/")
                .then(response => {
                    commit('SET_TOOL_TYPES', response.data)
                });
        },
        async loadTools({ dispatch, commit, state, rootState }) {
            await dispatch('loadToolTypes')
            await api
                .request("get", "tools/")
                .then(response => {
                    let tools = response.data.map(tool => {

                        if(tool.status == null)
                            tool.status = 'Avialable'; 

                        state.tool_types.forEach(element => {
                            if(tool.type === element.id){
                                tool.type = element;
                            }
                        });

                        rootState.statuses.forEach(element => {
                            if(tool.status === element.name){
                                tool.status = element;
                            }
                        });
                        return tool;
                    })
                    commit('SET_TOOLS', tools)
                });
        },
        addTool({ commit, state }, payLoad) {
            api
                .request("post", "tools/", payLoad)
                .then(response => {
                    let tool = response.data;
                    state.tool_types.forEach(element => {
                        if(tool.type === element.id){
                            tool.type = element;
                        }
                    });

                    rootState.statuses.forEach(element => {
                        if(tool.status === element.name){
                            tool.status = element;
                        }
                    });

                    commit('ADD_TOOL', tool)
                });
        },
        addType({ commit, state }, payLoad) {
            api
                .request("post", "tools_types/", payLoad)
                .then(response => {
                    let type = response.data;
                    commit('ADD_TYPE', type)
                });
        },
        updateTool({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "tools/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let tool = response.data;

                    state.tool_types.forEach(element => {
                        if(tool.type === element.id){
                            tool.type = element;
                        }
                    });

                    rootState.statuses.forEach(element => {
                        if(tool.status === element.name){
                            tool.status = element;
                        }
                    });
                    commit('UPDATE_TOOL', tool)
                });
        },
        updateType({ commit }, payLoad) {
            api
                .request("patch", "tools_types/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let type = response.data;
                    commit('UPDATE_TYPE', type)
                });
        },
        deleteTool({commit}, payLoad){
            api
                .request("delete", "tools/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_TOOL', payLoad)
                });
        },
        deleteType({commit}, payLoad){
            api
                .request("delete", "tools_types/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_TYPE', payLoad)
                });
        },
        getHistory({ commit, state }, payLoad) {
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
                        reason: "Damaged handle. repaired the handle",
                        cost: "300",
                        created: "2018-10-29T09:51:24.282608Z"
                    },
                    {
                        id: 2,
                        type: "assignment",
                        reason: "Assigned to Katuula Joel",
                        cost: "",
                        created: "2018-10-29T09:51:24.282608Z"
                    },
                    {
                        id: 3,
                        type: "assignment",
                        reason: "Assigned to Katuula Joel",
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
                .request("post", "tool/fix", payLoad)
                .then(response => {
                    dispatch('updateFleet', {'id': payLoad.fleet.id, 'status': 'Avialable'})
                    let history = response.data;
                    commit('ADD_HISTORY', history)
                });

            dispatch('updateTool', {'id': payLoad.tool.id, 'status': 'Avialable'})
        },
    },
    getters: {
        available: state => state.tools.filter(item => { return item.status.name === 'Avialable' }),
        assigned: state => state.tools.filter(item => { return item.status.name === 'Assigned' }),
        brokenDown: state => state.tools.filter(item => { return item.status.name === 'Broken Down' }),
        getTools: (state, getters, rootState) => {
            if(state.listType === 'all'){
                return state.tools;
            }else{
                let tools = [];
                rootState.statuses.forEach(element => {
                    if(state.listType === element.name){
                        tools = state.tools.filter(item => {
                            return item.status.name === element.name;
                        });
                    }
                });
                return tools;
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