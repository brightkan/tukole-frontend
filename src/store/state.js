export default {
  callingAPI: false,
  searching: '',
  serverURI: 'http://10.110.1.136:8080',
  user: null,
  token: null,
  workspace: {
    id: null,
    name: null,
  },
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    notifications: [],
    tasks: []
  },
  workspaces: [],
  statuses: [
    {name: 'Avialable', color: 'green'}, 
    {name: 'Broken Down', color: 'red'}, 
    {name: 'Assigned', color: 'orange'}]
}
