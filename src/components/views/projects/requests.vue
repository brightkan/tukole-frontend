<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-10">
        <h3>Survey requests</h3>
      </div>

      <div class="comp-title col-md-2">
        <button
          v-if="$store.state.user_type == 'client'"
          type="button"
          v-on:click="showForm();resetRequest()"
        >Add Request</button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3>
            <i class="fa fa-sitemap"></i> Requests
          </h3>
          <table>
            <thead>
              <tr v-if="getRequests.length > 0">
                <td>Request</td>
                <td>Creation Date</td>
                <td>Acknowledgement Status</td>
                <!-- <td>Site Drawing</td> -->
                <td v-if="$store.state.user_role != 'management'">Actions</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in getRequests" :key="request.id">
                <td>{{ request.site_name }}</td>
                <td>{{ request.created | moment("MMM Do YYYY")}}</td>
                <td>{{ request.ackStatus ? 'Acknowledged' : 'Not Acknowledged' }}</td>
                <!-- <td>
                  <a
                    v-if="request.site_drawing != null"
                    class="mdc-button mdc-button--raised"
                    target="_blank"
                    v-bind:href="request.site_drawing"
                    download
                  >Download</a>
                  <span v-if="request.site_drawing == null">No Drawing</span>
                </td> -->
                <td v-if="$store.state.user_role == 'project_manager'" class="text-right">
                  <button
                    class="mdc-button mdc-button--raised"
                    style="margin-right: 15px"
                    v-if="!request.ackStatus && $store.state.user_type == 'project_manager'"
                    v-on:click="ackSite(request)"
                  >Acknowledge site</button>
                  <i v-if="!request.ackStatus" class="fa fa-times" v-on:click="deleteSite(request)"></i>
                </td>
              </tr>
              <tr v-if="getRequests.length <= 0">
                <td colspan="7" class="text-center">No Requests Yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <modal
      name="modal"
      class="custom-modal"
      height="auto"
      :scrollable="true"
      v-if="this.$route.meta.type != 'ProjectOverview'"
    >
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">Add Request</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveSite()">
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="site.site_name" label="Request Name" outline required />
                    <mdc-textfield v-model="site.site_address" label="Site address" outline />
                    <mdc-textfield
                      v-model="site.site_contact_person"
                      label="Site Contact Person"
                      outline
                    />
                    <mdc-textfield
                      v-model="site.site_contact_phone_number"
                      label="Contact Person Number"
                      helptext="Enter correct phone number format"
                      :valid="isValidTel"
                      helptext-validation
                      @keyup="checkTelValidity"
                      outline
                    />
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="site.location_lat" label="Location Latitude" outline />
                    <mdc-textfield v-model="site.location_long" label="Location longitude" outline />
                    <mdc-textfield
                      v-model="site.original_trenching_distance"
                      label="Original trenching distance in Meters"
                      outline
                    />
                    <mdc-select v-model="site.site_type" label="Site Type" outlined>
                      <option v-bind:value="'single'" :key="'1'">Single</option>
                      <option v-bind:value="'dual'" :key="'2'">Dual</option>
                      <option v-bind:value="'shared'" :key="'3'">Shared</option>
                    </mdc-select>
                  </div>
                </div>

                <!-- <div class="row">
                  <div class="col-md-12">
                    <div class="dropbox">
                      <p
                        class="note"
                        v-if="isInitial"
                        style="position: absolute;"
                      >Click to upload site drawing</p>
                      <p class="note" v-if="isSaving">{{ fileName }}</p>
                      <input
                        type="file"
                        multiple
                        :name="uploadFieldName"
                        :disabled="isSaving"
                        @change="filesChange($event.target.name, $event.target.files);"
                        accept="image/*"
                        class="input-file"
                      />
                    </div>
                  </div>
                </div> -->

                <br />

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised">Add Request</button>
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

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data(router) {
    return {
      selectedSite: window.localStorage.getItem("selectsite"),
      editMode: false,
      isValidTel: true,
      site: {
        site_name: "",
        location_lat: "",
        location_long: "",
        archivedStatus: false,
        clientId: JSON.parse(window.localStorage.getItem("user")).user_id,
        ackStatus: false,
        company: window.localStorage.getItem("company"),
        workspace: window.localStorage.getItem("workspace"),
        original_trenching_distance: "",
        current_trenching_distance: "",
        site_contact_person: "",
        site_contact_phone_number: "",
        site_address: "",
        site_completed: "false",
        isp_works_complete: "false",
        osp_works_complete: "false",
        ofc_works_complete: "false",
        site_powering_complete: "false",
        site_type: ""
      },

      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos".mapState,
      formData: new FormData(),
      fileName: ""
    };
  },
  mounted() {
    this.$store.dispatch(
      "sites/loadSites",
      window.localStorage.getItem("workspace")
    );
    this.reset();
  },
  computed: {
    ...mapState("sites", ["sites"]),
    ...mapGetters("sites", ["getRequests"]),
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
    saveSite() {
      const { site } = this;
      this.$modal.hide("modal");

      this.formData.append("id", site.id);
      this.formData.append("site_name", site.site_name);
      this.formData.append("location_lat", site.location_lat);
      this.formData.append("location_long", site.location_long);
      this.formData.append("archivedStatus", site.archivedStatus);
      this.formData.append("clientId", site.clientId);
      this.formData.append("ackStatus", site.ackStatus);
      this.formData.append("company", site.company);
      this.formData.append("workspace", site.workspace);
      this.formData.append(
        "original_trenching_distance",
        site.original_trenching_distance
      );
      this.formData.append("site_contact_person", site.site_contact_person);
      this.formData.append(
        "site_contact_phone_number",
        site.site_contact_phone_number
      );
      this.formData.append("site_address", site.site_address);
      this.formData.append("site_completed", site.site_completed);
      this.formData.append("isp_works_complete", site.isp_works_complete);
      this.formData.append("osp_works_complete", site.osp_works_complete);
      this.formData.append("ofc_works_complete", site.ofc_works_complete);
      this.formData.append(
        "site_powering_complete",
        site.site_powering_complete
      );

      console.log(this.formData);

      if (this.isValidTel) {
        if (this.editMode) {
          this.$store.dispatch("sites/updateSite", this.formData);
        } else {
          this.$store.dispatch("sites/addSite", this.formData);
        }
      }
    },
    ackSite(site) {
      this.editMode = true;
      this.site = Object.assign({}, site);
      this.site.ackStatus = true;
      this.saveSite();
    },
    deleteSite(site) {
      if (confirm(`are you sure you want to delete ${site.site_name}?`)) {
        this.$store.dispatch("sites/deleteSite", site);
      }
    },
    resetRequest() {
      this.editMode = false;
      this.site = {
        site_name: "",
        location_lat: "",
        location_long: "",
        archivedStatus: false,
        clientId: JSON.parse(window.localStorage.getItem("user")).user_id,
        ackStatus: false,
        company: window.localStorage.getItem("company"),
        workspace: window.localStorage.getItem("workspace"),
        original_trenching_distance: "",
        current_trenching_distance: "",
        site_contact_person: "",
        site_contact_phone_number: "",
        site_address: "",
        site_completed: "false",
        isp_works_complete: "false",
        osp_works_complete: "false",
        ofc_works_complete: "false",
        site_powering_complete: "false",
        site_type: ""
      };
    },
    filter(type) {
      this.$store.commit("sites/CHANGE_REQUEST_LIST", type);
    },

    reset() {
      // reset form to initial state
      (this.formData = new FormData()), (this.currentStatus = STATUS_INITIAL);
      this.uploadedFiles = [];
      this.uploadError = null;
      this.fileName = "";
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        this.formData.append("site_drawing", fileList[x], fileList[x].name);
        this.fileName = fileList[x].name;
      });

      this.currentStatus = STATUS_SAVING;
    },
    checkTelValidity(evt) {
      var phoneno = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
      var phoneNumber = evt.srcElement.value;

      if (phoneNumber.match(phoneno)) {
        this.isValidTel = true;
      } else {
        this.isValidTel = false;
      }
    }
  }
};
</script>

<style lang="scss">
.custom-modal .v--modal-box.v--modal {
  width: 700px !important;
}
</style>


