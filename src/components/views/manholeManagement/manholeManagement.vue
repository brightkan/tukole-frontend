<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      <ul>
        <router-link tag="li" to="/dash/manholeManagment/assignments">
          <a href="#">
            Manhole Assignments
          </a>
        </router-link>
        <router-link tag="li" to="/dash/manholeManagment/manholes">
          <a href="#">
            Manholes
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
export default {
  data(router) {
    return {};
  },
  created() {},
  mounted() {

  },
  computed: {

  },
  methods: {

  }
};
</script>

<style>
</style>


