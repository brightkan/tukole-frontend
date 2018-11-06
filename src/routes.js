import DashView from "./components/Dash.vue";
import NotFoundView from "./components/404.vue";

import CreateWorkSpaceView from './components/auth/CreateWorkSpace.vue'
import UserSignUpView from "./components/auth/UserSignUp.vue";
import SignUpConfirmView from "./components/auth/SignUpConfirm.vue";
import LoginView from "./components/auth/Login.vue";
import SelectWorkSpaceView from "./components/auth/SelectWorkSpace.vue";

// Import Views - Dash
import DashboardView from "./components/views/Dashboard.vue";
import MaterialView from "./components/views/Material.vue";
import ToolsView from "./components/views/tools/tools.vue";
import ToolTypesView from "./components/views/tools/toolTypes.vue";
import ToolsDashView from "./components/views/tools/toolsDash.vue";
import FleetView from "./components/views/fleet/fleet.vue";
import FleetTypeView from "./components/views/fleet/fleetTypes.vue"
import MachineryTypeView from "./components/views/fleet/machineryTypes.vue"
import EquipmentDashView from "./components/views/fleet/eqiupmentDash.vue";
import EquipmentView from "./components/views/fleet/equipment.vue";
import UserView from "./components/views/user.vue";
import BoqView from "./components/views/projects/boq.vue";
import PipView from "./components/views/projects/pip.vue";
import ProjectView from "./components/views/projects/project.vue";
import ProjectsView from "./components/views/projects/projects.vue";
import ProjectOverView from "./components/views/projects/projectOverview.vue";

// Routes
const routes = [
  {
    path: "",
    component: LoginView
  },
  {
    path: "/select_workspace",
    component: SelectWorkSpaceView
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
    path: "/dash",
    component: DashView,
    children: [
      {
        path: "dashboard",
        alias: "",
        component: DashboardView,
        name: "Dashboard",
        meta: { description: "Overview of environment", requiresAuth: false }
      },
      {
        path: "users",
        component: UserView,
        name: "Users",
        meta: { description: "List of our users", requiresAuth: false }
      },
      {
        path: "tools",
        component: ToolsDashView,
        name: "Tools",
        redirect: "tools/overview",
        children: [
          {
            path: "overview",
            component: ToolsView,
            name: "Tools overview",
            meta: { description: "Tools overview", requiresAuth: false }
          },
          {
            path: "types",
            component: ToolTypesView,
            name: "Tool types",
            meta: { description: "Tools overview", requiresAuth: false }
          }
        ]
      },
      {
        path: "material",
        component: MaterialView,
        name: "Material",
        meta: { description: "Show material", requiresAuth: false }
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
            meta: { description: "List of equipments", requiresAuth: false }
          },
          {
            path: "fleet",
            component: FleetView,
            name: "Fleet",
            meta: { description: "Show fleet of vehicles", requiresAuth: false }
          },
          {
            path: "fleetTypes",
            component: FleetTypeView,
            name: "Fleet Type",
            meta: {description: "fleet types", requiresAuth: false}
          },
          {
            path: "machineryTypes",
            component: MachineryTypeView,
            name: "Machinery Type",
            meta: {description: "machinery types", requiresAuth: false}
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
            meta: { description: "List of projects", requiresAuth: false  }
          },
          {
            path: "overview",
            component: ProjectOverView,
            name: "Overview",
            meta: { description: "Project Overview", requiresAuth: false  }
          },
          {
            path: "boq",
            component: BoqView,
            name: "BOQ",
            meta: { description: "List of our boq", requiresAuth: false }
          },
          {
            path: "pip",
            component: PipView,
            name: "PIP",
            meta: { description: "List of our pip", requiresAuth: false }
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
