<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>{{ site.site_name }}</h3>
      </div>
      <div class="col-md-6">
        <p v-if="!editAccessible" class="float-right">
          <small class="text-muted">Estimated End:</small>
          {{ site.expected_end_date | moment("dddd, MMMM Do YYYY") }}
          <span
            style="margin-left: 10px"
            v-on:click="editAccessible = true"
          >
            <i class="fas fa-pencil-alt"></i>
          </span>
        </p>

        <form v-if="editAccessible" class="form-inline" role="form">
          <div class="form-group col-md-8" style="padding-right: 0px">
            <input type="date" class="form-control" v-model="expected_end_date" style="width: 100%" />
          </div>
          <div class="form-group col-md-4">
            <button
              style="width: 100%"
              type="button"
              class="btn btn-default ac_btn"
              v-on:click="updateExptectedEnd(site)"
            >Edit</button>
          </div>
        </form>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="pip-box">
          <h4>
            Project Implementation Plan
            <a
              v-if="$store.state.user_role == 'project_manager'"
              class="custom-btn text-white float-right"
              data-toggle="modal"
              data-target="#addPIP"
              v-on:click="resetPIP()"
              style="padding-top: 5px; padding-bottom: 5px;"
            >Add project plan</a>
          </h4>

          <ul class="header">
            <li>Timeline</li>
          </ul>

          <table class="table">
            <thead>
              <tr>
                <td>Tasks</td>
                <td>Start</td>
                <td>End</td>
                <td>Document</td>
                <td v-if="$store.state.user_role == 'project_manager'"></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(plan, index) in pips" :key="plan.id">
                <td>{{ index + 1 }}. {{ plan.task }}</td>
                <td>{{ plan.start | moment("dddd, MMMM Do YYYY") }}</td>
                <td>{{ plan.end | moment("dddd, MMMM Do YYYY") }}</td>
                <td>
                  <a v-if="plan.pip_upload != null" class="mdc-button mdc-button--raised" target="_blank"
                    v-bind:href="plan.pip_upload" download>Download</a>
                </td>
                <td v-if="$store.state.user_role == 'project_manager'" class="text-right">
                  <i
                    class="fa fa-edit"
                    v-on:click="editPIP(plan)"
                    data-toggle="modal"
                    data-target="#addPIP"
                  ></i>
                  <i class="fa fa-times" v-on:click="deletePIP(plan)"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addPIP"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >{{ editMode ? 'Edit' : 'Add'}} Project Implementation Plan</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Task</label>
                <input type="text" class="form-control" v-model="pip.task" />
              </div>
              <div class="form-group">
                <label>Start</label>
                <input type="date" class="form-control" v-model="pip.start" />
              </div>
              <div class="form-group">
                <label>End</label>
                <input type="date" class="form-control" v-model="pip.end" />
              </div>

              <div class="row">
                <div class="col-md-12">
                  <label>Add Document</label>
                  <div class="dropbox">
                    <input
                      type="file"
                      :name="uploadFieldName"
                      :disabled="isSaving"
                      @change="filesChange($event.target.files)"
                      accept="image/*"
                      class="input-file"
                    />
                    <p v-if="isInitial">
                      Drag your file(s) here to begin
                      <br />or click to browse
                    </p>
                    <p v-if="isSaving">
                      Added files
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="savePIP"
              data-dismiss="modal"
            >{{ editMode ? 'Edit' : 'Add'}} PIP</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data(router) {
    return {
      editAccessible: false,
      expected_end_date: "",
      editMode: false,
      pip: {
        task: "",
        site: window.localStorage.getItem("selectsite"),
        start: "",
        end: "",
        pip_upload: ""
      },
      currentStatus: null,
      uploadFieldName: "photos".mapState,
      formData: new FormData()
    };
  },
  mounted() {
    this.$store.dispatch(
      "sites/loadPIP",
      window.localStorage.getItem("selectsite")
    );
  },
  computed: {
    ...mapState({
      site: state => state.sites.site,
      pips: state => state.sites.pips
    }),
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
    savePIP() {
      this.formData.append("id", this.pip.id);
      this.formData.append("task", this.pip.task);
      this.formData.append("start", moment(this.pip.start).format("YYYY-MM-DD[T]HH:mm:ss"));
      this.formData.append("end", moment(this.pip.end).format("YYYY-MM-DD[T]HH:mm:ss"));
      this.formData.append("site", window.localStorage.getItem("selectsite"));

      if (this.editMode) {
        this.$store.dispatch("sites/updatePIP", this.formData);
      } else {
        console.log(this.formData)
        this.$store.dispatch("sites/addPIP", this.formData);
      }
      
    },
    editPIP(pip) {
      this.editMode = true;
      this.pip = Object.assign({}, pip);
    },
    deletePIP(pip) {
      if (confirm(`are you sure you want to delete ${pip.task}?`)) {
        this.$store.dispatch("sites/deletePIP", pip);
      }
    },
    resetPIP() {
      this.editMode = false;
      this.pip = {
        task: "",
        site: window.localStorage.getItem("selectsite"),
        start: "",
        end: ""
      };
    },
    updateExptectedEnd(site) {
      const { expected_end_date } = this;
      site.expected_end_date = expected_end_date;
      this.$store.dispatch("sites/updateSite", site);
      this.editAccessible = false;
    },
    reset() {
      // reset form to initial state
      (this.formData = new FormData()), (this.currentStatus = STATUS_INITIAL);
      this.uploadedFiles = [];
      this.uploadError = null;
      this.fileNames = [];
    },
    filesChange(fileList) {
      if (!fileList.length) return;
      this.formData.append("pip_upload", fileList[0], fileList[0].name);
      this.currentStatus = STATUS_SAVING;
    },
  }
};
</script>

<style>
.pip-box {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  padding: 27px 0;
}
.pip-box h4 {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin: 0 24px;
  margin-bottom: 27px;
}
.pip-box ul.header {
  list-style: none;
  padding: 0;
  border-bottom: 2px solid #e0e0e0;
  margin: 0;
}
.pip-box ul.header li {
  display: inline-block;
  padding: 9px 34px;
  text-align: center;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  border-bottom: 4px solid #256ae1;
  background-color: #f5f6f7;
}
.pip-box table thead {
  background-color: #f9f9f9;
}
.pip-box .table tbody tr {
  border: none;
}
.pip-box table thead td {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
}
.pip-box table thead td:nth-child(1) {
  color: #333;
  text-align: left;
  padding: 10px 25px;
}
.pip-box table tbody td:nth-child(1) {
  color: #333;
  text-align: left;
  padding: 10px 25px;
}
.pip-box table tbody td span {
  height: 16px;
  display: inline-block;
}
</style>


