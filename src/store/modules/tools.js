
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
        history: [],
        assignmentHistory: [],
        toolAssignments: []
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
        ADD_TOOL_ASSIGNMENT(state, payload) {
            state.toolAssignments.push(payload)
        },
        SET_TOOL_ASSIGNMENTS(state, payload) {
            state.toolAssignments = payload
        },
        DELETE_TOOL_ASSIGNMENT(state, payload){
            var index = state.toolAssignments.findIndex(toolAssignment => toolAssignment.id === payload.id);
            state.toolAssignments.splice(index, 1);
        },
        UPDATE_TOOL_ASSIGNMENT(state, payload){
            state.toolAssignments = state.toolAssignments.map(toolAssignment => {
                if (toolAssignment.id === payload.id) {
                    return Object.assign({}, toolAssignment, payload)
                }
                return toolAssignment
            })
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
        SET_ASSIGNMENT_HISTORY(state, payload){
            state.assignmentHistory = payload
        }
    },
    actions: {
        async loadToolTypes({ commit }) {
            await api
                .request("get", "tools_types/?workspace=" + window.localStorage.getItem("workspace"))
                .then(response => {
                    commit('SET_TOOL_TYPES', response.data)
                });
        },
        async loadTools({ dispatch, commit, state, rootState }) {
            await dispatch('loadToolTypes')
            await api
                .request("get", "tools/?workspace=" + window.localStorage.getItem("workspace"))
                .then(response => {
                    let tools = response.data.map(tool => {

                        if(tool.status == null)
                            tool.status = 'Available'; 

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
        addTool({ commit, state, rootState }, payLoad) {
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
            console.log(payLoad)
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
            api
                .request("get", "toolhistory/?tool="+payLoad)
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
                    dispatch('updateTool', {'id': payLoad.fleet, 'status': 'available'})
                    let history = response.data;
                    commit('ADD_HISTORY', history)
                });
        },
        loadToolAssignments({ commit, state }, payLoad){
            api
                .request("get", "toolsassignments/" )
                .then(response => {
                    commit('SET_TOOL_ASSIGNMENTS', response.data)
                });
        },
        updateToolAssignment({ commit, state }, payLoad){
            api
                .request("patch", "toolsassignments/"+payLoad.id+"/", payLoad)
                .then(response => {
                    commit('UPDATE_TOOL_ASSIGNMENT', response.data)
                });
        },
        addToolAssignment({ commit, state }, payLoad){
            api
                .request("post", "toolsassignments/", payLoad)
                .then(response => {
                    commit('ADD_TOOL_ASSIGNMENT', response.data)
                });
        },
        deleteToolAssignment({ commit, state }, payLoad){
            api
                .request("delete", "toolsassignments/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_TOOL_ASSIGNMENT', payLoad)
                });
        }
    },
    getters: {
        available: state => state.tools.filter(item => { return item.status.name === 'available' }),
        assigned: state => state.tools.filter(item => { return item.status.name === 'assigned' }),
        brokenDown: state => state.tools.filter(item => { return item.status.name === 'broken_down' }),
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
            return state.assignmentHistory
        },
        getToolAssignments: (state, getters, rootState) => {
            return state.toolAssignments.map(item => {
                let data = item
                rootState.users.users.forEach(user => {
                    if(data.user == user.id){
                        data.username = user.first_name + " " + user.last_name
                    }
                })
                rootState.tools.tools.forEach(tool => {
                    if(data.tool == tool.id){
                        data.toolname = tool.name 
                    }
                })
                return data
            })
        }
    }
}