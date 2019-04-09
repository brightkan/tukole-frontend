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
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetTool()">Add Tool</button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-wrench"></i> Tools</h3>
          <table>
            <thead>
              <tr v-if="getTools.length > 0">
                <td>Tool</td>
                <td>Serial Number</td>
                <td>Type</td>
                <td>status</td>
                <td>Creation Date</td>
                <td>History</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in getTools" :key="tool.id">
                <td>{{ tool.name }}</td>
                <td>{{ tool.humanUuid }}</td>
                <td>{{ tool.type.type }}</td>
                <td><span v-bind:class="tool.status.color">{{ tool.status.name }}</span></td>
                <td>{{ tool.created | moment("DD, MM, YY") }}</td>
                <td>
                  <a class="custom-btn text-white" data-toggle="modal" data-target="#showFaultHistory" v-on:click="selectFaultHistory(tool)" style="padding-top: 5px; padding-bottom: 5px;">
                    Fault</a>  
                  <a class="custom-btn text-white" data-toggle="modal" data-target="#showHistory" v-on:click="selectAssignmentHistory(tool)" style="padding-top: 5px; padding-bottom: 5px;">
                    Assignment</a> 
                </td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editTool(tool)"></i> 
                  <i class="fa fa-times" v-on:click="deleteTool(tool)"></i>
                </td>
              </tr>
              <tr v-if="getTools.length <= 0">
                <td colspan="7" class="text-center">No Tools Yet</td>
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
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Tool</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveTool"> 
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="tool.name" label="Tool Name" required outline/>
                    <mdc-select v-model="tool.type" label="Type" required outlined>
                      <option v-for="tool_type in tool_types" v-bind:value="tool_type.id" :key="tool_type.id">
                        {{ tool_type.type }}
                      </option>
                    </mdc-select>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="tool.humanUuid" label="Serial Number" required outline/>
                    <mdc-select v-model="tool.status" label="Status" required outlined>
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
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} Tool</button>
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
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data(router) {
    return {
      selectedItem: {

      },
      editMode: false,
      tool: {
        name: "",
        type: "",
        humanUuid: "",
        status: 'available', 
        workspace: window.localStorage.getItem("workspace")
      }
    };
  },
  created() {},
  mounted() {
    this.$emit("customEventForValChange", this.$route.path);
    this.$store.dispatch("tools/loadTools");
  },
  computed: {
    ...mapState({
      tool_types: state => state.tools.tool_types,
      statuses: state => state.statuses
    }),
    ...mapGetters('tools', ['getTools', 'assignmentHistory', 'faultHistory'])
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveTool() {
      const { tool } = this;
      this.$modal.hide("modal");
      if(this.editMode){
        this.$store.dispatch("tools/updateTool", tool);
      }else{
        this.$store.dispatch("tools/addTool", tool);
      }
    },
    filter(type){
      if(type === 'broken'){
        this.$store.commit('tools/CHANGE_LIST_TYPE', 'broken_down')
      }else if(type === 'assigned'){
        this.$store.commit('tools/CHANGE_LIST_TYPE', 'assigned')
      }else if(type === 'available'){
        this.$store.commit('tools/CHANGE_LIST_TYPE', 'available')
      }else{
        this.$store.commit('tools/CHANGE_LIST_TYPE', 'all')
      }
    },
    editTool(tool){
      this.editMode = true;
      this.$modal.show("modal");
      let data = Object.assign({}, tool);
      data.type = "" + tool.type.id;
      data.status = tool.status.name;
      this.tool = data
    },
    deleteTool(tool){
      if (confirm(`are you sure you want to delete ${tool.name}?`)) {
          this.$store.dispatch("tools/deleteTool", tool);
      }
    },
    resetTool(){
      this.editMode = false;
      this.tool = {
        name: '',
        uuid: 'null',
        humanUuid: '',
        status: '',
        workspace: window.localStorage.getItem("workspace")
      }
    },
    selectAssignmentHistory(tool){
      this.selectedItem = tool;
      this.$store.commit("tools/SET_ASSIGNMENT_HISTORY", []);
      this.$store.dispatch("tools/getHistory", tool.id);
    },
    selectFaultHistory(tool){
      this.selectedItem = tool;
      this.$store.commit("tools/SET_HISTORY", []);
      this.$store.dispatch("tools/getRepairHistory", {id: tool.id, type: 'tool'});
    }
  }
};
</script>


