<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      <ul>
        <router-link tag="li" to="/dash/project/overview">
          <a href="#"> 
            Overview
          </a>
        </router-link>  
        <router-link tag="li" to="/dash/project/boq">
          <a href="#">
            BOQ
          </a>
        </router-link>  
        <router-link tag="li" to="/dash/project/pip">
          <a href="#">
            PIP
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
  mounted() {}
};
</script>

<style>
</style>


