<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-9">
        <h3>Fleet types</h3>
      </div>

      <div class="comp-title col-md-3">
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetType()">
          Add fleet type
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-list"></i> Types</h3>
          <table>
            <thead>
              <tr v-if="fleet_types.length > 0">
                <td>Type</td>
                <td>Description</td>
                <td>Creation Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="type in fleet_types" :key="type.id">
                <td>{{ type.type }}</td>
                <td>{{ type.description }}</td>
                <td>12. 08. 2018</td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editType(type)"></i> 
                  <i class="fa fa-times" v-on:click="deleteType(type)"></i>
                </td>
              </tr>
              <tr v-if="fleet_types.length <= 0">
                <td colspan="7" class="text-center">No fleet types yet</td>
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
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} fleet type</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveType"> 
            <div class="modal-body">
              <div>
                <mdc-textfield v-model="type.type" label="Type Name" required outline/>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} fleet type</button>
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
      type: {
        type: "",
        description: "Vehicle type"
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("fleets/loadFleetTypes");
  },
  computed: {
    ...mapState('fleets',["fleet_types"])
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveType() {
      const { type } = this;
      this.$modal.hide("modal");
      type.description = "Vehicle type"
      if(this.editMode){
        this.$store.dispatch("fleets/updateType", type);
      }else{
        this.$store.dispatch("fleets/addType", type);
      }
    },
    editType(type){
      this.editMode = true;
      this.$modal.show("modal");
      this.type = Object.assign({}, type);
    },
    deleteType(type){
      if (confirm(`are you sure you want to delete ${type.type}?`)) {
          this.$store.dispatch("fleets/deleteType", type);
      }
    },
    resetType(){
      this.editMode = false;
      this.type = {
        type: "",
        description: ""
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mdc-button.mdc-button--raised{
  background-color: #256ae1;
}
</style>


