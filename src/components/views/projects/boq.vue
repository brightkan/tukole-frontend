<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>{{ site.site_name }}</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="boq-list">
        <h3>Bill of Quanties</h3>

        <table class="table">
          <thead>
            <tr>
              <td>Item</td>
              <td>Measurement Unit</td>
              <td>Unit cost</td>
              <td v-if="$store.state.user_role == 'management'" >Actual Quantity</td>
              <td v-if="$store.state.user_role == 'management'">Total Actual Cost</td>
              <td v-if="$store.state.user_role == 'management'">Estimated Quantity</td>
              <td v-if="$store.state.user_role == 'management'">Total Estimated Cost</td>
              <td v-if="$store.state.user_role != 'management'"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="boq in boqs" :key="boq.id" > 
              <td>{{ boq.material }}</td>
              <td>{{ boq.measurement_unit }}</td>
              <td>{{ boq.unit_cost }}</td>
              <td v-if="$store.state.user_role == 'management'">{{ boq.total_actual_quantity | formatNumber}}</td>
              <td v-if="$store.state.user_role == 'management'">{{ boq.total_actual_quantity * boq.unit_cost | formatNumber}}</td>
              <td v-if="$store.state.user_role == 'management'">{{ boq.total_estimate_quantity | formatNumber}}</td>
              <td v-if="$store.state.user_role == 'management'">{{ boq.total_estimate_quantity * boq.unit_cost | formatNumber}}</td>
              <td v-if="$store.state.user_role != 'management'" class="text-right">
                  <i class="fa fa-edit" v-on:click="editBoq(boq)"></i> 
                </td>
            </tr>
            <tr v-if="boqs.length <= 0">
              <td colspan="6" class="text-center">No Boqs Yet</td>
            </tr>
          </tbody>
        </table>

        <p v-if="$store.state.user_role == 'management'">
          Total Project Estimated cost
          <span style="margin-right: 15px">
            USD {{getBoqEstimateTotal | formatNumber}}
          </span>   

          Total Project Actual cost
          <span>
            USD {{getBoqActualTotal | formatNumber}}
          </span>
        </p>
      </div>
    </div>


    <modal name="modal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Boq</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveBoq"> 
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="boq.actual_quantity" label="Actual quantity" required outline/>
                    <mdc-select v-model="boq.material" label="Material" required outlined>
                      <option v-for="material in materials" v-bind:value="material.id" :key="material.id">
                        {{ material.name }}
                      </option>
                    </mdc-select>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="boq.estimate_quantity" label="estimate quantity" required outline/>
                    <mdc-select v-model="boq.boq_type" label="Boq type" required outlined>
                      <option>
                        0
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
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} Boq</button>
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
      boq: {
        site: window.localStorage.getItem("selectsite"),
        material: "",
        material_name: "",
        material_measurement: "",
        material_unit_cost: "",
        actual_quantity: "",
        estimate_quantity: "",
        boq_type: "0",
        user: ""
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("sites/loadBoqs", window.localStorage.getItem("selectsite"));
    this.$store.dispatch("materials/loadMaterials");
  },
  computed: {
    ...mapState({
      site: state => state.sites.site,
      boqs: state => state.sites.siteBoqs,
      materials: state => state.materials.materials
    }),
    ...mapGetters('sites', ['getBoqEstimateTotal', 'getBoqActualTotal'])
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveBoq() {
      const { boq } = this;
      this.$modal.hide("modal");
      this.$store.dispatch("sites/updateBoq", boq);
    },
    editBoq(boq){
      this.editMode = true;
      this.$modal.show("modal");
      let data = Object.assign({}, boq);
      data.estimate_quantity = "" + boq.estimate_quantity
      data.actual_quantity = "" + boq.actual_quantity
      data.material = "" + boq.material
      this.boq = data
    },
  }
};
</script>

<style>
.boq-list {
  padding: 36px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  width: 100%;
}
.boq-list h3 {
  margin-top: 0;
}
.boq-list table tr {
  border-bottom: 1px solid #e0e0e0;
  border-top: none;
}
.boq-list thead tr td {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 15px 0;
}
.boq-list tbody tr td {
  color: #333;
  font-family: "Montserrat", sans-serif;
  padding: 15px 0;
  font-size: 12px;
  line-height: 15px;
}
.table tbody tr td span {
  /* color: #333; */
  font-size: 9px;
  line-height: 11px;
  /* padding: 0; */
  margin-right: 15px;
}
.boq-list > p {
  text-align: right;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin-top: 89px;
}
.boq-list > p span {
  background-color: #fff;
  border: 1px solid #256ae1;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 8px 13px;
  border-radius: 5px;
  margin-left: 15px;
}
.boq-list table tbody td span {
  color: #333;
  padding: 0;
  margin: 0;
  font-size: 12px;
  display: inline-block;
  min-width: 5%;
}
.text-danger td{
  color: red !important;
}
</style>


