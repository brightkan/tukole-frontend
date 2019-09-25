<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>{{ site.site_name }}</h3>
      </div>
      <div class="text-right col-md-6">
        <p>project costs</p>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="boq-list">
        <div class="comp-title col-md-2">
          <button v-if="$store.state.user_role != 'management'" 
            type="button" data-toggle="modal" data-target="#addCost" v-on:click="resetCost()">
            Add Cost
          </button>
        </div>

        <table class="table">
          <thead>
            <tr>
              <td>Cost Name</td>
              <td>Value</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cost in costs" :key="cost.id" > 
              <td><span>1.</span> {{ cost.name }}</td>
              <td>{{ cost.value | formatNumber }}</td>
              <td class="text-right">
                <i class="fa fa-edit" v-on:click="editCost(cost)" data-toggle="modal" data-target="#addCost"></i> 
                <i class="fa fa-times" v-on:click="deleteCost(cost)"></i>
              </td>
            </tr>
            <tr v-if="costs.length <= 0">
              <td colspan="6" class="text-center">No costs Yet</td>
            </tr>
          </tbody>
        </table>

        <p>
          Total Project cost
          
          <span>
            USD {{getCostTotal | formatNumber}}
          </span>
        </p>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addCost" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'Add'}} Cost</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Cost Name</label>
                <input type="text" class="form-control" v-model="cost.name"/>
              </div>
              <div class="form-group">
                <label>Amount</label>
                <input type="number" class="form-control" v-model="cost.value"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveCost" data-dismiss="modal">
              {{ editMode ? 'Edit' : 'Add'}} Cost
            </button>
          </div>
        </div>
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
      editMode: false,
      cost: {
        name: "",
        user: (JSON.parse(window.localStorage.getItem('user'))).user_id,
        value: "",
        site: window.localStorage.getItem("selectsite")
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("sites/loadCosts", window.localStorage.getItem("selectsite"));
  },
  computed: {
    ...mapState({
      site: state => state.sites.site,
      costs: state => state.sites.siteCosts
    }),
    ...mapGetters('sites', ['getCostTotal'])
  },
  methods: {
    saveCost() {
      const { cost } = this;
      if(this.editMode){
        this.$store.dispatch("sites/updateCost", cost);
      }else{
        this.$store.dispatch("sites/addCost", cost);
      }
    },
    editCost(cost){
      this.editMode = true;
      this.cost = Object.assign({}, cost);
    },
    deleteCost(cost){
      if (confirm(`are you sure you want to delete ${cost.name}?`)) {
          this.$store.dispatch("sites/deleteCost", cost);
      }
    },
    resetCost(){
      this.editMode = false;
      this.cost = {
        name: "",
        user: (JSON.parse(window.localStorage.getItem('user'))).user_id,
        value: "",
        site: window.localStorage.getItem("selectsite")
      }
    }
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


