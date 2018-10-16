import DashView from "./components/Dash.vue";
import LoginView from "./components/Login.vue";
import NotFoundView from "./components/404.vue";

import CreateWorkSpaceView from './components/auth/CreateWorkSpace.vue'
import UserSignUpView from "./components/auth/UserSignUp.vue";
import SignUpConfirmView from "./components/auth/SignUpConfirm.vue";

// Import Views - Dash
import DashboardView from "./components/views/Dashboard.vue";

import FleetView from "./components/views/fleet.vue";
import EquipmentDashView from "./components/views/tools/eqiupmentDash.vue";
import EquipmentView from "./components/views/tools/equipment.vue";
import UserView from "./components/views/user.vue";
import BoqView from "./components/views/projects/boq.vue";
import PipView from "./components/views/projects/pip.vue";
import ProjectView from "./components/views/projects/project.vue";
import ProjectsView from "./components/views/projects/projects.vue";
import ProjectOverView from "./components/views/projects/projectOverview.vue";

// Routes
const routes = [
  {
    path: "/login",
    component: LoginView
  },
  {
    path: "/create_workspace",
    component: CreateWorkSpaceView
  },
  {
    path: "/signup",
    component: UserSignUpView
  },
  {
    path: "/signup_confirm",
    component: SignUpConfirmView
  },
  {
    path: "/",
    component: DashView,
    children: [
      {
        path: "dashboard",
        alias: "",
        component: DashboardView,
        name: "Dashboard",
        meta: { description: "Overview of environment" }
      },
      {
        path: "fleet",
        component: FleetView,
        name: "Fleet",
        meta: { description: "Show fleet of vehicles" }
      },
      {
        path: "users",
        component: UserView,
        name: "Users",
        meta: { description: "List of our users" }
      },
      {
        path: "equipment_dash",
        component: EquipmentDashView,
        redirect: "equipment_dash/equipments",
        children: [
          {
            path: "equipments",
            component: EquipmentView,
            name: "Equipment",
            meta: { description: "List of equipments" }
          }
        ]
      },
      {
        path: "project", // Todo: change this to project
        component: ProjectView,
        redirect: "project/projects",
        children: [
          {
            path: "projects",
            component: ProjectsView,
            name: "Projects",
            meta: { description: "List of projects" }
          },
          {
            path: "overview",
            component: ProjectOverView,
            name: "Overview",
            meta: { description: "Project Overview" }
          },
          {
            path: "boq",
            component: BoqView,
            name: "BOQ",
            meta: { description: "List of our boq" }
          },
          {
            path: "pip",
            component: PipView,
            name: "PIP",
            meta: { description: "List of our pip" }
          }
        ]
      }
    ]
  },
  {
    // not found handler
    path: "*",
    component: NotFoundView
  }
];

export default routes;
