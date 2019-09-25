<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-9">
        <h3>{{ site.site_name }}</h3>
      </div>
      <div class="col-md-3">
        <small class="float-right">Settings</small>
      </div>
    </div>
    <!-- /.row -->
    <div class="box container" style="width: 50%; margin-top: 20px">
      <form>
        <div class="row" v-if="$store.state.user_type != 'client'">
          <div class="col-md-6">
            <p class="switch-label">Site Accepted:</p>
          </div>
          <div class="material-switch col-md-6">
            <p
              v-if="!editSite"
            >{{ site.site_accepted != null && site.site_accepted ? 'Yes' : 'No' }}</p>
            <input
              v-if="editSite"
              id="someSwitchOptionPrimary"
              name="someSwitchOption001"
              type="checkbox"
              v-model="site.site_accepted"
            >
            <label v-if="editSite" for="someSwitchOptionPrimary" class="label-primary"></label>
          </div>
        </div>
        <div class="row" v-if="$store.state.user_type != 'client'">
          <div class="col-md-6">
            <p class="switch-label">Survey Result User Access:</p>
          </div>
          <div class="material-switch col-md-6">
            <p
              v-if="!editSite"
            >{{ site.can_client_view_survey_reports != null && site.can_client_view_survey_reports ? 'Yes' : 'No' }}</p>
            <input
              v-if="editSite"
              id="userAccessibility"
              name="userAccess"
              type="checkbox"
              v-model="site.can_client_view_survey_reports"
            >
            <label v-if="editSite" for="userAccessibility" class="label-primary"></label>
          </div>
        </div>
        <div class="row" v-if="$store.state.user_type != 'client'">
          <div class="col-md-6">
            <p class="switch-label">Survey Date:</p>
          </div>
          <div class="form-group col-md-5" style="padding-right: 0px">
            <p v-if="!editSite">{{ site.survey_date | moment("MMM Do YYYY") }}</p>
            <input
              v-if="editSite"
              type="date"
              class="form-control"
              v-model="site.survey_date"
              style="width: 100%"
            >
          </div>
        </div>
        <div class="row" v-if="$store.state.user_type != 'client'">
          <div class="col-md-6">
            <p class="switch-label">Percentage completed:</p>
          </div>
          <div class="form-group col-md-5" style="padding-right: 0px">
            <p v-if="!editSite">{{ site.current_stage }}%</p>
            <input
              v-if="editSite"
              type="text"
              pattern="[0-9]"
              class="form-control"
              v-model="site.current_stage"
              style="width: 100%"
            >
          </div>
        </div>
        <div class="row" v-if="$store.state.user_type != 'client'">
          <div class="col-md-6">
            <p class="switch-label">Acknowledge Site connection request:</p>
          </div>
          <div class="material-switch col-md-6">
            <p
              v-if="!editSite"
            >{{ site.site_connection_request_acknowledged != null && site.site_connection_request_acknowledged ? 'Yes' : 'No' }}</p>
            <input
              v-if="editSite"
              id="siteConnectionRequest"
              name="siteConnectionRequest"
              type="checkbox"
              v-model="site.site_connection_request_acknowledged"
            >
            <label v-if="editSite" for="siteConnectionRequest" class="label-primary"></label>
          </div>
        </div>
        <div class="row" v-if="$store.state.user_type != 'client'">
          <div class="col-md-6">
            <p class="switch-label">Site connection Date:</p>
          </div>
          <div class="form-group col-md-5" style="padding-right: 0px">
            <p v-if="!editSite">{{ site.site_connection_date | moment("MMM Do YYYY") }}</p>
            <input
              v-if="editSite"
              type="date"
              class="form-control"
              v-model="site.site_connection_date"
              style="width: 100%"
            >
          </div>
        </div>
        <div class="row" v-if="$store.state.user_type != 'client'">
          <div class="col-md-6">
            <p class="switch-label">Site Connected:</p>
          </div>
          <div class="material-switch col-md-6">
            <p
              v-if="!editSite"
            >{{ site.site_connected != null && site.site_connected ? 'Yes' : 'No' }}</p>
            <input
              v-if="editSite"
              id="site_connected"
              name="site_connected"
              type="checkbox"
              v-model="site.site_connected"
            >
            <label v-if="editSite" for="site_connected" class="label-primary"></label>
          </div>
        </div>
        <div class="row" v-if="$store.state.user_type == 'client'">
          <div class="col-md-6">
            <p class="switch-label">Site Access:</p>
          </div>
          <div class="material-switch col-md-6">
            <p
              v-if="!editSite"
            >{{ site.site_accessible != null && site.site_accessible ? 'Yes' : 'No' }}</p>
            <input
              v-if="editSite"
              id="siteAccessbile"
              name="siteAccessbile"
              type="checkbox"
              v-model="site.site_accessible"
            >
            <label v-if="editSite" for="siteAccessbile" class="label-primary"></label>
          </div>
        </div>
        <div class="row" v-if="$store.state.user_type == 'client'">
          <div class="col-md-6">
            <p class="switch-label">Ready for Connection:</p>
          </div>
          <div class="material-switch col-md-6">
            <p
              v-if="!editSite"
            >{{ site.site_ready_for_connection != null && site.site_ready_for_connection ? 'Yes' : 'No' }}</p>
            <input
              v-if="editSite"
              id="siteReadyForConnection"
              name="siteReadyForConnection"
              type="checkbox"
              v-model="site.site_ready_for_connection"
            >
            <label v-if="editSite" for="siteReadyForConnection" class="label-primary"></label>
          </div>
        </div>
        <div class="row" v-if="$store.state.user_type != 'client'">
          <div class="col-md-6">
            <p class="switch-label">Site USD Rate:</p>
          </div>
          <div class="form-group col-md-5" style="padding-right: 0px">
            <p v-if="!editSite">{{ site.site_usd_rate }}</p>
            <input
              v-if="editSite"
              type="number"
              class="form-control"
              v-model="site.site_usd_rate"
              style="width: 100%"
            >
          </div>
        </div>
        <div class="form-group">
          <label>Site Image</label>
          <img v-if="!editSite && !loading" id="image-view" v-bind:src="site.site_image" alt="Image" style="width: 100%">
          <div v-if="!editSite && loading" class="loading-image container">
            <img src="../../../assets/imgs/loading.gif">
          </div>
          <div class="dropbox" v-if="editSite">
            <input
              type="file"
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="filesChange($event.target.name, $event.target.files);"
              accept="image/*"
              class="input-file"
            >
            <p v-if="isInitial">Drag your file(s) here to begin
              <br>or click to browse
            </p>
            <p v-if="isSaving">
              <img id="blah" src="#" alt="your image">
              <br>
              {{ fileNames }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 container">
            <button
              v-if="!editSite && $store.state.user_role != 'management'"
              style="width: 100%"
              type="button"
              class="btn btn-default ac_btn"
              v-on:click="reset();editSite = true"
            >Edit</button>
            <button
              v-if="editSite"
              style="width: 100%"
              type="button"
              class="btn btn-primary ac_btn"
              v-on:click="updateSite()"
            >Save</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { select } from "../../mixins/select";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import moment from "moment";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  mixins: [select],
  data(router) {
    return {
      site: {
        survey_date: "",
        current_stage: "",
        can_client_view_survey_reports: "",
        site_accepted: "",
        site_connection_request_acknowledged: "",
        site_accessible: "",
        site_ready_for_connection: "",
        site_connected: "",
        site_connection_date: "",
        site_usd_rate: "",
        site: ""
      },
      editSite: false,

      //this is for the upload
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos".mapState,
      formData: new FormData(),
      fileNames: null
    };
  },
  created() {},
  computed: {
    loading () {
      return this.$store.state.sites.loading
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
  mounted() {
    this.initialise(window.localStorage.getItem("selectsite"));

    //this is for the upload
    this.reset();
  },
  methods: {
    updateSite() {
      const { site } = this;

      if (site.survey_date) {
        site.survey_date = moment(site.survey_date).format("YYYY-MM-DD");
      }
      if (site.site_connection_date) {
        site.site_connection_date = moment(site.site_connection_date).format(
          "YYYY-MM-DD[T]HH:mm:ss"
        );
      }

      this.formData.append("id", site.id);
      this.formData.append("current_stage", site.current_stage);
      this.formData.append(
        "can_client_view_survey_reports",
        site.can_client_view_survey_reports
      );
      this.formData.append("site_accepted", site.site_accepted);
      this.formData.append(
        "site_connection_request_acknowledged",
        site.site_connection_request_acknowledged
      );
      this.formData.append("site_accessible", site.site_accessible);
      this.formData.append(
        "site_ready_for_connection",
        site.site_ready_for_connection
      );
      this.formData.append("site_connected", site.site_connected);
      this.formData.append("site_connected", site.site_connected);

      if(site.survey_date != null){
        this.formData.append("survey_date", site.survey_date);
      }
      
      if(site.site_connection_date != null){
        this.formData.append("site_connection_date", site.site_connection_date);
      }

      if(site.site_usd_rate != null){
        this.formData.append("site_usd_rate", site.site_usd_rate);
      }

      this.$store.dispatch("sites/updateSite", this.formData);
      this.editSite = false;
    },
    initialise(id) {
      let site = this.$store.getters["sites/getSite"](id);
      this.site = site[0];
    },
    //this is for the upload
    reset() {
      // reset form to initial state
      (this.formData = new FormData()), (this.currentStatus = STATUS_INITIAL);
      this.uploadedFiles = null;
      this.uploadError = null;
      this.fileNames = null;
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;

      var reader = new FileReader();

      reader.onload = function(e) {
        $("#blah")
          .attr("src", e.target.result)
          .width(300)
          .height(200);
        $("#image-view").attr("src", e.target.result)
      };

      reader.readAsDataURL(fileList[0]);

      // append the files to FormData
      this.formData.append("site_image", fileList[0], fileList[0].name);
      this.fileNames = fileList[0].name;

      this.currentStatus = STATUS_SAVING;
    }
  }
};
</script>

<style>
.switch-label {
  font-weight: 400;
}
.material-switch > input[type="checkbox"] {
  display: none;
}

.material-switch > label {
  cursor: pointer;
  height: 0px;
  position: relative;
  width: 40px;
}

.material-switch > label::before {
  background: rgb(0, 0, 0);
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  content: "";
  height: 16px;
  margin-top: -8px;
  position: absolute;
  opacity: 0.3;
  transition: all 0.4s ease-in-out;
  width: 40px;
}
.material-switch > label::after {
  background: rgb(255, 255, 255);
  border-radius: 16px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  content: "";
  height: 24px;
  left: -4px;
  margin-top: -8px;
  position: absolute;
  top: -4px;
  transition: all 0.3s ease-in-out;
  width: 24px;
}
.material-switch > input[type="checkbox"]:checked + label::before {
  background: inherit;
  opacity: 0.5;
}
.material-switch > input[type="checkbox"]:checked + label::after {
  background: inherit;
  left: 20px;
}
</style>


