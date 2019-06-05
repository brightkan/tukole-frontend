
<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>{{ getUser() }}</h3>
      </div>
      <div class="col-md-3"> 
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();">Assign Manhole</button>
      </div>
      <div class="col-md-3">
        <div class="dropbox-file button-2">
          <input
            type="file"
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files);"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            class="input-file file-upload"
          >
          <p v-if="isInitial">Add to excel file</p>
          <p v-if="isSaving">
            {{ fileNames }}
          </p>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <div class="row" v-if="$store.state.user_type != 'client'">
      <div class="col-md-12">
        <div class="tab-layout">
            <ul class="nav nav-tabs" role="tablist" data-tabs="tabs">
              <li><a class="active" href="#current" data-toggle="tab" role="tab">Current</a></li>
              <li><a href="#previous" data-toggle="tab" role="tab" v-on:click="loadAllManholes()">Previous</a></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade show active" id="current">
                <div class="table-alt">
                  <h3><i class="fa fa-wrench"></i> Manholes</h3>
                  <table>
                    <thead>
                      <tr v-if="getUserCurrentManholes(this.$route.params.id).length > 0">
                        <td>Name</td>
                        <td>Assigned on</td>
                        <td>Login Durations</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="manhole in getUserCurrentManholes(this.$route.params.id)" :key="manhole.id">
                        <td>{{ manhole.manhole }}</td>
                        <!-- <td>{{ manhole.login_time | moment("HH:mm:ss") }}</td>
                        <td>{{ manhole.logout_time | moment("HH:mm:ss") }}</td> -->
                        <td>{{ manhole.created | moment('MMM Do YYYY')}}</td>
                        <td>
                          <a class="custom-btn text-white" style="padding-top: 5px; padding-bottom: 5px; cursor: pointer" v-on:click="showDurations(user, manhole.id)">
                            Login History
                          </a>  
                        </td>
                      </tr>
                      <tr v-if="getUserCurrentManholes(this.$route.params.id).length <= 0">
                        <td colspan="7" class="text-center">No Manholes Yet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="previous">
                <div class="table-alt">
                  <h3><i class="fa fa-wrench"></i> Manholes</h3>
                  <table>
                    <thead>
                      <tr v-if="getUserPreviousManholes(this.$route.params.id).length > 0">
                        <td>Name</td>
                        <!-- <td>Login time</td>
                        <td>Logout time</td> -->
                        <td>Assigned on</td>
                        <td>Login Durations</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="manhole in getUserPreviousManholes(this.$route.params.id)" :key="manhole.id">
                        <td>{{ manhole.manhole }}</td>
                        <td>{{ manhole.created | moment('MMM Do YYYY')}}</td>
                        <td>
                          <a class="custom-btn text-white" style="padding-top: 5px; padding-bottom: 5px; cursor: pointer" v-on:click="showDurations(user, manhole.id)">
                            Login History
                          </a>  
                        </td>
                      </tr>
                      <tr v-if="getUserPreviousManholes(this.$route.params.id).length <= 0">
                        <td colspan="7" class="text-center">No Manholes Yet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <modal name="modal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">Assign Manholes</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveAssignment"> 
            <div class="modal-body">
              <div>
                <mdc-select v-model="selectedManhole.manhole" label="ManHoles" required outlined>
                  <option v-for="manhole in manholes" :key="manhole.id" v-bind:value="manhole.id">
                    {{ manhole.number }}
                  </option>
                </mdc-select>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised">save</button>
            </div>
          </form>
        </div>
      </div>
    </modal>

  </section>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data(router) {
    return {
      user: this.$route.params.id,
      selectedManhole: {
        manhole: '',
        user: this.$route.params.id
      },
      editMode: false,
      //this is for the upload
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos".mapState,
      formData: new FormData(),
      fileNames: null
    };
  },
  mounted() {
    this.$store.dispatch("users/loadManHoles", window.localStorage.getItem("workspace"));
    this.$store.dispatch("users/loadCurrentManHoles", this.$route.params.id);
    this.reset();
  },
  computed: {
    ...mapState('users', ['manholes']),
    ...mapGetters('users', ['getUserCurrentManholes', 'getUserPreviousManholes']),
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
    getUser() {
      let user = this.$store.getters['users/getUser'](this.$route.params.id);
      return user ? user.first_name + " " + user.last_name : ""
    },
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveAssignment() {
      const { selectedManhole } = this;
      this.$modal.hide("modal");
      this.$store.dispatch("users/assignManhole", selectedManhole);
    },
    loadAllManholes() {
      this.$store.dispatch("users/getUserAssignedManholes", this.$route.params.id);
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;
      // append the files to FormData
      this.formData.append("file", fileList[0], fileList[0].name);
      this.fileNames = fileList[0].name;

      this.currentStatus = STATUS_SAVING;
      
      this.formData.append("user_assigned", this.$route.params.id);
      this.$store.dispatch("users/massAssignManholes", this.formData);
      this.reset()
    },
    reset() {
      // reset form to initial state
      (this.formData = new FormData()), (this.currentStatus = STATUS_INITIAL);
      this.uploadedFiles = null;
      this.uploadError = null;
      this.fileNames = null;
    },
    showDurations(user, manhole){
      this.$router.push('/dash/manholeManagment/manholeDurations/'+user+'/'+manhole);
    }
  }
};
</script>

<style lang="scss" scoped>
.mdc-button.mdc-button--raised {
  float: right;
  background-color: #256ae1;
  border-radius: 20px;
}
.content{
  .row:nth-child(1){
    padding-bottom: 15px;
  }
  .row:nth-child(2){
    padding-top: 0;
  }
}
</style>



