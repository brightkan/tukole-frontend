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
                <td v-if="$store.state.user_role != 'management'"></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fleet in brokenDownVehicles" :key="fleet.id">
                <td>{{ fleet.name }}</td>
                <td>{{ fleet.humanUuid }}</td>
                <td>{{ fleet.vehicle_type.type }}</td>
                <td><span v-bind:class="fleet.status.color">{{ fleet.status.name.replace('_', ' ') }}</span></td>
                <td>12. 08. 2018</td>
                <td v-if="$store.state.user_role != 'management'" class="text-right"> 
                  <a class="custom-btn text-white" v-on:click="showForm();fixFleet(fleet)" style="padding-top: 5px; padding-bottom: 5px;">
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
    <modal name="modal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">Fix Vechicle</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveFix"> 
            <div class="modal-body">
              <div>
                <mdc-textfield v-model="fault.reason" label="Fault Reason" multiline fullwidth required outline/>
                <mdc-textfield v-model="fault.cost" label="Total Cost" type="number" required outline/>
                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >Save</button>
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
      fault: {
        type: 'fault_fix',
        fleet: '',
        reason: '',
        fleet_type: 'fleet',
        cost: ''
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
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveFix() {
      const { fault } = this;
      this.$modal.hide("modal");
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



