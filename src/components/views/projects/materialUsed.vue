<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>Materials Used</h3>
      </div>
      <div class="text-right col-md-6">
        <p>materials Used</p>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="boq-list">

        <table class="table">
          <thead>
            <tr>
              <td>Material</td>
              <td>Quantity</td>
              <td>Measurement</td>
              <td>Unit Cost</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="material in materials" :key="material.id"> 
              <td>{{ material.material }}</td>
              <td>{{ material.quantity | formatNumber}}</td>
              <td>{{ material.measrement }}</td>
              <td>{{ material.unit_cost | formatNumber }}</td>
              <td>{{ material.price | formatNumber }}</td>
            </tr>
            <tr v-if="materials.length <= 0">
              <td colspan="6" class="text-center">No Data Yet</td>
            </tr>
          </tbody>
        </table>

        <p>
          Total Project cost
          
          <span>
            UGX  {{totalCost | formatNumber}} 
          </span>
        </p>
      </div>
    </div>

  </section>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data(router) {
    return {
      materials: [],
      totalCost: ""
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("sites/loadMaterialUsed");

    this.getMaterialsUsed();
    this.getTotal()
  },
  methods: {
    getMaterialsUsed(){
      this.materials = this.$store.getters['sites/getActivityMaterialsUsed'](this.$route.params.id, this.$route.params.type);
    },
    getTotal(){
      this.totalCost = this.$store.getters['sites/getTotalMaterialPrice'](this.$route.params.id, this.$route.params.type);
    }
  }
};
</script>

<style>

</style>


