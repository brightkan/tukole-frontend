import api from "../../api";

export default {
    namespaced: true,
    state: {
        notification: {
            id: "",
            user: "",
            notification: "",
            read: false,
            created: ""
        },
        notifications: [],
    },
    mutations: {
        SET_NOTIFICATIONS(state, notifications) {
            state.notifications = notifications
        },
        UPDATE_NOTIFICATION(state, payload){
            state.notifications = state.notifications.map(notification => {
                if (notification.id === payload.id) {
                    return Object.assign({}, notification, payload)
                }
                return notification
            })
        }
    },
    actions: {
        async loadNotifications({ commit, rootState }, payload) {
            await api
                .request("get", "notifications/?user="+payload)
                .then(response => {
                    let notifications = response.data
                    
                    commit('SET_NOTIFICATIONS', notifications)
                });
        },
        updateNotification({ commit, state, rootState }, payLoad) {
            api
                .request("patch", "notifications/"+payLoad.id+"/", payLoad)
                .then(response => {
                    let notifications = response.data;
                    
                    commit('UPDATE_NOTIFICATION', notifications)
                });
        }
    },
    getters: {
        getReadNotifications: (state) => {
            return state.notifications.filter(item => item.read);
        },
        getUnReadNotifications: (state) => {
            return state.notifications.filter(item => !item.read);
        }
    }
}