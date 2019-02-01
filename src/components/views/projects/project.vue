<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      <ul>
        <router-link tag="li" to="/dash/project/overview" v-if="this.$route.meta.type == 'ProjectOverview'">
          <a href="#"> 
            Overview
          </a>
        </router-link>  
        <router-link tag="li" to="/dash/project/boq" v-if="this.$route.meta.type == 'ProjectOverview' && $store.state.user_type != 'client'">
          <a href="#">
            BOQ
          </a>
        </router-link>  
        <router-link tag="li" to="/dash/project/pip" v-if="this.$route.meta.type == 'ProjectOverview' && $store.state.user_type != 'client'">
          <a href="#">
            PIP
          </a>
        </router-link> 
        <router-link tag="li" to="/dash/project/costs" v-if="this.$route.meta.type == 'ProjectOverview' && $store.state.user_type != 'client'">
          <a href="#">
            Site Costs
          </a>
        </router-link>  
        <router-link tag="li" to="/dash/project/documentation" v-if="this.$route.meta.type == 'ProjectOverview' && $store.state.user_type != 'client'">
          <a href="#">
            Documents
          </a>
        </router-link> 
        <router-link tag="li" to="/dash/project/reports" v-if="this.$route.meta.type == 'ProjectOverview' && $store.state.user_type != 'client'">
          <a href="#">
            Reports
          </a>
        </router-link>  
        <router-link tag="li" to="/dash/project/gallery" v-if="this.$route.meta.type == 'ProjectOverview'">
          <a href="#">
            Gallery
          </a>
        </router-link> 
        <router-link tag="li" to="/dash/project/quality" v-if="this.$route.meta.type == 'ProjectOverview' && $store.state.user_type != 'client'">
          <a href="#">
            Quality Checks
          </a>
        </router-link> 
        <router-link tag="li" to="/dash/project/challenges" v-if="this.$route.meta.type == 'ProjectOverview'">
          <a href="#">
            Challenges / Incidents
          </a>
        </router-link> 
        <router-link tag="li" to="/dash/project/settings" v-if="this.$route.meta.type == 'ProjectOverview'">
          <a href="#">
            Settings
          </a>
        </router-link> 
      </ul>
    </div>
  </section>

    <!-- Main content -->
  <section class="content">
    <router-view></router-view>
  </section>
</div>
</template>

<script>
import { select } from "../../mixins/select";

export default {
  mixins: [select],
  created() {},
  mounted() {
  }
};
</script>

<style>
</style>


