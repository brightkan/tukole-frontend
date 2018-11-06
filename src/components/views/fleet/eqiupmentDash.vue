<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      <ul>
        <router-link tag="li" to="/dash/equipment_dash/fleet">
          <a href="#">
            Fleet
          </a>
        </router-link>
        <router-link tag="li" to="/dash/equipment_dash/fleetTypes">
          <a href="#">
            Fleet Types
          </a>
        </router-link>              
        <router-link tag="li" to="/dash/equipment_dash/equipments">
          <a>
            Machinery
          </a>
        </router-link>
        <router-link tag="li" to="/dash/equipment_dash/machineryTypes">
          <a href="#">
            Machinery Types
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


