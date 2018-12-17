<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      <ul>
        <router-link tag="li" to="/dash/mechanic/fleets">
          <a href="#">
            Fleets
          </a>
        </router-link>
        <router-link tag="li" to="/dash/mechanic/machinery">
          <a href="#">
            Machines
          </a>
        </router-link>              
        <router-link tag="li" to="/dash/mechanic/tools">
          <a>
            Tools
          </a>
        </router-link>
      </ul>
    </div>
  </section>

    <!-- Main content -->
  <section class="content">
    <router-view></router-view>
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


