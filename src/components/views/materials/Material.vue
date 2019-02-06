<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Material</h3>
      </div>

      <div class="comp-title col-md-3">
        
      </div>

      <div class="comp-title col-md-5">
        <form method="get" action="/search" class="fleet_search">
          <input name="q" type="text" size="40" placeholder="Search..." />
        </form>
      </div>

      <div class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addMaterial" v-on:click="resetMaterial()">
          Add Material
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-wrench"></i>  Material</h3>
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
                  <i class="fa fa-edit" v-on:click="editMaterial(material)" data-toggle="modal" data-target="#addMaterial"></i> 
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
    <div class="modal fade" id="addMaterial" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'Add'}} Material</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Material Name</label>
                <input type="text" class="form-control" v-model="material.name"/>
              </div>
              <div class="form-group">
                <label>Measurement</label>
                <input type="text" class="form-control" v-model="material.measurement"/>
              </div>
              <div class="form-group">
                <label>Running out</label>
                <select class="form-control" v-model="material.running_out">
                  <option v-bind:value="'true'">True</option>
                  <option v-bind:value="'false'">False</option>
                </select>
              </div>
              <div class="form-group">
                <label>Unit cost</label>
                <input type="text" class="form-control" v-model="material.unit_cost"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveMaterial" data-dismiss="modal">
              {{ editMode ? 'Edit' : 'Add'}} Material
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
      material: {
        name: "",
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
    saveMaterial() {
      const { material } = this;
      if(this.editMode){
        this.$store.dispatch("materials/updateMaterial", material);
      }else{
        this.$store.dispatch("materials/addMaterial", material);
      }
    },
    editMaterial(material){
      this.editMode = true;
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

<style>
.table td:nth-child(1){
  padding-left: 30px
}

.content > .row:nth-child(2) {
  padding-top: 30px;
}

.content > .row:nth-child(3) {
  padding-top: 40px;
}

.comp-title {
  border: none;
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.comp-title > h3 {
  display: inline-block;
  margin: 0;
  line-height: 2.2em;
}

label.field {
  border-radius: 2px;
  color: #666;
  width: 100%;
  opacity: 0;
  position: relative;
  transition-property: opacity;
  z-index: 1;
  margin-bottom: 0;
}

label.field > span {
  color: #bdbdbd !important;
  font-family: "Montserrat", sans-serif;
  font-size: 14px !important;
  font-weight: 300;
}

label.field span {
  color: inherit;
  display: block;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  left: 9px;
  pointer-events: none;
  position: absolute;
  -webkit-transform: scale(1) translateY(0);
  transform: scale(1) translateY(0);
  transition-property: color, font-size, top;
  z-index: 2;
  margin: 8px 0 8px 10px;
}
label.field span.required::after {
  color: inherit;
  content: "*";
  display: block;
  height: 20px;
  left: -20px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  top: 0;
  width: 20px;
}
.error label.field span {
  color: #f02318;
}
label.field .psuedo_select {
  background: rgba(255, 255, 255, 0);
  position: relative;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 20px;
  height: 0;
  line-height: 24px;
  margin: 0;
  min-width: 250px;
  padding-top: 35px;
  outline: 0;
  z-index: 1;
  background-color: white;
  border-radius: 5px;
}
label.field .psuedo_select::after {
  background: url("data:image/svg+xml;utf8,<svg fill='#256ae1' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'> <path d='M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z'/> <path d='M0-.75h24v24H0z' fill='none'/> </svg>"),
    no-repeat;
  content: "";
  height: 24px;
  width: 24px;
  position: absolute;
  top: 7px;
  right: 10px;
  transition-property: background;
}
label.field .psuedo_select .selected {
  left: 1px;
  line-height: initial;
  opacity: 0;
  position: absolute;
  top: 0;
  margin-left: 95px;
  color: #256ae1;
  -webkit-transform: translateY(24px);
  transform: translateY(24px);
  transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
  transition-property: opacity, transform, -webkit-transform;
  will-change: transform;
}
label.field .psuedo_select ul {
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  display: block;
  height: 0;
  list-style: none;
  margin-top: 2px;
  opacity: 0;
  overflow: hidden;
  padding: 0 1px;
  pointer-events: none;
  transition-property: height, opacity;
  width: 100%;
  z-index: 2;
  position: absolute;
}
label.field .psuedo_select ul li {
  font-size: 18px;
  font-weight: 300;
  padding: 8px 10px;
}
label.field .deselect {
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: -1;
}
label.field.focused {
  color: #007bed;
}
label.field.focused .psuedo_select {
  border-color: #007bed;
}
label.field.focused .psuedo_select::after {
  background: url("data:image/svg+xml;utf8,<svg fill='#007BED' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'> <path d='M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z'/> <path d='M0-.75h24v24H0z' fill='none'/> </svg>"),
    no-repeat;
}
label.field.focused .psuedo_select ul {
  opacity: 1;
  pointer-events: all;
}
.comp-title .fleet_search {
  padding: 0;
}
.comp-title .fleet_search input {
  background: url(../../../../static/img/search-white.png) no-repeat 10px 10px;
  background-color: #fff;
  border: 0 none;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
  color: #666;
  width: 100%;
  padding: 10px 15px 10px 35px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}
.summary-card {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
  border-radius: 5px;
  margin: 0;
}

.table thead .dot {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.table .dot {
  box-sizing: border-box;
  padding: 0 6px;
  margin-left: 7px;
  background-color: #fff;
  border: 1px solid #e4e9fd;
  border-radius: 3px;
}

.table .oval {
  background-color: #393939;
  border-radius: 50%;
  padding: 5px 10px;
  margin-right: 10px;
}

.table thead tr td {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
}

.table tbody tr {
  background-color: #fff;
  border-top: 0;
  border-bottom: 0;
  border-color: #ebf0f5;
}

.table tbody tr td {
  color: #142235;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.table tbody tr td span {
  color: #fff;
  font-size: 9px;
  line-height: 11px;
  padding: 3px 15px;
  border-radius: 20px;
}
.table tbody tr td span.green {
  background-color: #2dae3e;
}
.table tbody tr td span.red {
  background-color: #ff5f58;
}
.table tbody tr td span.orange {
  background-color: #fa9917;
}
.table tbody tr td i {
  color: #c8c8c8;
  font-size: 14px;
}
.table tbody tr i:nth-child(2) {
  margin-right: 50px;
}
.table tbody tr i:nth-child(1) {
  margin-right: 20px;
}
</style>

