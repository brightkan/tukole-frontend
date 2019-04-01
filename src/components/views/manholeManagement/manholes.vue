<template>
<div>
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
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetManhole()">Add Manhole</button>

        <div class="dropbox-file rounded-square">
          <input
            type="file"
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files);"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            class="input-file file-upload"
          >
          <p v-if="isInitial">Click to excel file</p>
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
          <h3><i class="fa fa-users"></i> Manholes</h3>
          <table>
            <thead>
              <tr v-if="manholes.length > 0">
                <td>Manhole</td>
                <td>Site</td>
                <td>Created</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="manhole in manholes" :key="manhole.id">
                <td>{{ manhole.number }}</td>
                <td>{{ manhole.site ? manhole.site.site_name : '' }}</td>
                <td>{{ manhole.created | moment('MMM Do YYYY') }}</td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editManhole(manhole)"></i> 
                  <i class="fa fa-times" v-on:click="deleteManhole(manhole)"></i>
                </td>
              </tr>
              <tr v-if="manholes.length <= 0">
                <td colspan="6" class="text-center">No Manholes Yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <modal name="modal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Manhole</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveManhole"> 
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="manhole.number" label="Name" required outline/>
                  </div>
                  <div class="col-md-6">
                    <mdc-select v-model="manhole.site" label="Site" required outlined>
                      <option v-for="site in sites" v-bind:value="site.id" :key="site.id">
                        {{ site.site_name }}
                      </option>
                      <option :value="null"></option>
                    </mdc-select>
                  </div>
                </div>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} Manhole</button>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </section>
</div>
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
      manhole: {
        number: "",
        site: ""
      },
      //this is for the upload
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos".mapState,
      formData: new FormData(),
      fileNames: null
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("manholes/loadManholes");
    this.reset();
  },
  computed: {
    ...mapState({
      sites: state => state.sites.sites,
      manholes: state => state.manholes.manholes
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
    saveManhole() {
      const { manhole } = this;
      this.$modal.hide("modal");
      if(this.editMode){
        this.$store.dispatch("manholes/updateManhole", manhole);
      }else{
        this.$store.dispatch("manholes/addManhole", manhole);
      }
    },
    editManhole(manhole){
      this.editMode = true;
      this.$modal.show("modal");
      this.manohle = Object.assign({}, manhole);
      if(manhole.site){
        this.manhole.site = "" + manhole.site.id;
      }else{
        this.manhole.site = "";
      }
      
      this.manhole.number = "" + manhole.number
    },
    deleteManhole(manhole){
      if (confirm(`are you sure you want to delete ${manhole.number}?`)) {
          this.$store.dispatch("manholes/deleteManhole", manhole);
      }
    },
    resetManhole(){
      this.editMode = false;
      this.manohle = {
        number: "",
        site: ""
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;
      // append the files to FormData
      this.formData.append("file", fileList[0], fileList[0].name);
      this.fileNames = fileList[0].name;

      this.currentStatus = STATUS_SAVING;
      
      this.$store.dispatch("users/massAddManholes", this.formData);
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


