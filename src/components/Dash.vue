<template>
  <div :class="['wrapper', classes]">
    <header class="main-header">
      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span>
            <i class="fas fa-th-large"></i>
          </span>
          <span class="hidden-xs">{{account_type == 'client' ? 'Client' : 'Admin' }}</span>
        </a>


        <div class="top-nav-items">
          <ul>
            <router-link tag="li" to="/dash/project/projects" v-if="this.$route.meta.type == 'Projects' || this.$route.meta.type == 'ProjectOverview'">
              <a href="#">
                <span class="icon"><i class="fa fa-truck"></i></span>
                Current
              </a>
            </router-link>  
            <router-link tag="li" to="/dash/project/requests" v-if="this.$route.meta.type == 'Projects' || this.$route.meta.type == 'ProjectOverview'">
              <a href="#">
                <span class="icon"><i class="fa fa-truck"></i></span>
                Requests
              </a>
            </router-link> 
            <router-link tag="li" to="/dash/equipment_dash/fleet" v-if="this.$route.meta.type == 'Fleets'">
              <a href="#">
                <span class="icon"><i class="fa fa-truck"></i></span>
                Fleet
              </a>
            </router-link>
            <router-link tag="li" to="/dash/settings/fleetTypes" v-if="this.$route.meta.type == 'Settings'">
              <a href="#">
                <span class="icon"><i class="fa fa-cogs"></i></span>
                Fleet Types
              </a>
            </router-link>
            <router-link tag="li" to="/dash/equipment_dash/checklist" v-if="this.$route.meta.type == 'Fleets'">
              <a>
                <span class="icon"><i class="fa fa-bell"></i></span>
                Fleet Checklist
              </a>
            </router-link>              
            <router-link tag="li" to="/dash/equipment_dash/equipments" v-if="this.$route.meta.type == 'Fleets'">
              <a>
                <span class="icon"><i class="fa fa-wrench"></i></span>
                Machinery
              </a>
            </router-link>
            <router-link tag="li" to="/dash/settings/machineryTypes" v-if="this.$route.meta.type == 'Settings'">
              <a href="#">
                <span class="icon"><i class="fa fa-cogs"></i></span>
                Machinery Types
              </a>
            </router-link> 
            <router-link v-if="this.$route.meta.type == 'Materials' || this.$route.meta.type == 'Warehouse'" tag="li" to="/dash/material_dash/material">
              <a>
                <span class="icon"><i class="fa fa-wrench"></i></span>
                <span class="page">Materials</span>
              </a>
            </router-link> 
            <router-link v-if="this.$route.meta.type == 'Materials' || this.$route.meta.type == 'Warehouse'" tag="li" to="/dash/material_dash/warehouse">
              <a>
                <span class="icon"><i class="fa fa-warehouse"></i></span>
                Warehouse
              </a>
            </router-link>
            <router-link tag="li" to="/dash/settings/toolTypes" v-if="this.$route.meta.type == 'Settings'">
              <a>
                <span class="icon"><i class="fa fa-wrench"></i></span>
                Tool Types
              </a>
            </router-link>
            <router-link tag="li" to="/dash/manholeManagment/manholes" v-if="this.$route.meta.type == 'Manhole'">
              <a href="#">
                Manholes
              </a>
            </router-link>   
            <router-link tag="li" to="/dash/manholeManagment/assignments" v-if="this.$route.meta.type == 'Manhole'">
              <a href="#">
                Assignments
              </a>
            </router-link> 
            <router-link tag="li" to="/dash/mechanic/fleets" v-if="this.$route.meta.type == 'Garage'">
              <a href="#">
                Fleets
              </a>
            </router-link>
            <router-link tag="li" to="/dash/mechanic/machinery" v-if="this.$route.meta.type == 'Garage'">
              <a href="#">
                Machines
              </a>
            </router-link>              
            <router-link tag="li" to="/dash/mechanic/tools" v-if="this.$route.meta.type == 'Garage'">
              <a>
                Tools
              </a>
            </router-link>
          </ul>
        </div>


        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li>
              <a href="javascript:;" v-on:click="openSettings()" class="_icon"><i class="fa fa-cog"></i></a>
            </li>
            <li class="dropdown notifications">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="icon"><i class="fa fa-bell"></i></span> 
                <span class="custom-badge badge badge-light"></span>
              </a>
              <ul class="dropdown-menu notify-drop">
                <div class="notify-drop-title">
                  <div class="row">
                    <div class="col-md-12 notif-header">{{ getUnReadNotifications.length }} Notifications</div>
                  </div>
                </div>
                <!-- end notify title -->
                <!-- notify content -->
                <div class="drop-content">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="notification in getUnReadNotifications" :key="notification.id" v-on:click="showNotifications()">
                      <i class="fas fa-bell"></i> {{ notification.notification }}  
                    </li>
                  </ul>
                </div>
                <div class="notify-drop-footer">
                  <a href="javascript:;" v-on:click="showNotifications()">ALL NOTIFICATIONS</a>
                </div>
              </ul>
            </li>

            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <!-- <span class="hidden-xs">{{ demo.displayName }}</span> -->
                <!-- The user image in the navbar-->
                <img v-bind:src="demo.avatar" class="user-image" alt="">  
                {{ user.first_name }} {{ user.last_name }}      
              </a>
              <ul class="dropdown-menu">
                  <li><a href="#" v-on:click="Logout()" class="dropdown-item">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar :display-name="demo.displayName" :picture-url="demo.avatar" />

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}}
        <a href="javascript:;">Soliton</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import faker from "faker";
