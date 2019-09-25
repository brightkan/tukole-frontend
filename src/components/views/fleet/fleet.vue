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
              <input name="q" type="text" size="40" placeholder="Search..." v-model="filterTable">
            </form>
          </div>
          <button v-if="$store.state.user_role != 'management'"
            class="mdc-button mdc-button--raised"
            v-on:click="showForm();resetFleet()"
          >Add Fleet</button>
        </div>
      </div>

      <!-- /.row -->

      <div class="row">
        <div class="col-md-3">
          <div class="summary-card row" style="background-color: #003d8f">
            <span>
              <i class="fa fa-truck"></i>
            </span>
            <div class="col-md-12">
              <h3>{{ totalVehicles }}</h3>
              <p>Total number of vehicles</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="summary-card row" style="background-color: #0058d5">
            <span>
              <i class="fa fa-plus"></i>
            </span>
            <div class="col-md-12">
              <h3>{{ availableVehicles.length }}</h3>
              <p>Available vehicles</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="summary-card row" style="background-color: #ff9a24">
            <span>
              <i class="fa fa-check"></i>
            </span>
            <div class="col-md-12">
              <h3>{{ assignedVehicles.length }}</h3>
              <p>Assigned vehicles</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="summary-card row" style="background-color: #fd7070">
            <span>
              <i class="fa fa-cogs"></i>
            </span>
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
            <h3>
              <i class="fa fa-truck"></i> Fleet
            </h3>
            <datatable :columns="table_columns" :data="getFleets" :filter-by="filterTable">
              <template slot-scope="{ row }">
                <tr>
                  <td>{{ row.name }}</td>
                  <td>{{ row.humanUuid }}</td>
                  <td>{{ row.vehicle_type.type }}</td>
                  <td>
                    <span v-bind:class="row.status.color">{{ row.status.name.replace('_', ' ') }}</span>
                  </td>
                  <td>{{ row.created | moment("DD. MM. YY") }}</td>
                  <td>
                    <a
                      class="custom-btn text-white"
                      data-toggle="modal"
                      data-target="#showFaultHistory"
                      v-on:click="selectFaultHistory(row)"
                      style="padding-top: 5px; padding-bottom: 5px;"
                    >Fault</a>
                    <a
                      class="custom-btn text-white"
                      data-toggle="modal"
                      data-target="#showHistory"
                      v-on:click="selectAssignmentHistory(row)"
                      style="padding-top: 5px; padding-bottom: 5px;"
                    >Assignment</a>
                  </td>
                  <td v-if="$store.state.user_role != 'management'" class="text-right">
                    <i class="fa fa-edit" v-on:click="editFleet(row)"></i>
                    <i class="fa fa-times" v-on:click="deleteFleet(row)"></i>
                  </td>
                </tr>
              </template>
            </datatable>
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
                      <mdc-textfield v-model="fleet.name" label="Vehicle" required outline/>
                      <mdc-select v-model="fleet.vehicle_type" label="Type" required outlined>
                        <option
                          v-for="fleet_type in fleet_types"
                          v-bind:value="fleet_type.id"
                          :key="fleet_type.id"
                        >{{ fleet_type.type }}</option>
                      </mdc-select>
                    </div>
                    <div class="col-md-6">
                      <mdc-textfield
                        v-model="fleet.humanUuid"
                        label="Number Plate"
                        required
                        outline
                      />
                      <mdc-select v-model="fleet.status" label="Status" required outlined>
                        <option
                          v-for="status in statuses"
                          v-bind:value="status.name"
                          :key="status.id"
                        >{{ status.name }}</option>
                      </mdc-select>
                    </div>
                  </div>

                  <p class="note">
                    <span>Note:</span> Make sure the details above are accurate and correct.
                  </p>
                </div>
              </div>
              <div class="modal-footer">
                <button class="mdc-button mdc-button--raised">{{ editMode ? 'Edit' : 'New'}} Fleet</button>
              </div>
            </form>
          </div>
        </div>
      </modal>

      <!-- Modal -->
      <div
        class="modal fade"
        id="showHistory"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ selectedItem.name }} history</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="detailBox">
                <div class="actionBox">
                  <ul class="commentList">
                    <li v-for="item in history" :key="item.id">
                      <div class="commentText">
                        <p class>Assigned to {{ item.assigned_to }}</p>
                        <span
                          class="date sub-text"
                        >from {{ item.from | moment("dddd, MMMM Do YYYY") }}</span>
                        <span>to {{ item.to | moment("dddd, MMMM Do YYYY") }}</span>
                        <hr>
                        <b>CheckList Results</b>
                        <div class="row">
                          <div class="col-md-6">
                            <p>Before</p>
                            <ul v-for="listItem in item.checklistResultBefore" :key="listItem.id">
                              <li>{{listItem.checklist.name}}</li>
                            </ul>
                          </div>
                          <div class="col-md-6">
                            <p>After</p>
                            <ul v-for="listItem in item.checklistResultAfter" :key="listItem.id">
                              <li>{{listItem.checklist.name}}</li>
                            </ul>
                          </div>
                        </div>
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
      <div
        class="modal fade"
        id="showFaultHistory"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ selectedItem.name }} history</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="detailBox">
                <div class="actionBox">
                  <ul class="commentList">
                    <li v-for="history in repairHistory" :key="history.id">
                      <div class="commentText">
                        <b>Asssessment: </b>{{ history.assessment }}<br>
                        <b>Requisition: </b>{{ history.requisition_materials }}<br>
                        <span>{{ history.repairs_verified ? "fixed" : "pending fix"}}</span>
                        <span class="float-right date sub-text">{{ history.created | moment("dddd, MMMM Do YYYY") }}</span>
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
      history: "",
      repairHistory: "",
      selectedItem: {},
      editMode: false,
      fleet: {
        name: "",
        vehicle_type: "",
        uuid: "null",
        humanUuid: "",
        status: "",
        workspace: window.localStorage.getItem("workspace")
      },

      //dataTables implementation
      filterTable: "",
      table_columns: [
        { label: "Vehicle", field: "name" },
        { label: "Number Plate", field: "humanUuid" },
        { label: "Type", field: "type.type" },
        { label: "Status", field: "status" },
        { label: "Creation Date", field: "created" },
        { label: "History", field: "" },
        { label: "", field: "" }
      ],
      rows: window.rows,
      page: 1,
      per_page: 10
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch(
      "users/loadUsers",
      window.localStorage.getItem("workspace")
    );
    this.$store.dispatch("fleets/loadFleets");

    this.$store.commit("fleets/SET_ASSIGNMENT_HISTORY", []);
    this.$store.dispatch("fleets/getHistory");
    this.$store.commit("fleets/SET_HISTORY", []);
    this.$store.dispatch("fleets/getRepairHistory");
  },
  computed: {
    ...mapState({
      fleets: state => state.fleets.fleets,
      fleet_types: state => state.fleets.fleet_types,
      statuses: state => state.statuses
    }),
    ...mapGetters("fleets", [
      "totalVehicles",
      "availableVehicles",
      "assignedVehicles",
      "brokenDownVehicles",
      "getFleets",
      "faultHistory"
    ])
  },
  methods: {
    getHistory(id) {
      this.history = this.$store.getters["fleets/assignmentHistory"](id);
    },
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveFleet() {
      const { fleet } = this;
      this.$modal.hide("modal");
      if (this.editMode) {
        this.$store.dispatch("fleets/updateFleet", fleet);
      } else {
        this.$store.dispatch("fleets/addFleet", fleet);
      }
    },
    filter(type) {
      if (type === "broken") {
        this.$store.commit("fleets/CHANGE_LIST_TYPE", "broken_down");
      } else if (type === "assigned") {
        this.$store.commit("fleets/CHANGE_LIST_TYPE", "assigned");
      } else if (type === "available") {
        this.$store.commit("fleets/CHANGE_LIST_TYPE", "available");
      } else {
        this.$store.commit("fleets/CHANGE_LIST_TYPE", "all");
      }
    },
    deleteFleet(fleet) {
      if (confirm(`are you sure you want to delete ${fleet.name}?`)) {
        this.$store.dispatch("fleets/deleteFleet", fleet);
      }
    },
    editFleet(fleet) {
      this.editMode = true;
      this.$modal.show("modal");
      this.fleet = Object.assign({}, fleet);
      this.fleet.vehicle_type = fleet.vehicle_type.id;
      this.fleet.status = fleet.status.name;
    },
    resetFleet() {
      this.editMode = false;
      this.fleet = {
        name: "",
        vehicle_type: "",
        uuid: "null",
        humanUuid: "",
        status: "",
        workspace: window.localStorage.getItem("workspace")
      };
    },
    selectAssignmentHistory(fleet) {
      this.selectedItem = fleet;
      /* this.$store.commit("fleets/SET_ASSIGNMENT_HISTORY", []);
      this.$store.dispatch("fleets/getHistory", fleet.id); */
      this.getHistory(fleet.id);
    },
    selectFaultHistory(fleet) {
      this.selectedItem = fleet;
      /* this.$store.commit("fleets/SET_HISTORY", []);
      this.$store.dispatch("fleets/getRepairHistory", {
        id: fleet.id,
        type: "fleet"
      }); */
      this.repairHistory = this.$store.getters["fleets/faultHistory"](fleet.id, "fleet");
    }
  }
};
</script>



