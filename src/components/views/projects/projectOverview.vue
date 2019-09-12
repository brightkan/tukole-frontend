<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div
      class="alert alert-primary"
      role="alert"
      v-if="site.site_ready_for_connection && !site.site_connected"
    >Site is ready for connection</div>

    <div
      class="row"
      v-if="$store.state.user_type != 'client'"
      style="padding-top: 20px; padding-bottom: 40px;"
    >
      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #003d8f">
          <span>
            <i class="fa fa-truck"></i>
          </span>
          <div class="col-md-12">
            <h3>{{ siteFleets.length }}</h3>
            <p>Total number of vehicles</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #429640">
          <span>
            <i class="fa fa-dollar-sign"></i>
          </span>
          <div class="col-md-12">
            <p class="currency">UGX</p>
            <h3>
              <small>{{ getBoqTotal | formatNumber }}</small>
            </h3>
            <p>Estimated budget</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #08bdff">
          <span>
            <i class="fa fa-users"></i>
          </span>
          <div class="col-md-12">
            <h3>
              <small>{{ siteRoles.length }}</small>
            </h3>
            <p>Employees on project</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #28354a">
          <span>
            <i class="fa fa-cogs"></i>
          </span>
          <div class="col-md-12">
            <h3>
              <small>76</small>
            </h3>
            <p>Hours</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="timeline-box">
          <h3 class="timeline-activites-label" style="padding: 0">Activities</h3>

          <div v-for="report in activities" :key="report.index" class="row timeline-content">
            <div class="col-md-2">{{ report.created | moment("MMM Do YYYY") }}</div>
            <div class="col-md-1">{{ report.created | moment("h:ss") }}</div>
            <div class="col-md-9">
              <b>{{ report.title }} <i>by {{ report.user.first_name }} {{ report.user.last_name }}</i>: </b> {{ report.description }} from {{ report.start_time | moment("MMM Do YYYY h:ss") }} to {{ report.end_time | moment("MMM Do YYYY h:ss") }}
              <span class="float-right">
                Duration: {{ report.duration / 60 | formatNumber }} mins
              </span>
              <br/>
              <a v-bind:href="report.image" target="_blank"><img style="max-height: 100px" v-bind:src="report.image"/></a>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="row _projects" v-if="$store.state.user_type != 'client'">
      <div class="col-md-12">
        <div class="tab-layout">
          <ul class="nav nav-tabs" role="tablist" data-tabs="tabs">
            <li>
              <a class="active" href="#Commentary" data-toggle="tab" role="tab">Team</a>
            </li>
            <li>
              <a href="#Videos" data-toggle="tab" role="tab" v-on:click="loadSiteFleets()">Fleet</a>
            </li>
            <li>
              <a href="#Events" data-toggle="tab" role="tab" v-on:click="loadSiteTools()">Tool</a>
            </li>
            <li>
              <a
                href="#Machinery"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteMachinery()"
              >Machinery</a>
            </li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade show active" id="Commentary">
              <div class="table-alt">
                <h3>
                  <i class="fa fa-wrench"></i>
                  Site Team
                  <button
                    class="float-right mdc-button mdc-button--raised"
                    v-on:click="addSiteRole = true"
                  >Add Member</button>
                  <div class="float-right dropbox-file rounded-square-2">
                    <input
                      type="file"
                      :name="uploadFieldName"
                      :disabled="isSaving"
                      @change="filesChangeExcel($event.target.name, $event.target.files);"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      class="input-file file-upload"
                    >
                    <p v-if="isInitial">Upload Teams excel</p>
                    <p v-if="isSaving">
                      {{ fileNames }}
                    </p>
                  </div>
                </h3>
                <table>
                  <thead>
                    <tr v-if="siteRoles.length > 0">
                      <td>Name</td>
                      <td>Contact</td>
                      <td>Role</td>
                      <td>Creation Date</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="form" v-if="addSiteRole">
                      <td colspan="7">
                        <form class="form-inline" role="form" v-on:submit.prevent="saveSiteRole">
                          <div class="form-group col-md-3">
                            <mdc-select v-model="siteRole.user" label="User" required outlined>
                              <option v-for="user in getUsers" :key="user.id" :value="user.id">
                                {{ user.first_name }} {{ user.last_name }}
                              </option>
                            </mdc-select>
                          </div>
                          
                          <div class="form-group col-md-3">
                            <mdc-select v-model="siteRole.role" label="Role" required outlined>
                              <option :value="'driver'">Driver</option>
                              <option :value="'isp'">ISP</option>
                              <option :value="'quality'">Quality</option>
                              <option :value="'ofc'">OFC</option>
                              <option :value="'surveyor'">Surveyor</option>
                              <option :value="'project_manager'">Project Manager</option>
                              <option :value="'fleet_manager'">Fleet Manager</option>
                              <option :value="'osp_field_manager'">OSP Field Manager</option>
                              <option :value="'osp_supervisor'">OSP Supervisor</option>
                            </mdc-select>
                          </div>
                          
                          <div class="form-group col-md-3">
                            <button class="float-right mdc-button mdc-button--raised">Add</button>
                          </div>
                        </form>
                      </td>
                    </tr>
                    <tr v-for="siteRole in siteRoles" :key="siteRole.id">
                      <td>{{ siteRole.user.first_name }} {{ siteRole.user.last_name }}</td>
                      <td>{{ siteRole.user.phone_number }}</td>
                      <td style="text-transform: capitalize">{{ siteRole.role }}</td>
                      <td>{{ siteRole.created | moment("MMM Do YYYY") }}</td>
                      <td>
                        <i class="fa fa-times" v-on:click="deleteSiteRole(siteRole)"></i>
                      </td>
                    </tr>
                    <tr v-if="siteRoles.length <= 0">
                      <td colspan="7" class="text-center">No Site Roles Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="Videos">
              <div class="table-alt">
                <h3>
                  <i class="fa fa-wrench"></i>
                  Site Fleet
                  <button class="float-right mdc-button mdc-button--raised" v-on:click="addSiteFleet = true">
                    Add Fleet</button>
                </h3>
                <table>
                  <thead>
                    <tr v-if="siteFleets.length > 0">
                      <td>Vehicle</td>
                      <td>Number Plate</td>
                      <td>Type</td>
                      <td>Creation Date</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="form" v-if="addSiteFleet">
                      <td colspan="7">
                        <form class="form-inline" role="form" v-on:submit.prevent="saveSiteFleet">
                          <div class="form-group col-md-10">
                            <mdc-select v-model="siteFleet.fleet" label="Fleet" required outlined>
                               <option v-for="fleet in fleets" :key="fleet.id" v-bind:value="fleet.id" >
                                 {{ fleet.name }}</option>
                            </mdc-select>
                          </div>
                          <div class="form-group col-md-2">
                            <button class="float-right mdc-button mdc-button--raised">Add</button>
                          </div>
                        </form>
                      </td>
                    </tr>
                    <tr v-for="siteFleet in siteFleets" :key="siteFleet.id">
                      <td>{{ siteFleet.fleet.name }}</td>
                      <td>{{ siteFleet.fleet.humanUuid }}</td>
                      <td>{{ siteFleet.fleet.vehicle_type.type }}</td>
                      <td>{{ siteFleet.created | moment("MMM Do YYYY") }}</td>
                      <td>
                        <i class="fa fa-times" v-on:click="deleteSiteFleet(siteFleet)"></i>
                      </td>
                    </tr>
                    <tr v-if="siteFleets.length <= 0">
                      <td colspan="7" class="text-center">No Fleets Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="Events">
              <div class="table-alt">
                <h3>
                  <i class="fa fa-wrench"></i>
                  Site Tools
                  <button class="float-right mdc-button mdc-button--raised" v-on:click="addSiteTool = true">
                    Add Tool</button>
                </h3>
                <table>
                  <thead>
                    <tr v-if="siteTools.length > 0">
                      <td>Tool</td>
                      <td>Serial Number</td>
                      <td>Type</td>
                      <td>Creation Date</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="form" v-if="addSiteTool">
                      <td colspan="7">
                        <form class="form-inline" role="form" v-on:submit.prevent="saveSiteTool">
                          <div class="form-group col-md-10">
                            <mdc-select v-model="siteTool.tool" label="Tool" required outlined>
                               <option v-for="tool in tools" :key="tool.id" v-bind:value="tool.id" >
                              {{ tool.name }}</option>
                            </mdc-select>
                          </div>
                          <div class="form-group col-md-2">
                            <button class="float-right mdc-button mdc-button--raised">Add</button>
                          </div>
                        </form>
                      </td>
                    </tr>
                    <tr v-for="siteTool in siteTools" :key="siteTool.id">
                      <td>{{ siteTool.tool.name }}</td>
                      <td>{{ siteTool.tool.humanUuid }}</td>
                      <td>{{ siteTool.tool.type.type }}</td>
                      <td>{{ siteTool.created | moment("MMM Do YYYY") }}</td>
                      <td>
                        <i class="fa fa-times" v-on:click="deleteSiteTool(siteTool)"></i>
                      </td>
                    </tr>

                    <tr v-if="siteTools.length <= 0">
                      <td colspan="7" class="text-center">No Site Tools Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="Machinery">
              <div class="table-alt">
                <h3>
                  <i class="fa fa-wrench"></i>
                  Site Machinery
                  <button class="float-right mdc-button mdc-button--raised" v-on:click="addSiteMachinery = true">
                    Add Machine</button>
                </h3>
                <table>
                  <thead>
                    <tr v-if="siteMachines.length > 0">
                      <td>Machine</td>
                      <td>Serial Number</td>
                      <td>Creation Date</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="form" v-if="addSiteMachinery">
                      <td colspan="7">
                        <form class="form-inline" role="form" v-on:submit.prevent="saveSiteMachinery">
                          <div class="form-group col-md-10">
                            <mdc-select v-model="siteMachinery.machine" label="Machine" required outlined>
                               <option v-for="machine in machines" :key="machine.id" v-bind:value="machine.id">
                                 {{ machine.name }}</option>
                            </mdc-select>
                          </div>
                          <div class="form-group col-md-2">
                            <button class="float-right mdc-button mdc-button--raised">Add</button>
                          </div>
                        </form>
                      </td>
                    </tr>
                    <tr v-for="siteMachine in siteMachines" :key="siteMachine.id">
                      <td>{{ siteMachine.machine.name }}</td>
                      <td>{{ siteMachine.machine.humanUuid }}</td>
                      <td>{{ siteMachine.created | moment("MMM Do YYYY") }}</td>
                      <td>
                        <i class="fa fa-times" v-on:click="deleteSiteMachinery(siteMachine)"></i>
                      </td>
                    </tr>

                    <tr v-if="siteMachines.length <= 0">
                      <td colspan="7" class="text-center">No Site Machines Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row site-images" v-if="$store.state.user_type != 'client' || 
      ($store.state.user_type == 'client' && site.can_client_view_survey_reports)">
      <div class="col-md-12">
        <div class="table-alt">
          <h3>
            <i class="fa fa-wrench"></i>
            Survey Results
            <button class="float-right mdc-button mdc-button--raised" v-on:click="openSurveyForm();resetSurveyResult();reset();">
              Upload survey result</button>
          </h3>
          <table>
            <thead>
              <tr v-if="surveyResults.length > 0">
                <td>Title</td>
                <td>Status</td>
                <td>Creation Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="surveyResult in surveyResults" :key="surveyResult.id">
                <td>{{ surveyResult.title != 'undefined' ? surveyResult.title : 'No file' }}</td>
                <td>{{ surveyResult.acceptStatus ? 'Accepted' : 'Not Accepted' }}</td>
                <td>{{ surveyResult.created | moment("dddd, MMMM Do YYYY") }}</td>
                <td style="text-align: right">
                  <a class="mdc-button mdc-button--raised" style="color: #fff"
                    v-on:click="showCommentForm();getSurveyComments(surveyResult)"
                  >comments ({{ surveyResult.number_of_comments }}) </a>
                  <a class="mdc-button mdc-button--raised" target="_blank"
                    v-bind:href="surveyResult.file_url" download>Download</a>
                </td>
              </tr>
              <tr v-if="surveyResults.length <= 0">
                <td colspan="7" class="text-center">No Survey Results yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <modal name="SurveyModal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">Add survey result</h5>
          <button type="button" class="close" v-on:click="hideSurveyForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving" v-on:submit.prevent="saveSurveyResult"> 
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="dropbox">
                      <input
                        type="file"
                        multiple
                        :name="uploadFieldName"
                        :disabled="isSaving"
                        @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept="image/*"
                        class="input-file"
                      >
                      <p v-if="isInitial">Drag your file(s) here to begin
                        <br>or click to browse
                      </p>
                      <p v-if="isSaving">
                        Uploading {{ fileCount }} files...
                        <br>
                        {{ fileNames }}
                      </p>
                    </div>
                  </div>
                </div>

                <mdc-textfield v-model="surveyResult.title" label="Title" required outline/>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >Add survey result</button>
            </div>
          </form>
        </div>
      </div>
    </modal>


    <modal name="CommentModal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">Survey Drawing Comments</h5>
          <button type="button" class="close" v-on:click="hideCommentForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="modal-body">
            <div class="detailBox">
              <div class="commentBox">
                <form class="form-inline" v-on:submit.prevent="saveSurveyComment">
                  <div class="form-group">
                    <mdc-textfield v-model="surveyResultComment.comment" label="Your comments" outline/>
                  </div>
                  <div class="form-group">
                    <button class="mdc-button mdc-button--raised">Add</button>
                  </div>
                </form>
              </div>
              <div class="actionBox">
                <ul class="commentList">
                  <li v-for="surveyComment in surveyComments" :key="surveyComment.id">
                    <div class="commenterImage">
                      <img src="http://placekitten.com/50/50">
                    </div>
                    <div class="commentText">
                      <p class>{{ surveyComment.comment }}</p>
                      <span
                        class="date sub-text"
                      >on {{ surveyComment.created | moment("dddd, MMMM Do YYYY") }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button class="mdc-button mdc-button--raised" >Add survey result</button> -->
            <form>
              <select
                class="form-control"
                v-model="selectedSurveyResult.acceptStatus"
                style="position: absolute; left: 15px;"
              >
                <option v-bind:value="'true'">Accepted</option>
                <option v-bind:value="'false'">Not Accepted</option>
              </select>
              
              <button type="button" class="mdc-button mdc-button--raised float-right"
                v-on:click="surveyResultAcceptance" style="padding: 10px"
                data-dismiss="modal">Save</button>
            </form>
          </div>
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
      userFleet: null,
      addSiteRole: false,
      addSiteFleet: false,
      addSiteTool: false,
      addSiteMachinery: false,
      siteRole: {
        site: window.localStorage.getItem("selectsite"),
        user: "",
        role: ""
      },
      siteFleet: {
        site: window.localStorage.getItem("selectsite"),
        fleet: ""
      },
      siteTool: {
        site: window.localStorage.getItem("selectsite"),
        tool: ""
      },
      siteMachinery: {
        site: window.localStorage.getItem("selectsite"),
        machine: ""
      },
      surveyResult: {
        file_url: "",
        title: ""
      },

      //this is for the upload
      fileCount: 0,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos".mapState,
      formData: new FormData(),
      fileNames: [],
      surveyResultComment: {
        comment: "",
        survey_result: "",
        readStatus: false
      },
      selectedSurveyResult: ""
    };
  },
  created() {},
  computed: {
    ...mapState({
      site: state => state.sites.site,
      surveyResults: state => state.sites.surveyResults,
      siteRoles: state => state.sites.siteRoles,
      siteFleets: state => state.sites.siteFleets,
      siteTools: state => state.sites.siteTools,
      siteMachines: state => state.sites.siteMachinery,
      fleets: state => state.fleets.fleets,
      tools: state => state.tools.tools,
      machines: state => state.machinery.machines,
      surveyComments: state => state.sites.surveyComments,
      activities: state => state.reports.activities
    }),
    getUsers() {
      return this.$store.getters["users/getUsers"];
    },
    getBoqTotal() {
      return this.$store.getters["sites/getBoqTotal"];
    },
    getReports() {
      return this.$store.getters["reports/getReports"];
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
    },

    ofcUsers() {
      return this.$store.getters.users.ofcUsers;
    }
  },
  mounted() {
    this.$store.commit("users/CHANGE_LIST_TYPE", "all");
    this.$store.dispatch(
      "sites/loadSite",
      window.localStorage.getItem("selectsite")
    );
    this.$store.dispatch(
      "sites/getSurveyImages",
      window.localStorage.getItem("selectsite")
    );
    this.$store.dispatch("sites/loadBoqs",
      window.localStorage.getItem("selectsite")
    );
    //this.$store.dispatch("reports/loadReports",window.localStorage.getItem("selectsite"));

    this.$store.dispatch("reports/loadActivities",window.localStorage.getItem("selectsite"));
    //this is for the upload
    this.reset();
  },
  methods: {
    hideCommentForm(){
      this.$modal.hide("CommentModal");
    },
    showCommentForm(){
      this.$modal.show("CommentModal");
    },
    hideSurveyForm(){
      this.$modal.hide("SurveyModal");
    },
    openSurveyForm(){
      this.$modal.show("SurveyModal");
    },
    loadSiteFleets() {
      this.$store.dispatch(
        "sites/loadSiteFleets",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteTools() {
      this.$store.dispatch(
        "sites/loadSiteTools",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteMachinery() {
      this.$store.dispatch(
        "sites/loadSiteMachinery",
        window.localStorage.getItem("selectsite")
      );
    },
    saveSurveyResult() {
      const { surveyResult } = this;
      this.hideSurveyForm();
      this.formData.append("title", surveyResult.title);
      this.formData.append("site", window.localStorage.getItem("selectsite"));
      this.formData.append("surveyor",JSON.parse(window.localStorage.getItem("user")).user_id);
      this.formData.append("acceptStatus", "false");

      if(this.formData.get('file_url') && surveyResult.title){
        this.$store.dispatch("sites/addSurveyResult", this.formData);
      } 
    },
    deleteSurveyResult(surveyResult) {
      if (confirm(`are you sure you want to delete ${surveyResult}?`)) {
        this.$store.dispatch("sites/deleteSurveyResult", surveyResult);
      }
    },
    deleteSiteRole(siteRole) {
      if (
        confirm(`are you sure you want to delete ${siteRole.user.first_name}?`)
      ) {
        this.$store.dispatch("sites/deleteSiteRole", siteRole);
      }
    },
    deleteSiteFleet(siteFleet) {
      if (confirm(`are you sure you want to delete ${siteFleet.fleet.name}?`)) {
        this.$store.dispatch("sites/deleteSiteFleet", siteFleet);
      }
    },
    deleteSiteTool(siteTool) {
      if (confirm(`are you sure you want to delete ${siteTool.tool.name}?`)) {
        this.$store.dispatch("sites/deleteSiteTool", siteTool);
      }
    },
    deleteSiteMachinery(siteMachine) {
      if (
        confirm(`are you sure you want to delete ${siteMachine.machine.name}?`)
      ) {
        this.$store.dispatch("sites/deleteSiteMachinery", siteMachine);
      }
    },
    resetSurveyResult() {
      this.surveyResult = {
        file: ""
      };
    },
    saveSiteRole(role) {
      this.addSiteRole = false;
      const { siteRole } = this;
      if (this.userFleet != null) {
        this.$store.dispatch("sites/addUserSiteFleet", {
          user: siteRole.user,
          site_fleet: this.userFleet
        });
      }
      this.$store.dispatch("sites/addSiteRole", siteRole);
      this.userFleet = null;
    },
    saveSiteFleet(role) {
      this.addSiteFleet = false;
      const { siteFleet } = this;
      this.$store.dispatch("sites/addSiteFleet", siteFleet);
    },
    saveSiteTool(tool) {
      this.addSiteTool = false;
      const { siteTool } = this;
      this.$store.dispatch("sites/addSiteTool", siteTool);
    },
    saveSiteMachinery() {
      this.addSiteMachinery = false;
      const { siteMachinery } = this;
      this.$store.dispatch("sites/addSiteMachinery", siteMachinery);
    },
    getSurveyComments(survey_result) {
      //show loading
      this.selectedSurveyResult = survey_result;
      this.$store.commit("sites/SET_SURVEY_COMMENTS", []);
      this.surveyResultComment.survey_result = survey_result.id;
      this.$store.dispatch("sites/getSurveyComments", survey_result.id);
    },
    saveSurveyComment() {
      const { surveyResultComment } = this;
      if(surveyResultComment.comment != ""){
        
        let data = Object.assign({}, surveyResultComment);
        console.log(data)
        this.$store.dispatch("sites/addSurveyComment", data);
        this.surveyResultComment.comment = "";
      }
    },
    surveyResultAcceptance() {
      const { selectedSurveyResult } = this;
      this.$store.dispatch("sites/updateSurveyResult", selectedSurveyResult);
    },

    reset() {
      // reset form to initial state
      (this.formData = new FormData()), (this.currentStatus = STATUS_INITIAL);
      this.uploadedFiles = [];
      this.uploadError = null;
      this.fileNames = [];
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        this.formData.append("file_url", fileList[x], fileList[x].name);
        this.fileNames.push(fileList[x].name);
      });

      this.currentStatus = STATUS_SAVING;
    },
    filesChangeExcel(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;
      // append the files to FormData
      this.formData.append("file", fileList[0], fileList[0].name);
      this.fileNames = fileList[0].name;


      this.currentStatus = STATUS_SAVING;
      this.formData.append("site", window.localStorage.getItem("selectsite"));
      this.$store.dispatch("sites/massAddTeams", this.formData);
      this.reset()
    },
  }
};
</script>

<style lang="scss" scoped>
._projects,
.site-images {
  margin-top: 30px;
}
/* Timeline */
.timeline-box {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  padding: 27px 38px;
}
.timeline-box h3 {
  margin: 0;
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
}
.timeline-activites-label {
  padding-bottom: 10px;
  padding-top: 30px;
}
.timeline-content {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
  border-bottom: 1.5px solid #e0e0e0;
}
.timeline-content div {
  padding-top: 15px;
  padding-bottom: 15px;
}
.timeline-content div:nth-child(4) {
  padding: 0;
}
.timeline-content div:nth-child(3) span {
  float: right;
  background: #f2f2f2;
  padding: 0 10px;
  border-radius: 5px;
  cursor: pointer;
}

.timeline-content div:nth-child(3) span img {
  opacity: 0.2;
  width: 10px;
  height: 10px;
}

.timeline-content .collapse {
  background-color: #fbfbfb;
  padding: 0 25px;
  font-size: 11px;
}
.timeline-content .collapse > .row {
  padding: 10px 0;
  margin: 0;
}
.timeline-content .collapse > .row div {
  padding: 0;
}

.modal-lg {
  width: 50%;
}

.modal-footer select {
  width: 150px;
  float: left;
}

/* comments box */
.commentBox .form-inline {
  padding: 0;

  .mdc-button.mdc-button--raised{
    padding: 15px;
    margin-left: 5px;
    margin-top: 4px;
  }
}
.commentBox .form-inline input,
.commentBox .form-inline button {
  width: 100%;
}
.commentBox .form-group:first-child,
.actionBox .form-group:first-child {
  width: 80%;
}
.commentBox .form-group:nth-child(2),
.actionBox .form-group:nth-child(2) {
  width: 18%;
}
.actionBox .form-group * {
  width: 100%;
}
.commentList {
  padding: 0;
  list-style: none;
  max-height: 200px;
  overflow: auto;
}
.commentList li {
  margin: 0;
  margin-top: 10px;
}
.commentList li > div {
  display: table-cell;
}
.commenterImage {
  width: 30px;
  margin-right: 5px;
  height: 100%;
  float: left;
}
.commenterImage img {
  width: 100%;
  border-radius: 50%;
}
.commentText p {
  margin: 0;
}
.sub-text {
  color: #aaa;
  font-family: verdana;
  font-size: 11px;
}
.actionBox {
  padding: 10px;
}
</style>