import { mapState } from "vuex";
import config from "../config";
import Sidebar from "./Sidebar";
import "hideseek";

import { mapGetters } from "vuex";

export default {
  name: "Dash",
  components: {
    Sidebar
  },
  data: function() {
    return {
      account_type: window.localStorage.getItem("clientType"),
      // section: 'Dash',
      year: new Date().getFullYear(),
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      },
      error: "",
    };
  },
  computed: {
    ...mapState(["userInfo", "user"]),
    ...mapGetters('notifications', ['getReadNotifications', 'getUnReadNotifications']),
    demo() {
      return {
        displayName: faker.name.findName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        randomCard: faker.helpers.createCard()
      };
    }
  },
  methods: {
    Logout(){
      window.localStorage.removeItem('token');
      this.$router.push('/');
    },
    showNotifications(){
      this.$router.push('/dash/notifications');
    },
    openSettings(){
      this.$router.push('/dash/settings');
    }
  },
  mounted() {
    console.log(this.$route);

    this.$store.dispatch("getUser", (JSON.parse(window.localStorage.getItem('user'))).user_id)
    this.$store.dispatch("notifications/loadNotifications", (JSON.parse(window.localStorage.getItem('user'))).user_id);
    this.$store.commit("SET_USER_TYPE", window.localStorage.getItem('clientType'));
    if(window.localStorage.getItem('clientType') === 'client'){
      this.$router.push('/dash/project');
    }else{
      this.$router.push('/dash/dashboard');
    }
  }
};
</script>

<style lang="scss">
@import "../../static/css/variables";

.main-header{
  .sidebar-toggle::before {
    content: "";
  }
  .sidebar-toggle:hover {
    color: $color-nav-items;
  }

  .sidebar-toggle{
    padding: 0;

    span:first-child{
      display: inline-block;
      padding: 17.5px;
      background-color: #256ae1;
      i{
        color: #ffffff;
        font-size: 24px;
      }
    }
  }
}

.navbar{
  padding-bottom: 0;
  padding-top: 0;
  -webkit-box-shadow: 0 8px 6px -10px black;
  -moz-box-shadow: 0 8px 6px -10px black;
  box-shadow: 0 8px 6px -10px black;
  padding-left: 0;
}

.top-nav-items{
  ul{
    list-style: none;
    padding: 0;

    li{
      position: relative;
      float: left;
      padding: 18.5px 30px;

      a{
        font-family: $font;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.22;
        color: $color-nav-items;

        span{
          margin-right: 5px;
          display: inline-block;
        }
      }
    }

    li.active{
      background-color: #fafafa;
      border-bottom: 3px solid $color-accent-1;
    }
  }
}

