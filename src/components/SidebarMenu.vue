<template>
  <ul class="sidebar-menu">
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/dashboard">
      <a>
        <i class="fas fa-tachometer-alt"></i>
        <span class="page">Overview</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/dash/project">
      <a>
        <i class="fa fa-calendar"></i>
        <span class="page">Sites</span>
      </a>
    </router-link>
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/equipment_dash">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Fleet & Machinery</span>
      </a>
    </router-link>
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/material">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Materials</span>
      </a>
    </router-link>
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/tools">
      <a>
        <i class="fa fa-toolbox"></i>
        <span class="page">Tools</span>
      </a>
    </router-link>
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/users">
      <a>
        <i class="fa fa-users"></i>
        <span class="page">Users</span>
      </a>
    </router-link>
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/manhole">
      <a>
        <i class="fa fa-warehouse"></i>
        <span class="page">Manhole Management</span>
      </a>
    </router-link>
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/warehouse">
      <a>
        <i class="fa fa-warehouse"></i>
        <span class="page">Warehouse</span>
      </a>
    </router-link>
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/mechanic">
      <a>
        <i class="fa fa-cogs"></i>
        <span class="page">Garage</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/dash/notifications">
      <a>
        <i class="fas fa-bell"></i>
        <span class="page">Notifications</span>
      </a>
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: "SidebarMenu"
  };
</script>

<style>
  /* override default */
  .sidebar-menu > li > a {
    padding: 15px;
  }

  .sidebar-menu li.active > a > .fa-angle-left,
  .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
    animation-name: rotate;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
  }

  /* .treeview-title {
    z-index: 1;
  }
  */
  .skin-blue .sidebar-menu > li.active > a {
    background: rgba(255, 255, 255, 0.15);
    border-right-color: #256ae1;
  }

  .skin-blue .sidebar-menu > li > a {
    border-right: 5px solid transparent;
    border-left: none;
    margin-left: 15px;
    font-size: 15px;
  }

  .skin-blue .sidebar-menu > li > a i {
    margin-right: 15px;
  }

  .sidebar-mini.sidebar-collapse .sidebar-menu > li > a {
    border-right: 5px solid transparent;
    border-left: none;
    margin-left: 0;
    font-size: 16px;
  }

  .sidebar-mini.sidebar-collapse .sidebar-menu > li > a i {
    margin-left: 0;
    margin-right: 15px;
  }

  .sidebar-mini.sidebar-collapse .sidebar-menu > li > a span {
    display: none;
  }
</style>
