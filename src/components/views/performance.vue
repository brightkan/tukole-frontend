<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="container search-wrapper">
      <div class="row search">
        <div class="input">
          <mdc-select label="Type">
            <option v-on:click="filter('all')">Select</option>
          </mdc-select>
          <form method="get" action="/search">
            <input name="q" type="text" size="40" placeholder="Search..." v-model="filter">
          </form>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-wrench"></i> User Performance</h3>
          <datatable :columns="table_columns" :data="userMetrics" :filter-by="filter">
            <template scope="{ row }">
                <tr>
                    <td>{{ row.user.first_name }} {{ row.user.last_name }}</td>
                    <td>{{ row.site.site_name }}</td>
                    <td>{{ row.metric.action }}</td>
                    <td>{{ row.points }}</td>
                </tr>
            </template>
          </datatable>
        </div>
      </div>
    </div>

    <div class="container pagination-container">
        <div class="form-inline">
            <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
        </div>
    </div>

  </section>
</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data(router) {
    return {
      filter: '',
      table_columns: [
          {label: 'User', representedAs: function (metric) {
                  return metric.user.first_name + ' ' + metric.user.last_name 
              }, sortable: false
          },
          {label: 'Site', field: 'site.site_name'},
          {label: 'Metric', field: 'metric.action'},
          {label: 'Points', field: 'points'}
      ],
      rows: window.rows,
      page: 1,
      per_page: 10
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("metrics/loadUserMetrics");
  },
  computed: {
    ...mapState({
      userMetrics: state => state.metrics.userMetrics
    })
  },
  methods: {}
};
</script>


