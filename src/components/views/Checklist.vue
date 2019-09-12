<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="container search-wrapper">
      <div class="row search">
        <div class="input">
          <form method="get" action="/search">
            <input name="q" type="text" size="40" placeholder="Search..." v-model="filterTable">
          </form>
        </div>
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetChecklistItem()">Add Checklist item</button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-check"></i> CheckList</h3>

          <datatable :columns="table_columns" :data="checklist" :filter-by="filterTable">
            <template slot-scope="{ row }">
                <tr>
                  <td>{{ row.name }}</td>
                  <td>{{ row.type }}</td>
                  <td class="text-right">
                    <i class="fa fa-edit" v-on:click="editChecklistItem(row)"></i> 
                    <i class="fa fa-times" v-on:click="deleteChecklistItem(row)"></i>
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
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Checklist</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveChecklistItem">
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-12">
                    <mdc-textfield v-model="checklistItem.name" label="Checklist Name" required outline/>
                    <mdc-select v-model="checklistItem.type" label="Type" required outlined>
                      <option v-bind:value="'fleet'" :key="'1'">Fleet</option>
                      <option v-bind:value="'machine'" :key="'2'">Machine</option>
                    </mdc-select>
                  </div>
                </div>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised">{{ editMode ? 'Edit' : 'New'}} Checklist</button>
            </div>
          </form>
        </div>
      </div>
    </modal>

  </section>
</template>

<script>

import { mapState } from "vuex";

export default {
  data(router) {
    return {
      editMode: false,
      checklistItem: {
        name: "",
        workspace: window.localStorage.getItem("workspace"),
        type: ""
      },

      //dataTables implementation
      filterTable: '',
      table_columns: [
          {label: 'Name', field: 'name'},
          {label: 'Type', field: 'type'},
          {label: '', field: ''}
      ],
      rows: window.rows,
      page: 1,
      per_page: 10
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("checklist/loadChecklist");
  },
  computed: {
    ...mapState({
      checklist: state => state.checklist.checklist
    })
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveChecklistItem() {
      const { checklistItem } = this;
      this.$modal.hide("modal");
      if(this.editMode){
        this.$store.dispatch("checklist/updateChecklistItem", checklistItem);
      }else{
        this.$store.dispatch("checklist/addChecklistItem", checklistItem);
      }
    },
    editChecklistItem(checklistItem){
      this.$modal.show("modal");
      this.editMode = true;
      this.checklistItem = Object.assign({}, checklistItem);
    },
    deleteChecklistItem(checklistItem){
      if (confirm(`are you sure you want to delete ${checklistItem.name}?`)) {
          this.$store.dispatch("checklist/deleteChecklistItem", checklistItem);
      }
    },
    resetChecklistItem(){
      this.editMode = false;
      this.checklistItem = {
        name: "",
        workspace: window.localStorage.getItem("workspace"),
        type: ""
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper .search .input form input {
  padding: 15px
}
</style>


