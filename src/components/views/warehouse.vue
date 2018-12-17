<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      
    </div>
  </section>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>Warehouse Management</h3>
      </div>

      <div class="comp-title col-md-3">
        
      </div>

      <div class="comp-title col-md-3">
        <button type="button" data-toggle="modal" data-target="#addWarehouseMaterial" v-on:click="resetWarehouseMaterial()">
          Add Warehouse Material
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
          <table class="table">
          <thead>
            <tr>
              <td><span class="dot"></span></td>
              <td>Site</td>
              <td>Material</td>
              <td>Quantity</td>
              <td>Status</td>
              <td>Date</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="warehouseMaterial in warehouseMaterials" :key="warehouseMaterial.id">
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>{{ warehouseMaterial.site.site_name }}</td>
              <td>{{ warehouseMaterial.material.name }}</td>
              <td style="text-transform: uppercase">{{ warehouseMaterial.quantity }}</td>
              <td>{{ warehouseMaterial.is_returned ? "Returning" : "Outgoing" }}</td>
              <td>{{ warehouseMaterial.created | moment("dddd, MMMM Do YYYY") }}</td>
              <td class="text-right">
                <i class="fa fa-edit" v-on:click="editWarehouseMaterial(warehouseMaterial)" data-toggle="modal" data-target="#addWarehouseMaterial"></i> 
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

    <!-- Modal -->
    <div class="modal fade" id="addWarehouseMaterial" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'Add'}} WarehouseMaterial</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Site</label>
                <select class="form-control" v-model="warehouseMaterial.site">
                  <option v-for="site in sites" :key="site.id" v-bind:value="site.id">
                    {{ site.site_name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Status</label>
                <select class="form-control" v-model="warehouseMaterial.is_returned">
                  <option v-bind:value="'true'">Returning</option>
                  <option v-bind:value="'false'">Outgoing</option>
                </select>
              </div>
              <div class="form-group">
                <label>Material Name</label>
                <select class="form-control" v-model="warehouseMaterial.material">
                  <option v-for="material in materials" :key="material.id" v-bind:value="material.id">
                    {{ material.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Quantity</label>
                <input type="number" class="form-control" v-model="warehouseMaterial.quantity"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveWarehouseMaterial" data-dismiss="modal">
              {{ editMode ? 'Edit' : 'Add'}} WarehouseMaterial
            </button>
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
      editMode: false,
      warehouseMaterial: {
        is_returned: "false",
        site: "",
        material: "",
        quantity: ""
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("warehouse/loadWarehouseMaterials", window.localStorage.getItem("workspace"));
  },
  computed: {
    ...mapState({
      warehouseMaterials: state => state.warehouse.wareHouseMaterials,
      sites: state => state.sites.sites,
      materials: state => state.materials.materials
    })
  },
  methods: {
    saveWarehouseMaterial() {
      const { warehouseMaterial } = this;
      if(this.editMode){
        this.$store.dispatch("warehouse/updateWarehouseMaterial", warehouseMaterial);
      }else{
        this.$store.dispatch("warehouse/addWarehouseMaterial", warehouseMaterial);
      }
    },
    editWarehouseMaterial(warehouseMaterial){
      this.editMode = true;
      this.warehouseMaterial = Object.assign({}, warehouseMaterial);
    },
    deleteWarehouseMaterial(warehouseMaterial){
      if (confirm(`are you sure you want to delete ${warehouseMaterial.material.name} entry?`)) {
          this.$store.dispatch("warehouse/deleteWarehouseMaterial", warehouseMaterial);
      }
    },
    resetWarehouseMaterial(){
      this.editMode = false;
      this.warehouseMaterial = {
        is_returned: "false",
        site: "",
        material: "",
        quantity: ""
      }
    }
  }
};
</script>

<style>

</style>


