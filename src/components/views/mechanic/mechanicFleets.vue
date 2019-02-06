<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>Faulty Fleets</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-truck"></i> Fleets</h3>

          <table>
            <thead>
              <tr v-if="brokenDownVehicles.length > 0">
                <td>Vehicle</td>
                <td>Serial Number</td>
                <td>Type</td>
                <td>status</td>
                <td>Creation Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fleet in brokenDownVehicles" :key="fleet.id">
                <td>{{ fleet.name }}</td>
                <td>{{ fleet.humanUuid }}</td>
                <td>{{ fleet.vehicle_type.type }}</td>
                <td><span v-bind:class="fleet.status.color">{{ fleet.status.name.replace('_', ' ') }}</span></td>
                <td>12. 08. 2018</td>
                <td class="text-right"> 
                  <a class="custom-btn text-white" data-toggle="modal" data-target="#FixFleet" v-on:click="fixFleet(fleet)" style="padding-top: 5px; padding-bottom: 5px;">
                    Fix</a>
                </td>
              </tr>
              <tr v-if="brokenDownVehicles.length <= 0">
                <td colspan="7" class="text-center">No fleets Yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="FixFleet" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Fix Vechicle</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <div class="form-group">
                    <label>Fault Reason</label>
                    <textarea rows="10" type="text" class="form-control" v-model="fault.reason"></textarea>
                  </div>
                  <div class="form-group">
                    <label>Total Cost</label>
                    <input type="number" class="form-control" v-model="fault.cost" pattern="[0-9]" required/>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" v-on:click="saveFix()" data-dismiss="modal">Save</button>
              </div>
            </form>
        </div>
      </div>
    </div>

  </section>
</div>
</template>

<script>
import { select } from "../../mixins/select";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
 
export default {
  mixins: [select],
  data(router) {
    return {
      fault: {
        type: 'fault_fix',
        fleet: '',
        reason: '',
        fleet_type: 'fleet',
        cost: '00'
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("fleets/loadFleets");
  },
  computed: {
    ...mapState({
      fleets: state => state.fleets.fleets,
      fleet_types: state => state.fleets.fleet_types,
      statuses: state => state.statuses
    }),
    ...mapGetters('fleets', ['brokenDownVehicles', 'faultHistory'])
  },
  methods: {
    saveFix() {
      const { fault } = this;
      fault.fleet = fault.fleet.id
      this.$store.dispatch("fleets/saveFix", fault);
    },
    selectFleet(fleet){
      this.fault.fleet = fleet
      this.$store.commit("fleets/SET_HISTORY", []);
      this.$store.dispatch("fleets/getFleetHistory", fleet.id);
    },
    fixFleet(fleet){
      this.fault.fleet = fleet
    },
    resetFix(){
      this.fleet = {
        type: 'fault_fix',
        fleet: '',
        reason: '',
        fleet_type: 'fleet',
        cost: ''
      }
    }
  }
};
</script>

<style>
</style>


