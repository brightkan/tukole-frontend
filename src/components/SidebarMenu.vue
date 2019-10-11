<template>
  <ul class="sidebar-menu">
    <router-link v-if="$store.state.user_type != 'client' && $store.state.user_role == 'management'" tag="li" class="pageLink" to="/dash/dashboard">
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
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/material_dash">
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
    <router-link v-if="$store.state.user_type == 'client'" tag="li" class="pageLink" v-bind:to="'/dash/companyUsers/' +company">
      <a>
        <i class="fa fa-users"></i>
        <span class="page">Users</span>
      </a>
    </router-link>
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/companies">
      <a>
        <i class="fa fa-users"></i>
        <span class="page">Companies</span>
      </a>
    </router-link>
    <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/manholeManagment">
      <a>
        <i class="fa fa-warehouse"></i>
        <span class="page">Manhole</span>
      </a>
    </router-link>
    <!-- <router-link v-if="$store.state.user_type != 'client'" tag="li" class="pageLink" to="/dash/mechanic">
      <a>
        <i class="fa fa-cogs"></i>
        <span class="page">Garage</span>
      </a>
    </router-link> -->
    <router-link tag="li" class="pageLink" to="/dash/empolyeePermissions">
      <a>
        <i class="fas fa-bell"></i>
        <span class="page">Performance</span>
      </a>
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: "SidebarMenu",
    data(router) {
      return {
        company: ''
      };
    },
    mounted() {
      this.company = window.localStorage.getItem('company');
    },
  };
</script>

<style lang="scss">
  @import "../../static/css/variables";
  /* override default */
  .sidebar-menu > li > a {
    padding: 15px 25px;
  }

  .sidebar-menu li.active > a > .fa-angle-left,
  .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
    animation-name: rotate;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
  }

  .skin-blue .sidebar-menu > li.active > a {
    background: #b7f5b5;
    color: $color-nav-items;
  }

  .skin-blue .sidebar-menu > li > a {
    border-left: none;
    font-size: 15px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.22;
    font-family: $font;
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

  .sidebar-menu > li {
    margin: 15px 0;
  }
</style>