.navbar-custom-menu{
  li{
    ._icon{
      position: relative;
      width: 23px;
      display: inline-block;
      i{
        position: absolute;
        bottom: -8px;
      }
    }
    padding: 0 15px;
    i{
      font-size: 22px;
      color: $color-nav-items;
    }
    span.icon{
      background: $color-nav-items;
      border-radius: 50%;
      padding: 4px 6px;
      i{
        font-size: 13px;
        color: #fff;
      }
    }
  }
  .notifications{
    a{
      display: inline-grid;
      line-height: 1em;
      position: relative;
      .badge:empty{
        display: inline-block;
      }
      .custom-badge{
        top: -3px;
        right: 0;
        width: 5px;
        height: 9px;
        background-color: #f36
      }
    }
  }
}

.wrapper{
    min-height:100%;
    position:relative;
}
footer {
  bottom:0;
  left:0;
  width:100%;
}
.list-group i {
  color: #888;
  margin-right: 5px;
}
.list-group li{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.custom-badge {
  position: absolute !important;
}

.main-header{
  position: fixed;
  width: 100%;
}
.content-wrapper{
  margin-top: 64px;
}

.dropdown.user.user-menu.open {
  height: 50px;
}

.dropdown.user.user-menu.open a {
  background: transparent;
}
.navbar-custom-menu > .navbar-nav{
  display: block;
};
.navbar-custom-menu > .navbar-nav > li {
    display: inline-block;
}

.navbar-custom-menu > .navbar-nav > li > .dropdown-menu {
  font-size: 16px;
  width: 50%;
}

a {
  color: black;
}
.wrapper.fixed_layout .main-header {
  position: fixed;
  width: 100%;
}
.wrapper.fixed_layout .content-wrapper {
  padding-top: 64px;
}
.wrapper.fixed_layout .main-sidebar {
  position: fixed;
  height: 100vh;
}

@media (max-width: 767px) {
  .wrapper.hide_logo .main-header .logo {
    display: none;
  }
}

.logo-mini,
.logo-lg {
  text-align: left;
}
.logo-mini img,
.logo-lg img {
  padding: 0.4em !important;
}

.logo-lg img {
  display: -webkit-inline-box;
  width: 25%;
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}

.content-header {
  min-height: 50px;
  box-shadow: 0 2px 4px 0 rgba(202, 202, 202, 0.5);
}

.user-image {
  float: initial;
  margin-right: 58px;
}

.sidebar-mini.sidebar-collapse .main-header .navbar {
  margin-left: 0;
}

.sidebar-toggle span:nth-child(2) {
  color: black;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  line-height: 17px;
  margin-left: 20px;
}

.navbar-nav li a {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
}

.main-header > .navbar {
  background-color: white;
  margin-left: 0;
  min-height: 64px;
}

#nav_search {
  padding: 0;
  margin-right: 45px;
}

#nav_search input[type="text"] {
  background: #fff;
  background-color:#fff;
  border: 0 none;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  line-height: 2;
  color: #666;
  padding: 6px 15px 6px 35px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}
#nav_search input[type="text"]::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #666;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  line-height: 2;
  opacity: 1; /* Firefox */
}
#nav_search input[type="text"]:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
  font-size: 14px;
  line-height: 2;
  font-family: "Montserrat", sans-serif;
}
#nav_search input[type="text"]::-ms-input-placeholder {
  /* Microsoft Edge */
  color: white;
  font-size: 14px;
  line-height: 2;
  font-family: "Montserrat", sans-serif;
}

.content-header ul {
  padding: 0;
  list-style: none;
  display: inline-flex;
  margin-bottom: 0;
}
.content-header ul li {
  float: left;
  padding: 0 15px 12px;
}
.content-header ul li a {
  color: #bdbdbd;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
}
.content-header ul li.active {
  border-bottom: 4px solid #256ae1;
}
.content-header ul li.active a {
  color: #256ae1;
}
.toolbar {
  position: relative;
  text-align: center;
}
.user-menu a:hover {
  background: transparent;
}

.navbar-nav > .user-menu .user-image{
  margin-top: 0
}
.dropdown-menu{
  margin-top: 15px;
}

/* Notification Ui*/
.notifications a{
  color: #256ae1;
}
.notifications a.dropdown-toggle{
  color: #fff;
}
.notifications.open a{
  background-color: transparent; 
}

