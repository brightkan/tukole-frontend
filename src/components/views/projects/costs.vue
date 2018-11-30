<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>{{ site.site_name }}</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="boq-list">
        <h3>Project Costs</h3>

        <table class="table">
          <thead>
            <tr>
              <td>Cost Name</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cost in costs" :key="cost.id" > 
              <td><span>1.</span> {{ cost.name }}</td>
              <td>{{ cost.value }}</td>
            </tr>
            <tr v-if="costs.length <= 0">
              <td colspan="6" class="text-center">No costs Yet</td>
            </tr>
          </tbody>
        </table>

        <p>
          Total Project cost
          
          <span>
            USD {{'0000000000' | formatNumber}}
          </span>
        </p>
      </div>
    </div>

  </section>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  created() {},
  mounted() {
    this.$store.dispatch("sites/loadCosts", window.localStorage.getItem("selectsite"));
  },
  computed: {
    ...mapState({
      site: state => state.sites.site,
      costs: state => state.sites.siteCosts
    }),
    ...mapGetters('sites', ['getCostTotal'])
  }
};
</script>

<style>
.boq-list {
  padding: 36px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  width: 100%;
}
.boq-list h3 {
  margin-top: 0;
}
.boq-list table tr {
  border-bottom: 1px solid #e0e0e0;
  border-top: none;
}
.boq-list thead tr td {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 15px 0;
}
.boq-list tbody tr td {
  color: #333;
  font-family: "Montserrat", sans-serif;
  padding: 15px 0;
  font-size: 12px;
  line-height: 15px;
}
.table tbody tr td span {
  /* color: #333; */
  font-size: 9px;
  line-height: 11px;
  /* padding: 0; */
  margin-right: 15px;
}
.boq-list > p {
  text-align: right;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin-top: 89px;
}
.boq-list > p span {
  background-color: #fff;
  border: 1px solid #256ae1;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 8px 13px;
  border-radius: 5px;
  margin-left: 15px;
}
.boq-list table tbody td span {
  color: #333;
  padding: 0;
  margin: 0;
  font-size: 12px;
  display: inline-block;
  min-width: 5%;
}
.text-danger td{
  color: red !important;
}
</style>


