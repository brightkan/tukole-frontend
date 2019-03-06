<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>{{ getSite() }} <small>warehouse Management</small></h3>
      </div>

      <div class="comp-title col-md-3">
        
      </div>

      <div class="comp-title col-md-3">
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetWarehouseMaterial()">
          Add Warehouse Material
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-warehouse"></i>  Materials</h3>
          <table>
            <thead>
              <tr v-if="warehouseMaterials.length > 0">
                <td>Material</td>
                <td>Quantity</td>
                <td>Status</td>
                <td>Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="warehouseMaterial in warehouseMaterials" :key="warehouseMaterial.id">
                <td>{{ warehouseMaterial.material.name }}</td>
                <td style="text-transform: uppercase">{{ warehouseMaterial.quantity }}</td>
                <td>{{ warehouseMaterial.is_returned ? "Returning" : "Outgoing" }}</td>
                <td>{{ warehouseMaterial.created | moment("dddd, MMMM Do YYYY") }}</td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editWarehouseMaterial(warehouseMaterial)"></i> 
                  <i class="fa fa-times" v-on:click="deleteWarehouseMaterial(warehouseMaterial)"></i>
                </td>
              </tr>
              <tr v-if="warehouseMaterials.length <= 0">
                <td colspan="6" class="text-center">No warehouse materials yet</td>
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
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Warehouse Material</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveWarehouseMaterial"> 
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-select v-model="warehouseMaterial.material" label="Material Name" required outlined>
                      <option v-for="material in materials" :key="material.id" :value="material.id">
                        {{ material.name }}
                      </option>
                    </mdc-select>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="warehouseMaterial.quantity" label="Quantity" type="number" required outline/>
                  </div>
                </div>

                <mdc-select v-model="warehouseMaterial.is_returned" label="Status" required outlined>
                  <option :value="true">Returning</option>
                  <option :value="false">Outgoing</option>
                </mdc-select>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} Warehouse Material</button>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data(router) {
    return {
      editMode: false,
      warehouseMaterial: {
        site: this.$route.params.id,
        material: "",
        quantity: ""
      }
    };
  },
  created() {
    
  },
  mounted() {
    this.$store.dispatch("warehouse/loadWarehouseMaterials", this.$route.params.id);
  },
  computed: {
    ...mapState({
      warehouseMaterials: state => state.warehouse.wareHouseMaterials,
      materials: state => state.materials.materials
    }),
  },
  methods: {
    getSite() {
      let site = this.$store.getters['sites/getSite'](this.$route.params.id);
      return site[0] ? site[0].site_name : ""
    },
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveWarehouseMaterial() {
      const { warehouseMaterial } = this;
      this.$modal.hide("modal");
      if(this.editMode){
        this.$store.dispatch("warehouse/updateWarehouseMaterial", warehouseMaterial);
      }else{
        this.$store.dispatch("warehouse/addWarehouseMaterial", warehouseMaterial);
      }
    },
    editWarehouseMaterial(warehouseMaterial){
      this.editMode = true;
      this.$modal.show("modal");
      let data = Object.assign({}, warehouseMaterial);
      data.is_returned = "" + warehouseMaterial.is_returned
      data.material = "" + warehouseMaterial.material.id
      data.quantity = "" + warehouseMaterial.quantity
      data.site = "" + warehouseMaterial.site.id
      this.warehouseMaterial = data;
    },
    deleteWarehouseMaterial(warehouseMaterial){
      if (confirm(`are you sure you want to delete ${warehouseMaterial.material.name} entry?`)) {
          this.$store.dispatch("warehouse/deleteWarehouseMaterial", warehouseMaterial);
      }
    },
    resetWarehouseMaterial(){
      this.editMode = false;
      this.warehouseMaterial = {
        site: this.$route.params.id,
        material: "",
        quantity: ""
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mdc-button.mdc-button--raised{
  background-color: #256ae1;
  padding: 10px !important;
}
</style>