.nav .notifications.open > a, .nav .notifications.open > a:focus, .nav .notifications.open > a:hover {
  background-color: transparent;
  border: none;
}

.notifications .dropdown-menu.notify-drop {
  min-width: 330px;
  background-color: #fff;
  min-height: 360px;
  box-shadow: 0 2px 2px#666;
}
.notifications .dropdown-menu.notify-drop .notify-drop-title {
  border-bottom: 1px solid #e2e2e2;
  padding: 5px 15px 10px 15px;
}
.notifications .dropdown-menu.notify-drop .drop-content {
  min-height: 280px;
  max-height: 280px;
  overflow-y: scroll;
}
.notifications .dropdown-menu.notify-drop .drop-content .mark-read{
  float: right;
  box-shadow: none;
  border: 1px solid #666;
  border-radius: 5px;
}
.notifications .dropdown-menu.notify-drop .drop-content::-webkit-scrollbar-track
{
  background-color: #F5F5F5;
}

.notifications .dropdown-menu.notify-drop .drop-content::-webkit-scrollbar
{
  width: 8px;
  background-color: #F5F5F5;
}

.notifications .dropdown-menu.notify-drop .drop-content::-webkit-scrollbar-thumb
{
  background-color: #ccc;
}
.notifications .dropdown-menu.notify-drop .drop-content > li {
  border-bottom: 1px solid #e2e2e2;
  padding: 10px 0px 5px 0px;
  width: 100%;
  margin: 0;
}
.notifications .dropdown-menu.notify-drop .drop-content > li:nth-child(2n+0) {
  background-color: #fafafa;
}
.notifications .dropdown-menu.notify-drop .drop-content > li:after {
  content: "";
  clear: both;
  display: block;
}
.notifications .dropdown-menu.notify-drop .drop-content > li:hover {
  background-color: #fcfcfc;
}
.notifications .dropdown-menu.notify-drop .drop-content > li:last-child {
  border-bottom: none;
}
.notifications .dropdown-menu.notify-drop .drop-content > li .notify-img {
  float: left;
  display: inline-block;
  width: 45px;
  height: 45px;
  margin: 0px 0px 8px 0px;
}
.notifications .dropdown-menu.notify-drop .allRead {
  margin-right: 7px;
}
.notifications .dropdown-menu.notify-drop .rIcon {
  float: right;
  color: #999;
}
.notifications .dropdown-menu.notify-drop .rIcon:hover {
  color: #333;
}
.notifications .dropdown-menu.notify-drop .drop-content > li a {
  font-size: 1.2em;
  font-weight: normal;
}
.notifications .dropdown-menu.notify-drop .drop-content > li {
  font-weight: bold;
  font-size: 11px;
}
.notifications .dropdown-menu.notify-drop .drop-content > li hr {
  margin: 5px 0;
  width: 100%;
  border-color: #e2e2e2;
}
.notifications .dropdown-menu.notify-drop .drop-content .pd-l0 {
  padding-left: 0;
}
.notifications .dropdown-menu.notify-drop .drop-content .ld-l0 {
  padding-right: 0;
}
.notifications .dropdown-menu.notify-drop .drop-content > li p {
  font-size: 11px;
  color: #666;
  font-weight: normal;
  margin: 3px 0;
}
.notifications .dropdown-menu.notify-drop .drop-content > li p.time {
  font-size: 10px;
  font-weight: 600;
  top: -6px;
  margin: 8px 0px 0px 0px;
  padding: 0px 3px;
  border: 1px solid #e2e2e2;
  position: relative;
  background-image: linear-gradient(#fff,#f2f2f2);
  display: inline-block;
  border-radius: 2px;
  color: #B97745;
}
.notifications .dropdown-menu.notify-drop .drop-content > li p.time:hover {
  background-image: linear-gradient(#fff,#fff);
}
.notifications .dropdown-menu.notify-drop .notify-drop-footer {
  border-top: 1px solid #e2e2e2;
  bottom: 0;
  position: relative;
  padding: 10px;
}
.notifications .dropdown-menu.notify-drop .notify-drop-footer a {
  text-decoration: none;
}

.notif-header, .notify-drop-footer {
  color: #256ae1;
  text-align: center;
}

.notif-header {
  margin: auto;
  text-transform: uppercase;
}

</style>
