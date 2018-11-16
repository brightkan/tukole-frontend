<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      <ul>
        <router-link tag="li" to="/dash/project/overview" v-if="this.$route.meta.type == 'ProjectOverview' && $store.state.user_type != 'client'">
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
        <router-link tag="li" to="/dash/project/projects" v-if="this.$route.meta.type == 'Projects'">
          <a href="#">
            Current Sites
          </a>
        </router-link>  
        <router-link tag="li" to="/dash/project/requests" v-if="this.$route.meta.type == 'Projects'">
          <a href="#">
            Survey Requests
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


