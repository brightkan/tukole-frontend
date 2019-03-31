<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-9">
        <h3>Performance Metrics</h3>
      </div>

      <div class="comp-title col-md-3">
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetType()">
          Add Metric
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-list"></i> Metrics</h3>
          <table>
            <thead>
              <tr v-if="metrics.length > 0">
                <td>Team</td>
                <td>Action</td>
                <td>Min Time</td>
                <td>Max Time</td>
                <td>Points</td>
                <td>Created At</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="metric in metrics" :key="metric.id">
                <td>{{ metric.team }}</td>
                <td>{{ metric.action }}</td>
                <td>{{ metric.min_time }}</td>
                <td>{{ metric.max_time }}</td>
                <td>{{ metric.points }}</td>
                <td>{{ metric.created | moment("DD, MM, YY") }}</td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editMetric(metric)"></i> 
                  <i class="fa fa-times" v-on:click="deleteMetric(metric)"></i>
                </td>
              </tr>
              <tr v-if="metrics.length <= 0">
                <td colspan="7" class="text-center">No Metrics yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <modal name="modal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Metric</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveMetric"> 
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="metric.team" label="Team" required outline/>
                    <mdc-textfield v-model="metric.min_time" type="number" label="Min Time" required outline/>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="metric.action" label="Action" required outline/>
                    <mdc-textfield v-model="metric.max_time" type="number" label="Max Time" required outline/>
                  </div>
                </div>

                <mdc-textfield v-model="metric.points" type="number" label="points" required outline/>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} Metric</button>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </section>
</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data(router) {
    return {
      editMode: false,
      metric: {
        team: "",
        action: "",
        min_time: 0,
        max_time: 0,
        points: 0
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("metrics/loadMetrics");
  },
  computed: {
    ...mapState('metrics',["metrics"])
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveMetric() {
      const { metric } = this;
      this.$modal.hide("modal");
      if(this.editMode){
        this.$store.dispatch("metrics/updateMetric", metric);
      }else{
        this.$store.dispatch("metrics/addMetric", metric);
      }
    },
    editMetric(metric){
      this.editMode = true;
      this.$modal.show("modal");
      this.metric = Object.assign({}, metric);
    },
    deleteMetric(metric){
      if (confirm(`are you sure you want to delete ${metric.action}?`)) {
          this.$store.dispatch("metrics/deleteMetric", metric);
      }
    },
    resetMetric(){
      this.editMode = false;
      this.metric = {
        team: "",
        action: "",
        min_time: 0,
        max_time: 0,
        points: 0
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mdc-button.mdc-button--raised{
  background-color: #256ae1;
}
</style>


