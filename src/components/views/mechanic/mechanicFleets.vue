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
        <table class="table">
          <thead>
            <tr>
              <td><span class="dot"></span></td>
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
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>{{ fleet.name }}</td>
              <td>{{ fleet.humanUuid }}</td>
              <td>{{ fleet.vehicle_type.type }}</td>
              <td><span v-bind:class="fleet.status.color">{{ fleet.status.name }}</span></td>
              <td>12. 08. 2018</td>
              <td class="text-right">
                <a class="custom-btn text-white" data-toggle="modal" data-target="#showHistory" v-on:click="selectFleet(fleet)" style="padding-top: 5px; padding-bottom: 5px;">
                  Fault history</a>  
                <a class="custom-btn text-white" data-toggle="modal" data-target="#FixFleet" v-on:click="fixFleet(fleet)" style="padding-top: 5px; padding-bottom: 5px;">
                  Fix</a>
              </td>
            </tr>
            <tr v-if="fleets.length <= 0">
              <td colspan="7" class="text-center">No fleets Yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="FixFleet" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Fix Vechicle</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Fault Reason</label>
                <textarea rows="10" type="text" class="form-control" v-model="fault.reason"></textarea>
              </div>
              <div class="form-group">
                <label>Total Cost</label>
                <input type="number" class="form-control" v-model="fault.cost"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveFix()" data-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="showHistory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ fault.fleet.name }} history
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="detailBox">
              <div class="actionBox">
                  <ul class="commentList">
                      <li v-for="history in faultHistory" :key="history.id">
                          <div class="commentText">
                              <p>Total cost: <b>{{ history.cost | formatNumber }}</b></p>
                              <p class="">{{ history.reason }}</p> <span class="date sub-text">on {{ history.created | moment("dddd, MMMM Do YYYY") }}</span>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
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
        fleet: '',
        reason: '',
        cost: '',
        user: (JSON.parse(window.localStorage.getItem('user'))).user_id
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
        fleet: '',
        reason: '',
        user: (JSON.parse(window.localStorage.getItem('user'))).user_id,
        cost: ''
      }
    }
  }
};
</script>

<style>
</style>


