import DashView from "./components/Dash.vue";
import LoginView from "./components/Login.vue";
import NotFoundView from "./components/404.vue";

// Import Views - Dash
import DashboardView from "./components/views/Dashboard.vue";

import FleetView from "./components/views/fleet.vue";
import EquipmentView from "./components/views/equipment.vue";
import UserView from "./components/views/user.vue";
import ProjectView from "./components/views/project.vue";
import BoqView from "./components/views/boq.vue";
import PipView from "./components/views/pip.vue";

// Routes
const routes = [
  {
    path: "/login",
    component: LoginView
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
        path: "equipments",
        component: EquipmentView,
        name: "Equipment",
        meta: { description: "List of equipments" }
      },
      {
        path: "projects",
        component: ProjectView,
        name: "Projects",
        meta: { description: "List of projects" }
      },
      {
        path: "users",
        component: UserView,
        name: "Users",
        meta: { description: "List of our users" }
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
  },
  {
    // not found handler
    path: "*",
    component: NotFoundView
  }
];

export default routes;
