
import api from "../api";

export default {
    loadToolTypes({ commit }) {
        api
            .request("get", "tools_types/")
            .then(tool_types => {
                commit('SET_TOOL_TYPES', tool_types)
            });
    },
    loadTools({ commit }) {
        api
            .request("get", "tools/")
            .then(response => {
                commit('SET_TOOLS', response.data)
            });
    }
}
