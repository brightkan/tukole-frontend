<template>
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
        <button
          class="mdc-button mdc-button--raised"
          v-on:click="showForm();resetMachine()"
        >Add Machine</button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3>
            <i class="fa fa-wrench"></i> Machines
          </h3>

          <datatable :columns="table_columns" :data="getMachines" :filter-by="filterTable">
            <template scope="{ row }">
              <tr>
                <td>{{ row.name }}</td>
                <td>{{ row.humanUuid }}</td>
                <td>{{ row.type.type }}</td>
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
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editMachine(row)"></i>
                  <i class="fa fa-times" v-on:click="deleteMachine(row)"></i>
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
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Machine</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveMachine">
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="machine.name" label="Machine Name" required outline/>
                    <mdc-select v-model="machine.type" label="Type" required outlined>
                      <option
                        v-for="machine_type in machine_types"
                        v-bind:value="machine_type.id"
                        :key="machine_type.id"
                      >{{ machine_type.type }}</option>
                    </mdc-select>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield
                      v-model="machine.humanUuid"
                      label="Serial Number"
                      required
                      outline
                    />
                    <mdc-select v-model="machine.status" label="Status" required outlined>
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
              <button class="mdc-button mdc-button--raised">{{ editMode ? 'Edit' : 'New'}} Machine</button>
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
                      <span class="date sub-text">from {{ item.from | moment("dddd, MMMM Do YYYY") }}</span>
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
                      <b>Asssessment:</b>
                      {{ history.assessment }}
                      <br>
                      <b>Requisition:</b>
                      {{ history.requisition_materials }}
                      <br>
                      <span>{{ history.repairs_verified ? "fixed" : "pending fix"}}</span>
                      <span
                        class="float-right date sub-text"
                      >{{ history.created | moment("dddd, MMMM Do YYYY") }}</span>
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
      machine: {
        name: "",
        uuid: "null",
        humanUuid: "",
        status: "",
        workspace: window.localStorage.getItem("workspace")
      },

      //dataTables implementation
      filterTable: "",
      table_columns: [
        { label: "Machine", field: "name" },
        { label: "Serial Number", field: "humanUuid" },
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
    this.$store.dispatch("machinery/loadMachines");

    this.$store.commit("machinery/SET_ASSIGNMENT_HISTORY", []);
    this.$store.dispatch("machinery/getHistory");
    this.$store.commit("machinery/SET_HISTORY", []);
    this.$store.dispatch("machinery/getRepairHistory");
  },
  computed: {
    ...mapState({
      machines: state => state.machinery.machines,
      statuses: state => state.statuses,
      machine_types: state => state.machinery.types
    }),
    ...mapGetters("machinery", [
      "getMachines",
      "assignmentHistory",
      "faultHistory"
    ])
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveMachine() {
      const { machine } = this;
      this.$modal.hide("modal");
      if (this.editMode) {
        this.$store.dispatch("machinery/updateMachine", machine);
      } else {
        this.$store.dispatch("machinery/addMachine", machine);
      }
    },
    filter(type) {
      if (type === "broken") {
        this.$store.commit("machinery/CHANGE_LIST_TYPE", "broken_down");
      } else if (type === "assigned") {
        this.$store.commit("machinery/CHANGE_LIST_TYPE", "assigned");
      } else if (type === "available") {
        this.$store.commit("machinery/CHANGE_LIST_TYPE", "available");
      } else {
        this.$store.commit("machinery/CHANGE_LIST_TYPE", "all");
      }
    },
    editMachine(machine) {
      this.editMode = true;
      this.$modal.show("modal");
      this.machine = Object.assign({}, machine);
      this.machine.status = machine.status.name;
    },
    deleteMachine(machine) {
      if (confirm(`are you sure you want to delete ${machine.name}?`)) {
        this.$store.dispatch("machinery/deleteMachine", machine);
      }
    },
    resetMachine() {
      this.editMode = false;
      this.machine = {
        name: "",
        uuid: "null",
        humanUuid: "",
        status: "",
        workspace: window.localStorage.getItem("workspace")
      };
    },
    selectAssignmentHistory(machine) {
      this.selectedItem = machine;
      //this.$store.commit("machinery/SET_ASSIGNMENT_HISTORY", []);
      //this.$store.dispatch("machinery/getHistory", machine.id);
      this.history = this.$store.getters["machinery/assignmentHistory"](
        machine.id
      );
    },
    selectFaultHistory(machine) {
      this.selectedItem = machine;
      //this.$store.commit("machinery/SET_HISTORY", []);
      //this.$store.dispatch("machinery/getRepairHistory", {id: machine.id, type: 'machinery'});
      this.repairHistory = this.$store.getters["machinery/faultHistory"](
        machine.id,
        "machine"
      );
    }
  }
};
</script>