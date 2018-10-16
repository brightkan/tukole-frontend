<template>
  <div :class="['wrapper', classes]">
    <header class="main-header">
      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
          <span class="hidden-xs">Dashboard</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li>
              <form method="get" action="/search" id="nav_search">
                <input name="q" type="text" size="40" placeholder="Search..." />
              </form>
            </li>
            <li>
              <a href="javascript:;">Settings</a>
            </li>
            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <!-- <span class="hidden-xs">{{ demo.displayName }}</span> -->
                <!-- The user image in the navbar-->
                <img v-bind:src="demo.avatar" class="user-image" alt="User Image">        
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar :display-name="demo.displayName" :picture-url="demo.avatar" />

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <!-- <section class="content-header">
        <div class="toolbar">
          <ul>
            <router-link tag="li" v-if="currentRoute.urlPath == '/projects' || currentRoute.urlPath == '/boq' || currentRoute.urlPath == '/pip'" to="/projects">
              <a href="#"> 
                Overview
              </a>
            </router-link>  
            <router-link tag="li" v-if="currentRoute.urlPath == '/projects' || currentRoute.urlPath == '/boq' || currentRoute.urlPath == '/pip'" to="/boq">
              <a href="#">
                BOQ
              </a>
            </router-link>  
            <router-link tag="li" v-if="currentRoute.urlPath == '/projects' || currentRoute.urlPath == '/boq' || currentRoute.urlPath == '/pip'" to="/pip">
              <a href="#">
                PIP
              </a>
            </router-link>  
            <router-link tag="li" v-if="currentRoute.urlPath == '/equipments'" to="/equipments">
              <a href="#">
                Machinery
              </a>
            </router-link>            
            <router-link tag="li" v-if="currentRoute.urlPath == '/equipments'" to="/">
              <a>
                Tools
              </a>
            </router-link>
          </ul>
        </div>
      </section> -->

      <router-view :someProp="currentRoute" v-on:customEventForValChange="handleCustomEvent"></router-view>
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

export default {
  name: "Dash",
  components: {
    Sidebar
  },
  data: function() {
    return {
      // section: 'Dash',
      year: new Date().getFullYear(),
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      },
      error: "",
      currentRoute: {
        urlPath: null
      }
    };
  },
  computed: {
    ...mapState(["userInfo"]),
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
    changeloading() {
      this.$store.commit("TOGGLE_SEARCHING");
    },
    handleCustomEvent(newVal) {
      this.$set(this.currentRoute, "urlPath", newVal);
      /* this.currentRoute = newVal; */
    }
  },
  mounted() {
    console.log(this.$route.path);
  }
};
</script>

<style>
a {
  color: white;
}
.wrapper.fixed_layout .main-header {
  position: fixed;
  width: 100%;
}
.wrapper.fixed_layout .content-wrapper {
  padding-top: 50px;
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
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  line-height: 17px;
  margin-left: 20px;
}

.navbar-nav li a {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
}

.main-header > .navbar {
  background-color: #256ae1 !important;
  margin-left: 0;
}

#nav_search {
  padding: 0;
  margin-top: 12px;
  margin-right: 45px;
}

#nav_search input[type="text"] {
  background: url(../../static/img/search-white.png) no-repeat 10px 6px;
  background-color: rgba(255, 254, 254, 0.2);
  border: 0 none;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  width: 700px;
  padding: 6px 15px 6px 35px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}
#nav_search input[type="text"]::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
  opacity: 1; /* Firefox */
}

#nav_search input[type="text"]:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
  font-size: 12px;
  line-height: 15px;
  font-family: "Montserrat", sans-serif;
}

#nav_search input[type="text"]::-ms-input-placeholder {
  /* Microsoft Edge */
  color: white;
  font-size: 12px;
  line-height: 15px;
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
</style>
