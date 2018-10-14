<template>
  <ul class="sidebar-menu">
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Overview</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/fleet">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Fleet</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/equipment_dash">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Equipments</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/project">
      <a>
        <i class="fa fa-calendar"></i>
        <span class="page">Projects</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/users">
      <a>
        <i class="fa fa-users"></i>
        <span class="page">Users</span>
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
  padding: 12px 15px 12px 15px;
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
}

.skin-blue .sidebar-menu > li > a i {
  margin-left: 25px;
  margin-right: 15px;
}

.sidebar-mini.sidebar-collapse .sidebar-menu > li > a {
  border-right: 5px solid transparent;
  border-left: none;
  margin-left: 0;
}

.sidebar-mini.sidebar-collapse .sidebar-menu > li > a i {
  margin-left: 0;
  margin-right: 15px;
}

.sidebar-mini.sidebar-collapse .sidebar-menu > li > a span {
  display: none;
}

/* @keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
} */
</style>
