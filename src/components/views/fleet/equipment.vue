<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Machines</h3>
      </div>

      <div class="comp-title col-md-3">
        <label id="img_category_label" class="field" for="img_category" data-value="">
          <span>Status</span>
          <div id="img_category" class="psuedo_select" name="img_category">
            <span class="selected"></span>
            <ul id="img_category_options" class="options">
              <li class="option" data-value="opt_1" v-on:click="filter('available')">Available</li>
              <li class="option" data-value="opt_2" v-on:click="filter('broken')">Broken Down</li>
              <li class="option" data-value="opt_3" v-on:click="filter('assigned')" >Assigned</li>
              <li class="option" data-value="opt_4" v-on:click="filter('all')" >All</li>
            </ul>
          </div>
        </label>
      </div>

      <div class="comp-title col-md-5">
        <form method="get" action="/search" class="fleet_search">
          <input name="q" type="text" size="40" placeholder="Search..." />
        </form>
      </div>

      <div class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addMachinery" v-on:click="resetMachine()">
          Add Machine
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <td>Machine</td>
              <td>Serial Number</td>
              <td>Type</td>
              <td>status</td>
              <td>Creation Date</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="machine in getMachines" :key="machine.id">
              <td>{{ machine.name }}</td>
              <td>{{ machine.humanUuid }}</td>
              <td>Grader</td>
              <td><span v-bind:class="machine.status.color">{{ machine.status.name }}</span></td>
              <td>{{ machine.created | moment("DD. MM. YY") }}</td>
              <td>
                <a class="custom-btn text-white" data-toggle="modal" data-target="#showFaultHistory" v-on:click="selectFaultHistory(machine)" style="padding-top: 5px; padding-bottom: 5px;">
                  Fault history</a>  
                <a class="custom-btn text-white" data-toggle="modal" data-target="#showHistory" v-on:click="selectAssignmentHistory(machine)" style="padding-top: 5px; padding-bottom: 5px;">
                  show history</a>  
              </td>
              <td class="text-right">
                <i class="fa fa-edit" v-on:click="editMachine(machine)" data-toggle="modal" data-target="#addMachinery"></i> 
                <i class="fa fa-times" v-on:click="deleteMachine(machine)"></i>
              </td>
            </tr>
            <tr v-if="machines.length <= 0">
              <td colspan="7" class="text-center">No Machines Yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addMachinery" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'Add'}} Machine</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Machine Name</label>
                <input type="text" class="form-control" v-model="machine.name"/>
              </div>
              <div class="form-group">
                <label>Serial number</label>
                <input type="text" class="form-control"  v-model="machine.humanUuid"/>
              </div>
              <div class="form-group">
                <label>Status</label>
                <select class="form-control" v-model="machine.status">
                  <option v-for="status in statuses" v-bind:value="status.name" :key="status.id">
                    {{ status.name }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveMachine" data-dismiss="modal">
              {{ editMode ? 'Edit' : 'Add'}} Machine
            </button>
          </div>
        </div>
      </div>
    </div>

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
      machine: {
        name: '',
        uuid: 'null',
        humanUuid: '',
        status: '',
        workspace: window.localStorage.getItem("workspace")
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("machinery/loadMachines");
  },
  computed: {
    ...mapState({
      machines: state => state.machinery.machines,
      statuses: state => state.statuses
    }),
    ...mapGetters('machinery', ['getMachines', 'assignmentHistory', 'faultHistory'])
  },
  methods: {
    saveMachine() {
      const { machine } = this;
      
      if(this.editMode){
        this.$store.dispatch("machinery/updateMachine", machine);
      }else{
        this.$store.dispatch("machinery/addMachine", machine);
      }
    },
    filter(type){
      if(type === 'broken'){
        this.$store.commit('machinery/CHANGE_LIST_TYPE', 'broken_down')
      }else if(type === 'assigned'){
        this.$store.commit('machinery/CHANGE_LIST_TYPE', 'assigned')
      }else if(type === 'available'){
        this.$store.commit('machinery/CHANGE_LIST_TYPE', 'available')
      }else{
        this.$store.commit('machinery/CHANGE_LIST_TYPE', 'all')
      }
    },
    editMachine(machine){
      this.editMode = true;
      this.machine = Object.assign({}, machine);
      this.machine.status = machine.status.name;
    },
    deleteMachine(machine){
      if (confirm(`are you sure you want to delete ${machine.name}?`)) {
          this.$store.dispatch("machinery/deleteMachine", machine);
      }
    },
    resetMachine(){
      this.editMode = false;
      this.machine = {
        name: '',
        uuid: 'null',
        humanUuid: '',
        status: '',
        workspace: window.localStorage.getItem("workspace")
      }
    },
    selectAssignmentHistory(machine){
      this.selectedItem = machine;
      this.$store.commit("machinery/SET_ASSIGNMENT_HISTORY", []);
      this.$store.dispatch("machinery/getHistory", machine.id);
    },
    selectFaultHistory(machine){
      this.selectedItem = machine;
      this.$store.commit("machinery/SET_HISTORY", []);
      this.$store.dispatch("machinery/getRepairHistory", {id: machine.id, type: 'machinery'});
    }
  }
};
</script>

<style>
.comp-title button {
  width: 100%;
}
.comp-title button,
.custom-btn {
  background-color: #256ae1;
  color: white;
  padding: 10px 30px;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  border-radius: 20px;
  border: none;
}
.table tbody tr td:last-child i{
  margin-right: 15px;
  cursor: pointer;
  color: #333
}
.modal-dialog {
  width: 500px;
}
.modal-title {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  display: inline-block;
}
.modal-header {
  border-bottom: none;
  padding: 30px 40px;
}
.modal-body > .row {
  padding: 0 25px;
}
.upload-img-text {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
}
.upload-image {
  background-image: url("http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg");
  background-position: center;
  background-size: cover;
  height: 113px;
  width: 179px;
}
.modal-body form {
  padding: 36px 25px;
  padding-bottom: 0;
}
.modal-body form .form-control {
  background-color: #f0f0f0;
  border: none;
}
.modal-body form label {
  color: #828282;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
}
.modal-footer button:nth-child(1) {
  box-sizing: border-box;
  width: 115px;
  border: 1px solid #256ae1;
  background-color: #fff;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  padding: 10px 40px;
}
.modal-footer button:nth-child(2) {
  box-sizing: border-box;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  padding: 10px 40px;
  background-color: #256ae1;
}
</style>


