export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_WORKSPACE (state, workspace){
    state.workspace = workspace
  },
  SET_WORKSPACES (state, workspaces){
    state.workspaces = workspaces
  },
  SET_USER_TYPE (state, user_type){
    state.user_type = user_type
  },
}