import api from "../api";
import _ from 'lodash'

export default {
    async loadUserWorkSpaces({ commit }) {
        let user = window.localStorage.getItem('user');
        const workspaces = await api.request("get", "/userworkspaces/?user=" + (JSON.parse(user)).user_id);
        const enrichedWorkspaces = await Promise.all(_.map(workspaces.data, async (workspace) => {
            const _workspace = await api.request("get", "workspaces/"+workspace.workspace+"/");
            return _workspace.data;
        }))
        commit('SET_WORKSPACES', enrichedWorkspaces)
    },

    getUser({ commit }, payload) {
        api
            .request("get", "users/"+payload+"/")
            .then(response => {
                let user = response.data
                commit('SET_USER', user)
            });
    }
}
