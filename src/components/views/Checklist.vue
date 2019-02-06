<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Fleet Checklist</h3>
      </div>

      <div class="comp-title col-md-3">
        
      </div>

      <div class="comp-title col-md-5">
        <form method="get" action="/search" class="fleet_search">
          <input name="q" type="text" size="40" placeholder="Search..." />
        </form>
      </div>

      <div class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addChecklistItem" v-on:click="resetChecklistItem()">
          Add Checklist item
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-check"></i> CheckList</h3>
          <table>
            <thead>
              <tr v-if="checklist.length > 0">
                <td>Name</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in checklist" :key="item.id">
                <td>{{ item.name }}</td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editChecklistItem(item)" data-toggle="modal" data-target="#addChecklistItem"></i> 
                  <i class="fa fa-times" v-on:click="deleteChecklistItem(item)"></i>
                </td>
              </tr>
              <tr v-if="checklist.length <= 0">
                <td colspan="6" class="text-center">No Items Yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addChecklistItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'Add'}} Checklist</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>
                  Checklist Name</label>
                <input type="text" class="form-control" v-model="checklistItem.name"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveChecklistItem" data-dismiss="modal">
              {{ editMode ? 'Edit' : 'Add'}} Checklist
            </button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>

import { mapState } from "vuex";

export default {
  data(router) {
    return {
      editMode: false,
      checklistItem: {
        name: ""
      }
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
    saveChecklistItem() {
      const { checklistItem } = this;
      if(this.editMode){
        this.$store.dispatch("checklist/updateChecklistItem", checklistItem);
      }else{
        this.$store.dispatch("checklist/addChecklistItem", checklistItem);
      }
    },
    editChecklistItem(checklistItem){
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
        name: ""
      }
    }
  }
};
</script>

<style>

</style>


