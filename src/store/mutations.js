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
  SET_TOOL_TYPES (state, tool_types) {
    state.tool_types = tool_types
  },
  SET_TOOLS (state, tools) {
    state.tools = tools
  }
}