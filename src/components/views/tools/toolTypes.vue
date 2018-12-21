<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Tool types</h3>
      </div>

      <div class="comp-title col-md-3">
        
      </div>

      <div class="comp-title col-md-5">
        
      </div>

      <div class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addToolType" v-on:click="resetType()">
          Add Tool type
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
              <td>Type</td>
              <td>Description</td>
              <td>Creation Date</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="type in tool_types" :key="type.id">
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>{{ type.type }}</td>
              <td>{{ type.description }}</td>
              <td>12. 08. 2018</td>
              <td class="text-right">
                <i class="fa fa-edit" v-on:click="editType(type)" data-toggle="modal" data-target="#addToolType"></i> 
                <i class="fa fa-times" v-on:click="deleteType(type)"></i>
              </td>
            </tr>
            <tr v-if="tool_types.length <= 0">
              <td colspan="7" class="text-center">No Tools Yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addToolType" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'Add'}} Tool type</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Type Name</label>
                <input type="text" class="form-control" v-model="type.type"/>
              </div>
              <div class="form-group">
                <label>Type description</label>
                <input type="text" class="form-control" v-model="type.description"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveType" data-dismiss="modal">
              {{ editMode ? 'Edit' : 'Add'}} Tool type
            </button>
          </div>
        </div>
      </div>
    </div>

  </section>
</div>
</template>

<script>
import { select } from "../../mixins/select";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  mixins: [select],
  data(router) {
    return {
      editMode: false,
      type: {
        type: "",
        description: ""
        // workspace: window.localStorage.getItem("workspace")
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("tools/loadToolTypes");
  },
  computed: {
    ...mapState('tools',["tool_types"])
  },
  methods: {
    saveType() {
      const { type } = this;
      if(this.editMode){
        this.$store.dispatch("tools/updateType", type);
      }else{
        this.$store.dispatch("tools/addType", type);
      }
    },
    editType(type){
      this.editMode = true;
      this.type = Object.assign({}, type);
    },
    deleteType(type){
      if (confirm(`are you sure you want to delete ${type.type}?`)) {
          this.$store.dispatch("tools/deleteType", type);
      }
    },
    resetType(){
      this.editMode = false;
      this.type = {
        type: "",
        description: ""
        //workspace: window.localStorage.getItem("workspace")
      }
    }
  }
};
</script>

<style>
.content > .row:nth-child(1) {
  padding: 15px 30px 10px;
  border-bottom: 1px solid #e0e0e0;
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
.summary-card h3 {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  padding: 20px 37px 26px;
  padding-right: 5px;
  margin: 0;
}
.summary-card h3 small {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
}

.summary-card p {
  color: #4f4f4f;
  font-family: "Montserrat", sans-serif;
  font-size: 11px;
  line-height: 13px;
  padding-top: 24px;
  padding-right: 30px;
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
  font-size: 10px;
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


