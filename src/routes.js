import DashView from "./components/Dash.vue";
import NotFoundView from "./components/404.vue";

import CreateWorkSpaceView from './components/auth/CreateWorkSpace.vue'
import UserSignUpView from "./components/auth/UserSignUp.vue";
import SignUpConfirmView from "./components/auth/SignUpConfirm.vue";
import LoginView from "./components/auth/Login.vue";
import AddPasswordView from "./components/auth/addPassword.vue";
import SelectWorkSpaceView from "./components/auth/SelectWorkSpace.vue";
import ResetPasswordView from "./components/auth/ResetPassword.vue"

// Import Views - Dash
import DashboardView from "./components/views/Dashboard.vue";
import MaterialView from "./components/views/materials/Material.vue";
import MaterialDashView from "./components/views/materials/materialsDash.vue";
import ToolsView from "./components/views/tools.vue";
import ToolTypesView from "./components/views/settings/toolTypes.vue";
import FleetView from "./components/views/fleet/fleet.vue";
import FleetTypeView from "./components/views/settings/fleetTypes.vue"
import MachineryTypeView from "./components/views/settings/machineryTypes.vue"
import EquipmentDashView from "./components/views/fleet/eqiupmentDash.vue";
import EquipmentView from "./components/views/fleet/equipment.vue";
import UserView from "./components/views/user.vue";
import BoqView from "./components/views/projects/boq.vue";
import PipView from "./components/views/projects/pip.vue";
import ProjectCostsView from "./components/views/projects/costs.vue";
import ProjectDocumentationView from "./components/views/projects/documentation.vue";
import GalleryView from "./components/views/projects/gallery.vue"
import ChallengesView from "./components/views/projects/challengesIncidents.vue"
import ProjectView from "./components/views/projects/project.vue";
import ProjectsView from "./components/views/projects/projects.vue";
import RequestsView from "./components/views/projects/requests.vue";
import ProjectOverView from "./components/views/projects/projectOverview.vue";
import ProjectReportsView from "./components/views/projects/reports.vue"
import NotificationsView from "./components/views/notifications.vue"
import WarehouseView from "./components/views/materials/warehouse.vue"
import WarehouseSitesView from "./components/views/materials/sites.vue"
import MechanicView from "./components/views/mechanic/mechanic.vue"
import MechanicFleetView from "./components/views/mechanic/mechanicFleets.vue"
import MechanicMachineryView from "./components/views/mechanic/mechanicMachinery.vue"
import MechanicToolsView from "./components/views/mechanic/mechanicTools.vue"
import ManholeAssignmentView from "./components/views/manholeManagement/manholeAssignment.vue";
import UserManholesView from "./components/views/manholeManagement/userManholes.vue";
import ManholeManagmentView from "./components/views/manholeManagement/manholeManagement.vue"
import ManholeView from "./components/views/manholeManagement/manholes.vue"
import CompanyView from "./components/views/company/companies.vue"
import CompanyUsers from "./components/views/company/companyUsers.vue"
import ChecklistView from "./components/views/Checklist.vue"
import SettingsView from "./components/views/projects/settings.vue"
import QualityView from "./components/views/projects/quality.vue"
import GeneralSettingsView from "./components/views/settings/settingDash.vue"

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
    path: "/forgot_password",
    component: ResetPasswordView
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
    path: "/users/accept/:id/",
    component: AddPasswordView
  },
  {
    path: "/dash",
    component: DashView,
    children: [
      {
        path: "dashboard",
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
        path: "companies",
        component: CompanyView,
        name: "Companies",
        meta: { description: "List of companies", requiresAuth: false }
      },
      {
        path: "companyUsers/:id",
        component: CompanyUsers,
        name: "Company Users",
        meta: { description: "List of users belonging to a particular company", requiresAuth: false }
      },
      {
        path: "manholeManagment",
        component: ManholeManagmentView,
        redirect: "manholeManagment/manholes",
        children: [
          {
            path: "assignments",
            component: ManholeAssignmentView,
            name: "Manhole Assignment",
            meta: { description: "AssignManholes to users", requiresAuth: false, type: "Manhole" }
          },
          {
            path: "userManholes/:id",
            component: UserManholesView,
            name: "User assigned manholes",
            meta: { description: "OFC user manholes", requiresAuth: false, type: "Manhole" }
          },
          {
            path: "manholes",
            component: ManholeView,
            name: "List of manholes",
            meta: { description: "List of manholes", requiresAuth: false, type: "Manhole" }
          },
        ]
      },
      {
        path: "notifications",
        component: NotificationsView,
        name: "Notifications",
        meta: { description: "List of notifications", requiresAuth: false }
      },
      {
        path: "settings",
        component: GeneralSettingsView,
        redirect: "settings/fleetTypes",
        children: [
          {
            path: "fleetTypes",
            component: FleetTypeView,
            name: "Fleet Type",
            meta: {description: "fleet types", requiresAuth: false, type: 'Settings' }
          },
          {
            path: "machineryTypes",
            component: MachineryTypeView,
            name: "Machinery Type",
            meta: {description: "machinery types", requiresAuth: false, type: 'Settings' }
          },
          ,
          {
            path: "toolTypes",
            component: ToolTypesView,
            name: "Tool types",
            meta: { description: "Tools overview", requiresAuth: false, type: 'Settings' }
          }
        ]
      },
      {
        path: "mechanic",
        component: MechanicView,
        redirect: "mechanic/fleets",
        children: [
          {
            path: "fleets",
            component: MechanicFleetView,
            name: "Mechanic fleets",
            meta: { description: "List of faulty fleets", requiresAuth: false, type: 'Garage' }
          },
          {
            path: "machinery",
            component: MechanicMachineryView,
            name: "Mechanic machinery",
            meta: { description: "List of faulty machinery", requiresAuth: false, type: 'Garage' }
          },
          {
            path: "tools",
            component: MechanicToolsView,
            name: "Mechanic tools",
            meta: {description: "List of faulty tools", requiresAuth: false, type: 'Garage' }
          }
        ]
      },
      {
        path: "tools",
        component: ToolsView,
        name: "Tools overview",
        meta: { description: "Tools overview", requiresAuth: false }
      },
      {
        path: "material_dash",
        component: MaterialDashView,
        redirect: "material_dash/material",
        children: [
          {
            path: "material",
            component: MaterialView,
            name: "Material",
            meta: { description: "List of equipments", requiresAuth: false, type: 'Materials' }
          },
          {
            path: "warehouse",
            component: WarehouseSitesView,
            name: "Warehouse Sites",
            meta: { description: "Warehouse management", requiresAuth: false, type: 'Materials' },
            children: [
              {
                path: ":id",
                component: WarehouseView,
                name: "Site Warehouse",
                meta: { description: "Warehouse management", requiresAuth: false , type: 'Warehouse'}
              }
            ]
          }
        ]
      },
      {
        path: "equipment_dash",
        component: EquipmentDashView,
        redirect: "equipment_dash/fleet",
        children: [
          {
            path: "equipments",
            component: EquipmentView,
            name: "Equipment",
            meta: { description: "List of equipments", requiresAuth: false, type: 'Fleets' }
          },
          {
            path: "fleet",
            component: FleetView,
            name: "Fleet",
            meta: { description: "Show fleet of vehicles", requiresAuth: false, type: 'Fleets'  }
          },
          {
            path: "checklist",
            component: ChecklistView,
            name: "Checklist",
            meta: { description: "List of checklist items", requiresAuth: false, type: 'Fleets' }
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
            meta: { description: "List of projects", requiresAuth: false, type: 'Projects' },
            children: [
              {
                path: "overview",
                component: ProjectOverView,
                name: "Overview",
                meta: { description: "Project Overview", requiresAuth: false, type: 'ProjectOverview' }
              },
              {
                path: "boq",
                component: BoqView,
                name: "Boq",
                meta: { description: "List of our boq", requiresAuth: false, type: 'ProjectOverview' }
              },
              {
                path: "pip",
                component: PipView,
                name: "PIP",
                meta: { description: "List of our pip", requiresAuth: false, type: 'ProjectOverview' }
              },
              {
                path: "costs",
                component: ProjectCostsView,
                name: "COSTS",
                meta: { description: "Project costs", requiresAuth: false, type: 'ProjectOverview' }
              },
              {
                path: "documentation",
                component: ProjectDocumentationView,
                name: "DOCUMENTATION",
                meta: { description: "Project documentation", requiresAuth: false, type: 'ProjectOverview' }
              },
              {
                path: "reports",
                component: ProjectReportsView,
                name: "REPORTS",
                meta: { description: "Project reports", requiresAuth: false, type: 'ProjectOverview' }
              },
              {
                path: "gallery",
                component: GalleryView,
                name: "GALLERY",
                meta: { description: "Project images", requiresAuth: false, type: 'ProjectOverview' }
              },
              {
                path: "challenges",
                component: ChallengesView,
                name: "Challenges",
                meta: { description: "Project challenges", requiresAuth: false, type: 'ProjectOverview' }
              },
              {
                path: "settings",
                component: SettingsView,
                name: "Settings",
                meta: { description: "Project settings", requiresAuth: false, type: 'ProjectOverview' }
              },
              {
                path: "quality",
                component: QualityView,
                name: "Quality",
                meta: { description: "Project settings", requiresAuth: false, type: 'ProjectOverview' }
              }
            ]
          },
          {
            path: "requests",
            component: RequestsView,
            name: "Requests",
            meta: { description: "List of survey requests", requiresAuth: false, type: 'Projects' }
          }
        ]
      }
    ]
  },
  {
    path: "*",
    component: NotFoundView
  }
];

export default routes;
