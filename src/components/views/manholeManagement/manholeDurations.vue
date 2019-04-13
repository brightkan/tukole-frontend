<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-users"></i>{{ getUser() }} - {{ getManhole() }} - Manhole Login Duration</h3>
          <datatable :columns="table_columns" :data="manholedurations" :filter-by="filter">
            <template scope="{ row }">
                <tr>
                    <td>{{ row.start_time | moment('MMM Do YYYY hh:mm a') }}</td>
                    <td>{{ row.end_time | moment('MMM Do YYYY hh:mm a') }}</td>
                    <td>{{ row.created | moment('MMM Do YYYY') }}</td>
                </tr>
            </template>
          </datatable>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>

import { mapState } from "vuex";

export default {
  data(router) {
    return {
      //dataTables implementation
      filter: '',
      table_columns: [
          {label: 'Login time', field: 'start_time'},
          {label: 'Logout time', field: 'end_time'},
          {label: 'Created', field: 'created'}
      ],
      rows: window.rows,
      page: 1,
      per_page: 10
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("manholes/getDurations", {user: this.$route.params.id, manhole: this.$route.params.manhole});
  },
  computed: {
    ...mapState({
      manholedurations: state => state.manholes.manholedurations,
    })
  },
  methods: {
    getUser() {
      let user = this.$store.getters['users/getUser'](this.$route.params.id);
      return user ? user.first_name + " " + user.last_name : ""
    },
    getManhole() {
      let manhole = this.$store.getters['manholes/getManhole'](this.$route.params.manhole);
      return manhole ? manhole.number : ""
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper .search .input form input {
  padding: 15px
}
</style>


