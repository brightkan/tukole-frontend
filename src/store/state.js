export default {
  callingAPI: false,
  searching: '',
  serverURI: 'http://10.110.1.136:8080',
  user: null,
  token: null,
  user_type: 'client',
  user_role: '',
  workspace: {
    id: null,
    name: null,
  },
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    tasks: []
  },
  workspaces: [],
  statuses: [
    {name: 'available', color: 'green'}, 
    {name: 'broken_down', color: 'red'}, 
    {name: 'assigned', color: 'orange'}]
}
