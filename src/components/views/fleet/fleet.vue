<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="container search-wrapper">
      <div class="row search">
        <div class="input">
          <mdc-select label="Status">
            <option v-on:click="filter('available')">Available</option>
            <option v-on:click="filter('broken')">Broken Down</option>
            <option v-on:click="filter('assigned')">Assigned</option>
            <option v-on:click="filter('all')">All</option>
          </mdc-select>
          <form method="get" action="/search">
            <input name="q" type="text" size="40" placeholder="Search...">
          </form>
        </div>
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetFleet()">Add Fleet</button>
      </div>
    </div>

    <!-- /.row -->

    <div class="row">
      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #003d8f">
          <span><i class="fa fa-truck"></i></span>
          <div class="col-md-12">
            <h3>{{ totalVehicles }}</h3>
            <p>Total number of vehicles</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #0058d5">
          <span><i class="fa fa-plus"></i></span>
          <div class="col-md-12">
            <h3>{{ availableVehicles.length }}</h3>
            <p>Available vehicles</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #ff9a24">
          <span><i class="fa fa-check"></i></span>
          <div class="col-md-12">
            <h3>{{ assignedVehicles.length }}</h3>
            <p>Assigned vehicles</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #fd7070">
          <span><i class="fa fa-cogs"></i></span>
          <div class="col-md-12">
            <h3>{{ brokenDownVehicles.length }}</h3>
            <p>Broken down vehicles</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-truck"></i> Fleet</h3>
          <table>
            <thead>
              <tr v-if="fleets.length > 0">
                <td>Vehicle</td>
                <td>Serial Number</td>
                <td>Type</td>
                <td>status</td>
                <td>Creation Date</td>
                <td>History</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fleet in getFleets" :key="fleet.id">
                <td>{{ fleet.name }}</td>
                <td>{{ fleet.humanUuid }}</td>
                <td>{{ fleet.vehicle_type.type }}</td>
                <td><span v-bind:class="fleet.status.color">{{ fleet.status.name.replace('_', ' ') }}</span></td>
                <td>{{ fleet.created | moment("DD. MM. YY") }}</td>
                <td>
                  <a class="custom-btn text-white" data-toggle="modal" data-target="#showFaultHistory" v-on:click="selectFaultHistory(fleet)" style="padding-top: 5px; padding-bottom: 5px;">
                    Fault</a>  
                  <a class="custom-btn text-white" data-toggle="modal" data-target="#showHistory" v-on:click="selectAssignmentHistory(fleet)" style="padding-top: 5px; padding-bottom: 5px;">
                    Assignment</a>  
                </td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editFleet(fleet)"></i> 
                  <i class="fa fa-times" v-on:click="deleteFleet(fleet)"></i>
                </td>
              </tr>
              <tr v-if="fleets.length <= 0">
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
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Fleet</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveFleet"> 
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="fleet.name" label="Fleet Name" required outline/>
                    <mdc-select v-model="fleet.vehicle_type" label="Type" required outlined>
                      <option v-for="fleet_type in fleet_types" v-bind:value="fleet_type.id" :key="fleet_type.id">
                        {{ fleet_type.type }}
                      </option>
                    </mdc-select>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="fleet.humanUuid" label="Serial Number" required outline/>
                    <mdc-select v-model="fleet.status" label="Status" required outlined>
                      <option v-for="status in statuses" v-bind:value="status.name" :key="status.id">
                        {{ status.name }}
                      </option>
                    </mdc-select>
                  </div>
                </div>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} Fleet</button>
            </div>
          </form>
        </div>
      </div>
    </modal>

    <!-- Modal -->
    <div class="modal fade" id="showHistory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ selectedItem.name }} history
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="detailBox">
              <div class="actionBox">
                  <ul class="commentList">
                      <li v-for="history in assignmentHistory" :key="history.id">
                          <div class="commentText">
                              <p class="">Assigned on</p> <span class="date sub-text">on {{ history.created | moment("dddd, MMMM Do YYYY") }}</span>
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

    <!-- Modal -->
    <div class="modal fade" id="showFaultHistory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ selectedItem.name }} history
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
      selectedItem: {},
      editMode: false,
      fleet: {
        name: '',
        vehicle_type: '',
        uuid: 'null',
        humanUuid: '',
        status: '',
        workspace: window.localStorage.getItem("workspace")
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("users/loadUsers", window.localStorage.getItem("workspace"));
    this.$store.dispatch("fleets/loadFleets");
  },
  computed: {
    ...mapState({
      fleets: state => state.fleets.fleets,
      fleet_types: state => state.fleets.fleet_types,
      statuses: state => state.statuses
    }),
    ...mapGetters('fleets', ['totalVehicles', 'availableVehicles', 'assignedVehicles', 'brokenDownVehicles', 'getFleets', 'assignmentHistory', 'faultHistory'])
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveFleet() {
      const { fleet } = this;
      this.$modal.hide("modal");
      if(this.editMode){
        this.$store.dispatch("fleets/updateFleet", fleet);
      }else{
        this.$store.dispatch("fleets/addFleet", fleet);
      }
    },
    filter(type){
      if(type === 'broken'){
        this.$store.commit('fleets/CHANGE_LIST_TYPE', 'broken_down')
      }else if(type === 'assigned'){
        this.$store.commit('fleets/CHANGE_LIST_TYPE', 'assigned')
      }else if(type === 'available'){
        this.$store.commit('fleets/CHANGE_LIST_TYPE', 'available')
      }else{
        this.$store.commit('fleets/CHANGE_LIST_TYPE', 'all')
      }
    },
    deleteFleet(fleet){
      if (confirm(`are you sure you want to delete ${fleet.name}?`)) {
          this.$store.dispatch("fleets/deleteFleet", fleet);
      }
    },
    editFleet(fleet){
      this.editMode = true;
      this.$modal.show("modal");
      this.fleet = Object.assign({}, fleet);
      this.fleet.vehicle_type = fleet.vehicle_type.id;
      this.fleet.status = fleet.status.name;
    },
    resetFleet(){
      this.editMode = false;
      this.fleet = {
        name: '',
        vehicle_type: '',
        uuid: 'null',
        humanUuid: '',
        status: '',
        workspace: window.localStorage.getItem("workspace")
      }
    },
    selectAssignmentHistory(fleet){
      this.selectedItem = fleet;
      this.$store.commit("fleets/SET_ASSIGNMENT_HISTORY", []);
      this.$store.dispatch("fleets/getHistory", fleet.id);
    },
    selectFaultHistory(fleet){
      this.selectedItem = fleet;
      this.$store.commit("fleets/SET_HISTORY", []);
      this.$store.dispatch("fleets/getRepairHistory", {id: fleet.id, type: 'fleet'});
    }
  }
};
</script>



