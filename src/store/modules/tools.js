
import api from "../../api";

export default {
    namespaced: true,
    state: {
        tool: {
            name: '',
            type: '',
            humanUuid: '',
            workspace: '',
        },
        tools: [],
        tool_types: []
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
        }
    },
    actions: {
        async loadToolTypes({ commit }) {
            await api
                .request("get", "tools_types/")
                .then(response => {
                    commit('SET_TOOL_TYPES', response.data)
                });
        },
        async loadTools({ dispatch, commit, state }) {
            await dispatch('loadToolTypes')
            await api
                .request("get", "tools/")
                .then(response => {
                    let tools = response.data.map(tool => {
                        state.tool_types.forEach(element => {
                            if(tool.type === element.id){
                                tool.type = element.type;
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
                            tool.type = element.type;
                        }
                    });

                    commit('ADD_TOOL', tool)
                });
        }
    }
}