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
        manholes: [],
        assignedManholes: [],
        currentAssignedManholes: [],
        loading: false,
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
        },
        ADD_ASSIGNED_MANHOLE(state, payload) {
            state.assignedManholes.push(payload)
        },
        SET_ASSIGNED_MANHOLES(state, payload){
            state.assignedManholes = payload
        },
        SET_CURRENT_ASSIGNED_MANHOLES(state, payload){
            state.currentAssignedManholes = payload
        },
        CHANGE_LOADING(state, payload){
            state.loading = payload
        }
    },
    actions: {
        async getUserAssignedManholes({ commit, state }, payload){
            await api
                .request("get", "manholesassignment/all/?user="+payload)
                .then(response => {
                    let manholes = response.data.map(item => {
                        state.manholes.forEach(element => {
                            if(item.manhole == element.id){
                                item.manhole = element.number
                            }
                        })
                        return item
                    });

                    commit('SET_ASSIGNED_MANHOLES', manholes)
                });
        },
        async loadCurrentManHoles({ commit, state }, payload) {
            await api
                .request("get", "manholesassignment/?user="+payload)
                .then(response => {
                    let manholes = response.data.map(item => {
                        state.manholes.forEach(element => {
                            if(item.manhole == element.id){
                                item.manhole = element.number
                            }
                        })
                        return item
                    });
                    
                    commit('SET_CURRENT_ASSIGNED_MANHOLES', manholes)
                });
        },
        async loadUsers({ dispatch, commit, rootState }, payload) {
            await api
                .request("get", "users/?workspace="+payload)
                .then(response => {
                    let users = response.data
                    
                    users.filter(item => { 
                        /* if(item.role === 'ofc'){
                            dispatch("loadCurrentManHoles", item.id);
                        } */
                        return item.role === 'ofc' 
                    })

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
            api
                .request("post", "manholes/"+payload.manhole+"/assign/", payload)
                .then(response => {
                    let manhole = response.data

                    state.manholes.forEach(item => {
                        if(manhole.manhole == item.id){
                            manhole.manhole = item.number
                        }
                    })

                    commit('ADD_ASSIGNED_MANHOLE', manhole)
                });
        },
        massAssignManholes({ dispatch, commit, rootState }, payload){
            commit('CHANGE_LOADING', true)
            api
                .request("post", "manholes/assginimport/", payload)
                .then(response => {
                    commit('CHANGE_LOADING', false)
                    //dispatch('manholes/loadloadCurrentManHole', {root:true})
                });
        },
        massAddManholes({ dispatch, commit, rootState }, payload){
            commit('CHANGE_LOADING', true)
            api
                .request("post", "manholes/import/", payload)
                .then(response => {
                    commit('CHANGE_LOADING', false)
                    dispatch('manholes/loadManholes', {root:true})
                });
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
            return state.users.filter(item => { return item.role === 'ofc' }).map(element => {
                element.assignManholes = [];
                state.assignedManholes.forEach(manholeEntry => {
                    if(manholeEntry.user === element.id){
                        element.assignManholes.push(manholeEntry.manhole)
                    }
                })
                return element;
            })
        },
        getUser: (state) => (userId) => {
            let users = state.users.filter(item => { return item.id == userId})
            return users[0]
        },
        getUserCurrentManholes: (state) => (userId) => {
            return state.currentAssignedManholes.filter(manholeEntry => {return manholeEntry.user == userId})
        },
        getUsersByType: (state) => (type) => {
            return state.users.filter(user => { return user.role == type })
        },
        getUserPreviousManholes: (state) => (userId) => {

            var filterManholes = []

            state.assignedManholes.forEach(manhole => {
                let accepted = true;
                state.currentAssignedManholes.forEach(current => {
                    
                    if(current.manhole == manhole.manhole){
                        accepted = false;
                    }
                })

                if(accepted){
                    filterManholes.push(manhole)
                } 
            })

            return filterManholes.filter(manholeEntry => {return manholeEntry.user == userId})
        },
        getCompanyUsers: (state) => (company) => {
            return state.users.filter(user => { return user.company == company })
        },
        getAdminUsers: (state) => {
            return state.users.filter(user => { return user.company == null })
        }
    }
}