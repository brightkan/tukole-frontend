<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="container search-wrapper">
      <div class="row search">
        <div class="input">
          <mdc-select label="All">
            <option v-on:click="filter('all')">All</option>
          </mdc-select>
          <form method="get" action="/search">
            <input name="q" type="text" size="40" placeholder="Search..." v-model="filterTable">
          </form>
        </div>
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetTool()">Assign Tool</button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-wrench"></i> Tools</h3>
          
          <datatable :columns="table_columns" :data="getToolAssignments" :filter-by="filterTable">
            <template scope="{ row }">
                <tr>
                  <td>{{ row.toolname }}</td>
                  <td>{{ row.username }}</td>
                  <td>{{ row.created | moment("DD, MM, YY") }}</td>
                  <td class="text-right">
                    <i class="fa fa-edit" v-on:click="editTool(row)"></i> 
                    <i class="fa fa-times" v-on:click="deleteTool(row)"></i>
                  </td>
                </tr>
            </template>
          </datatable>

          <!-- <table>
            <thead>
              <tr v-if="getToolAssignments.length > 0">
                <td>Tool</td>
                <td>User</td>
                <td>Assignment Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in getToolAssignments" :key="tool.id">
                <td>{{ tool.toolname }}</td>
                <td>{{ tool.username }}</td>
                <td>{{ tool.created | moment("DD, MM, YY") }}</td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editTool(tool)"></i> 
                  <i class="fa fa-times" v-on:click="deleteTool(tool)"></i>
                </td>
              </tr>
              <tr v-if="getToolAssignments.length <= 0">
                <td colspan="7" class="text-center">No Tools Assignments Yet</td>
              </tr>
            </tbody>
          </table> -->
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
                    <mdc-select v-model="toolAssignment.user" label="User" required outlined>
                      <option v-for="user in users" v-bind:value="user.id" :key="user.id">
                        {{ user.first_name }} {{ user.last_name }}
                      </option>
                    </mdc-select>
                  </div>
                  <div class="col-md-6">
                    <mdc-select v-model="toolAssignment.tool" label="Tool" required outlined>
                      <option v-for="tool in tools" v-bind:value="tool.id" :key="tool.id">
                        {{ tool.name }}
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
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} Tool Assignment</button>
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
      toolAssignment: {
        user: "",
        tool: ""
      },

      //dataTables implementation
      filterTable: '',
      table_columns: [
          {label: 'Tool', field: 'toolname'},
          {label: 'User', field: 'username'},
          {label: 'Assignment Date', field: 'created'},
          {label: '', field: ''}
      ],
      rows: window.rows,
      page: 1,
      per_page: 10
    };
  },
  created() {},
  mounted() {
    this.$emit("customEventForValChange", this.$route.path);
    this.$store.dispatch("tools/loadToolAssignments");
  },
  computed: {
    ...mapState({
      users: state => state.users.users,
      tools: state => state.tools.tools
    }),
    ...mapGetters('tools', ['getToolAssignments'])
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveTool() {
      const { toolAssignment } = this;
      this.$modal.hide("modal");
      if(this.editMode){
        this.$store.dispatch("tools/updateToolAssignment", toolAssignment);
      }else{
        this.$store.dispatch("tools/addToolAssignment", toolAssignment);
      }
    },
    filter(type){
      //....
    },
    editTool(toolAssignment){
      this.editMode = true;
      this.$modal.show("modal");
      let data = Object.assign({}, toolAssignment);
      data.type = "" + toolAssignment.type.id;
      data.status = toolAssignment.status.name;
      this.toolAssignment = data
    },
    deleteTool(toolAssignment){
      if (confirm(`are you sure you want to delete ${toolAssignment.name}?`)) {
          this.$store.dispatch("tools/deleteToolAssignment", toolAssignment);
      }
    },
    resetTool(){
      this.editMode = false;
      this.toolAssignment = {
        user: "",
        tool: ""
      }
    }
  }
};
</script>


