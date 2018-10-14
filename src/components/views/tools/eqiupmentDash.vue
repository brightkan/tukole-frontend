<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      <ul>
        <router-link tag="li" to="equipments">
          <a href="#">
            Machinery
          </a>
        </router-link>            
        <router-link tag="li" to="/">
          <a>
            Tools
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


