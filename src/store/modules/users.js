import api from "../../api";

export default {
    namespaced: true,
    state: {
        user: {
            // user object
        },
        users: [],
        listType: 'all',
        listTypes: [
            'admin', 'super_admin', 'client', 'warehouse_manager', 'fleet_manager', 'project_manager', 'osp', 'isp', 'ofc'
        ],
        manholes: []
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },
        ADD_USER(state, user) {
            state.users.push(user)
        },
        CHANGE_LIST_TYPE(state, payLoad){
            state.listType = payLoad
        },
        DELETE_USER(state, payload){
            var index = state.users.findIndex(user => user.id === payload.id);
            state.users.splice(index, 1);
        },
        UPDATE_USER(state, payload){
            state.users = state.users.map(user => {
                if (user.id === payload.id) {
                    return Object.assign({}, user, payload)
                }
                return user
            })
        },
        SET_MANHOLES(state, payload) {
            state.manholes = payload
        }
    },
    actions: {
        async loadUsers({ commit, rootState }, payload) {
            await api
                .request("get", "users/?workspace="+payload)
                .then(response => {
                    let users = response.data
                    
                    commit('SET_USERS', users)
                });
        },
        addUser({ commit, rootState }, payLoad) {
            api
                .request("post", "users/", payLoad)
                .then(response => {
                    let user = response.data;

                    commit('ADD_USER', user)
                });
        },
        inviteUser({ commit, rootState }, payLoad) {
            api
                .request("post", "users/invite/", payLoad)
                .then(response => {
                    let user = response.data;

                    commit('ADD_USER', user)
                });
        },
        updateUser({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "users/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let user = response.data;
                    
                    commit('UPDATE_USER', user)
                });
        },
        deleteUser({commit}, payLoad){
            api
                .request("delete", "users/"+payLoad.id+"/")
                .then(() => {
                    commit('DELETE_USER', payLoad)
                });
        },
        loadManHoles({ commit, rootState }, payload) {
            api
                .request("get", "manholes/")
                .then(response => {
                    let manholes = response.data
                    
                    commit('SET_MANHOLES', manholes)
                });
        },
        assignManhole({ commit, state, rootState }, payload) {
            console.log(payload.user)
            console.log(payload.manhole)

            //make api call
            state.users = state.users.map(user => {
                if (user.id === payload.user.id) {
                    if(user.manholes){
                        payload.user.manholes = user.manholes.push(payload.manhole)
                    }else{
                        payload.user.manholes = [payload.manhol]
                    }
                    
                    return Object.assign({}, user, payload.user)
                }
                return user
            })

        },
    },
    getters: {
        getUsers: (state) => {
            if(state.listType === 'all'){
                return state.users;
            }else{
                let users = [];
                state.listTypes.forEach(element => {
                    if(state.listType === element){
                        users = state.users.filter(item => {
                            return item.type === element;
                        });
                    }
                });
                return users;
            }
        },
        userCount: (state) => (payload) => {
            return state.users.filter(item => { return item.type === payload }).length
        },
        getOFCUsers: (state) => {
            return state.users.filter(item => { return item.role === 'ofc' })
        },
    }
}