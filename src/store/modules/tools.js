
import api from "../../api";

export default {
    state: {
        tool: {
            name: '',
            type: '',
            humanUuid: ''
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
        loadToolTypes({ commit }) {
            api
                .request("get", "tools_types/")
                .then(response => {
                    commit('SET_TOOL_TYPES', response.data)
                });
        },
        loadTools({ commit }) {
            api
                .request("get", "tools/")
                .then(response => {
                    commit('SET_TOOLS', response.data)
                });
        },
        addTool({ commit }, payLoad) {
            api
                .request("post", "tools/", payLoad)
                .then(response => {
                    commit('ADD_TOOL', response.data)
                });
        }
    }
}