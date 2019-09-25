<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="container search-wrapper">
      <div class="row search">
        <div class="input">
          <form method="get" action="/search">
            <input name="q" type="text" size="40" placeholder="Search..." v-model="filterTable">
          </form>
        </div>
        <button v-if="$store.state.user_role != 'management'" 
        class="mdc-button mdc-button--raised" v-on:click="showForm();resetMaterial()">Add Material</button>
        <div v-if="$store.state.user_role != 'management'" class="dropbox-file rounded-square">
          <input
            type="file"
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files);"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            class="input-file file-upload"
          >
          <p v-if="isInitial">Upload Materials excel</p>
          <p v-if="isSaving">
            {{ fileNames }}
          </p>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-wrench"></i>  Materials</h3>

          <datatable :columns="table_columns" :data="materials" :filter-by="filterTable">
            <template slot-scope="{ row }">
                <tr>
                  <td>{{ row.name }}</td>
                  <td style="text-transform: uppercase">{{ row.measurement }}</td>
                  <td>{{ row.running_out ? "Running out" : "Available" }}</td>
                  <td>{{ row.unit_cost }}</td>
                  <td v-if="$store.state.user_role != 'management'" class="text-right">
                    <i class="fa fa-edit" v-on:click="editMaterial(row)"></i> 
                    <i class="fa fa-times" v-on:click="deleteMaterial(row)"></i>
                  </td>
                </tr>
            </template>
          </datatable>  
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
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

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
      },
      //this is for the upload
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos".mapState,
      formData: new FormData(),
      fileNames: null,

      //dataTables implementation
      filterTable: '',
      table_columns: [
          {label: 'Material', field: 'name'},
          {label: 'Measurement', field: 'measurement'},
          {label: 'Running Out', representedAs: function (metric) {
                  return metric.running_out ? "Running out" : "Available"
              }, sortable: false
          },
          {label: 'Unit Cost', field: 'unit_cost'},
          {label: '', field: ''}
      ],
      rows: window.rows,
      page: 1,
      per_page: 10
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("materials/loadMaterials");
    this.reset();
  },
  computed: {
    ...mapState({
      materials: state => state.materials.materials
    }),
    loading () {
      if(!this.$store.state.users.loading){
        this.reset()
      }
      return this.$store.state.users.loading
    },
    //this is for the upload
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
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
      var editMaterial = Object.assign({}, material);
      editMaterial.running_out = "" + material.running_out
      this.material = editMaterial
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
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;
      // append the files to FormData
      this.formData.append("file", fileList[0], fileList[0].name);
      this.fileNames = fileList[0].name;


      this.currentStatus = STATUS_SAVING;
      this.formData.append("workspace", window.localStorage.getItem("workspace"));
      this.$store.dispatch("materials/massAddMaterials", this.formData);
    },
    reset() {
      // reset form to initial state
      (this.formData = new FormData()), (this.currentStatus = STATUS_INITIAL);
      this.uploadedFiles = null;
      this.uploadError = null;
      this.fileNames = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper .search .input form input {
  padding: 15px
}
</style>


