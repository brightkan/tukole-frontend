<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="container search-wrapper">
      <div class="row search">
        <div class="input">
          <form method="get" action="/search">
            <input name="q" type="text" size="40" placeholder="Search...">
          </form>
        </div>
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetMaterial()">Add Material</button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-wrench"></i>  Materials</h3>
          <table>
            <thead>
              <tr v-if="materials.length > 0">
                <td>Material</td>
                <td>Measurement</td>
                <td>Running Out</td>
                <td>Unit Cost</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="material in materials" :key="material.id">
                <td>{{ material.name }}</td>
                <td style="text-transform: uppercase">{{ material.measurement }}</td>
                <td>{{ material.running_out ? "Running out" : "Available" }}</td>
                <td>{{ material.unit_cost }}</td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editMaterial(material)"></i> 
                  <i class="fa fa-times" v-on:click="deleteMaterial(material)"></i>
                </td>
              </tr>
              <tr v-if="materials.length <= 0">
                <td colspan="6" class="text-center">No Materials Yet</td>
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
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Material</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveMaterial"> 
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="material.name" label="Material Name" required outline/>
                    <mdc-select v-model="material.running_out" label="Running out" required outlined>
                      <option :value="true">True</option>
                      <option :value="false">False</option>
                    </mdc-select>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="material.unit_cost" label="Unit cost" type="number" required outline/>
                    <mdc-textfield v-model="material.measurement" label="Measurement" required outline/>
                  </div>
                </div>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} Material</button>
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
      material: {
        name: "",
        running_out: false,
        workspace: window.localStorage.getItem("workspace"),
        measurement: "",
        unit_cost: ""
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("materials/loadMaterials");
  },
  computed: {
    ...mapState({
      materials: state => state.materials.materials
    })
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveMaterial() {
      const { material } = this;
      this.$modal.hide("modal");
      if(this.editMode){
        this.$store.dispatch("materials/updateMaterial", material);
      }else{
        this.$store.dispatch("materials/addMaterial", material);
      }
    },
    editMaterial(material){
      this.editMode = true;
      this.$modal.show("modal");
      material.running_out = "" + material.running_out
      this.material = Object.assign({}, material);
    },
    deleteMaterial(material){
      if (confirm(`are you sure you want to delete ${material.name}?`)) {
          this.$store.dispatch("materials/deleteMaterial", material);
      }
    },
    resetMaterial(){
      this.editMode = false;
      this.material = {
        name: "",
        workspace: window.localStorage.getItem("workspace"),
        measurement: "",
        unit_cost: ""
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


