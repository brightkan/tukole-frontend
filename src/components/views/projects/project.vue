<template>
<div>
  <!-- <section class="content-header">
    
  </section> -->

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


