<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->

    <div class="alert alert-primary" role="alert" v-if="site.site_ready_for_connection && !site.site_connected">
      Site is ready for connection
    </div>

    <div class="row" v-if="$store.state.user_type != 'client'" style="padding-top: 20px; padding-bottom: 40px;">
      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #003d8f">
          <span><i class="fa fa-truck"></i></span>
          <div class="col-md-12">
            <h3>{{ siteFleets.length }}</h3>
            <p>Total number of vehicles</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #429640">
          <span><i class="fa fa-dollar-sign"></i></span>
          <div class="col-md-12">
            <p class="currency">UGX</p>
            <h3><small>{{ getBoqTotal | formatNumber }}</small></h3>
            <p>Estimated budget</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #08bdff">
          <span><i class="fa fa-users"></i></span>
          <div class="col-md-12">
            <h3><small>{{ siteRoles.length }}</small></h3>
            <p>Employees on project</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row" style="background-color: #28354a">
          <span><i class="fa fa-cogs"></i></span>
          <div class="col-md-12">
            <h3><small>76</small></h3>
            <p>Hours</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="timeline-box">
          <h3 class="timeline-activites-label" style="padding: 0">Activities</h3>
          
          <div class="row timeline-content">
            <div class="col-md-2">
              24th - 26th July 2018
            </div>
            <div class="col-md-1">
              Stage 1
            </div>
            <div class="col-md-9">
              Delayed for 2 days due to terrential rains
              <span type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <img src="../../../assets/imgs/down-arrow.png" />
              </span>
            </div>
            <div class="col-md-12">
              <div class="collapse" id="collapseExample">
                <div class="row">
                  <div class="col-md-2">
                    26th July 2018
                  </div>
                  <div class="col-md-10">
                    Rather than entering this information by hand, try the Clerk of Works Report mobile app. This contractor productivity 
                    report template is especially beneficial for a clerk of works who needs to improve productivity among multiple general 
                    contractors on a construction project.
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-2">
                    26th July 2018
                  </div>
                  <div class="col-md-10">
                    Work continued with 500 meters of escavation from Old kampala along buckeley road. 2000 meters of
                    fiber cable was laid.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row timeline-content">
            <div class="col-md-2">
              26th July 2018
            </div>
            <div class="col-md-1">
              Stage 1
            </div>
            <div class="col-md-9">
              Work continued with 500 meters of escavation from Old kampala along buckeley road. 2000 meters of
            fiber cable was laid.
              <span type="button">
                <img src="../../../assets/imgs/down-arrow.png" />
              </span>
            </div>
          </div>

          <div class="row timeline-content">
            <div class="col-md-2">
              26th July 2018
            </div>
            <div class="col-md-1">
              Stage 2
            </div>
            <div class="col-md-9">
              Work continued with 500 meters of escavation from Old kampala along buckeley road. 2000 meters of
              fiber cable was laid.
              <span type="button">
                <img src="../../../assets/imgs/down-arrow.png" />
              </span>
            </div>
          </div>

          <div class="row timeline-content">
            <div class="col-md-2">
              27th July 2018
            </div>
            <div class="col-md-1">
              Stage 3
            </div>
            <div class="col-md-9">
              Work continued with 500 meters of escavation from Old kampala along buckeley road. 2000 meters of
              fiber cable was laid.
              <span type="button">
                <img src="../../../assets/imgs/down-arrow.png" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row _projects" v-if="$store.state.user_type != 'client'">
      <div class="col-md-12">
        <div class="project-roles-box">
            <ul id="listTabs" class="nav nav-tabs" role="tablist" data-tabs="tabs">
              <li><a class="active" href="#Commentary" data-toggle="tab" role="tab">Team</a></li>
              <li><a href="#Videos" data-toggle="tab" role="tab" v-on:click="loadSiteFleets()">Fleet</a></li>
              <li><a href="#Events" data-toggle="tab" role="tab" v-on:click="loadSiteTools()">Tool</a></li>
              <li><a href="#Machinery" data-toggle="tab" role="tab" v-on:click="loadSiteMachinery()">Machinery</a></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade show active" id="Commentary">
                <div class="row">
                  <div class="col-md-5"></div>

                  <div class="comp-title col-md-5">
                    <form method="get" action="/search" class="fleet_search">
                      <input name="q" type="text" size="40" placeholder="Search..." />
                    </form>
                  </div>

                  <div class="comp-title col-md-2">
                    <button type="button" v-on:click="addSiteRole = true">
                      Add Member
                    </button>
                  </div>
                </div>
                <div> <!-- Todo: remove this div-->
                  <table class="table">
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Contact</td>
                        <td>Role</td>
                        <td>Creation Date</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="addSiteRole">
                        <td colspan="7">
                          <form class="form-inline" role="form">
                              <div class="form-group col-md-3">
                                  <select class="form-control" v-model="siteRole.user" style="width: 100%">
                                    <option v-for="user in getUsers" :key="user.id" v-bind:value="user">
                                      {{ user.first_name }} {{ user.last_name }}
                                    </option>
                                  </select>
                              </div>
                              <div class="form-group col-md-3">
                                  <select class="form-control" v-model="siteRole.role" style="width: 100%">
                                    <option v-bind:value="'driver'">Driver</option>
                                    <option v-bind:value="'isp'">ISP</option>
                                    <option v-bind:value="'quality'">Quality</option>
                                    <option v-bind:value="'ofc'">OFC</option>
                                    <option v-bind:value="'surveyor'">Surveyor</option>
                                    <option v-bind:value="'project_manager'">Project Manager</option>
                                    <option v-bind:value="'fleet_manager'">Fleet Manager</option>
                                    <option v-bind:value="'osp_field_manager'">OSP Field Manager</option>
                                    <option v-bind:value="'osp_superisor'">OSP Supervisor</option>
                                  </select>
                              </div>
                              <div class="form-group col-md-3">
                                <select v-if="siteRole.role == 'driver'" class="form-control" v-model="userFleet" style="width: 100%">
                                  <option v-for="siteFleet in siteFleets" :key="siteFleet.id" v-bind:value="siteFleet.id">
                                    {{ siteFleet.fleet.name }}
                                  </option>
                                </select>
                              </div>
                              <div class="form-group col-md-3">
                                  <button style="width: 100%" type="button" class="btn btn-default" v-on:click="saveSiteRole()">Add</button>
                              </div>
                          </form>
                        </td>
                      </tr>
                      <tr v-for="siteRole in siteRoles" :key="siteRole.id">
                        <td>{{ siteRole.user.first_name }} {{ siteRole.user.last_name }}</td>
                        <td>{{ siteRole.user.phone_number }}</td>
                        <td style="text-transform: capitalize">{{ siteRole.role }}</td>
                        <td>{{ siteRole.created | moment("MMM Do YYYY") }}</td>
                        <td><i class="fa fa-times" v-on:click="deleteSiteRole(siteRole)"></i></td>
                      </tr>
                      <tr v-if="siteRoles.length <= 0">
                        <td colspan="7" class="text-center">No Site Roles Yet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Videos">
                <div class="row">
                  <div class="col-md-5"></div>

                  <div class="comp-title col-md-5">
                    <form method="get" action="/search" class="fleet_search">
                      <input name="q" type="text" size="40" placeholder="Search..." />
                    </form>
                  </div>

                  <div class="comp-title col-md-2">
                    <button type="button" v-on:click="addSiteFleet = true">
                      Add Fleet
                    </button>
                  </div>
                </div>
                <table class="table">
                  <thead>
                    <tr>
                      <td>Vehicle</td>
                      <td>Serial Number</td>
                      <td>Type</td>
                      <td>Creation Date</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="addSiteFleet">
                      <td colspan="7">
                        <form class="form-inline" role="form">
                            <div class="form-group col-md-10">
                                <select class="form-control" v-model="siteFleet.fleet" style="width: 100%">
                                  <option v-for="fleet in fleets" :key="fleet.id" v-bind:value="fleet.id">
                                    {{ fleet.name }}
                                  </option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <button style="width: 100%" type="button" class="btn btn-default" v-on:click="saveSiteFleet()">Add</button>
                            </div>
                        </form>
                      </td>
                    </tr>
                    <tr v-for="siteFleet in siteFleets" :key="siteFleet.id">
                      <td>{{ siteFleet.fleet.name }}</td>
                      <td>{{ siteFleet.fleet.humanUuid }}</td>
                      <td>{{ siteFleet.fleet.vehicle_type.type }}</td>
                      <td>{{ siteFleet.created | moment("MMM Do YYYY") }}</td>
                      <td><i class="fa fa-times" v-on:click="deleteSiteFleet(siteFleet)"></i></td>
                    </tr>
                    <tr v-if="siteFleets.length <= 0">
                      <td colspan="7" class="text-center">No Fleets Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Events">
                <div class="row">
                  <div class="col-md-5"></div>

                  <div class="comp-title col-md-5">
                    <form method="get" action="/search" class="fleet_search">
                      <input name="q" type="text" size="40" placeholder="Search..." />
                    </form>
                  </div>

                  <div class="comp-title col-md-2">
                    <button type="button" v-on:click="addSiteTool = true">
                      Add Tool
                    </button>
                  </div>
                </div>
                <table class="table">
                  <thead>
                    <tr>
                      <td>Tool</td>
                      <td>Serial Number</td>
                      <td>Type</td>
                      <td>Creation Date</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="addSiteTool">
                      <td colspan="7">
                        <form class="form-inline" role="form">
                            <div class="form-group col-md-10">
                                <select class="form-control" v-model="siteTool.tool" style="width: 100%">
                                  <option v-for="tool in tools" :key="tool.id" v-bind:value="tool.id">
                                    {{ tool.name }}
                                  </option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <button style="width: 100%" type="button" class="btn btn-default" v-on:click="saveSiteTool()">Add</button>
                            </div>
                        </form>
                      </td>
                    </tr>

                    <tr v-for="siteTool in siteTools" :key="siteTool.id">
                      <td>{{ siteTool.tool.name }}</td>
                      <td>{{ siteTool.tool.humanUuid }}</td>
                      <td>{{ siteTool.tool.type.type }}</td>
                      <td>{{ siteTool.created | moment("MMM Do YYYY") }}</td>
                      <td><i class="fa fa-times" v-on:click="deleteSiteTool(siteTool)"></i></td>
                    </tr>

                    <tr v-if="siteTools.length <= 0">
                      <td colspan="7" class="text-center">No Site Tools Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Machinery">
                <div class="row">
                  <div class="col-md-5"></div>

                  <div class="comp-title col-md-5">
                    <form method="get" action="/search" class="fleet_search">
                      <input name="q" type="text" size="40" placeholder="Search..." />
                    </form>
                  </div>

                  <div class="comp-title col-md-2">
                    <button type="button" v-on:click="addSiteMachinery = true">
                      Add Machine
                    </button>
                  </div>
                </div>
                <table class="table">
                  <thead>
                    <tr>
                      <td>Machine</td>
                      <td>Serial Number</td>
                      <td>Creation Date</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="addSiteMachinery">
                      <td colspan="7">
                        <form class="form-inline" role="form">
                            <div class="form-group col-md-10">
                                <select class="form-control" v-model="siteMachinery.machine" style="width: 100%">
                                  <option v-for="machine in machines" :key="machine.id" v-bind:value="machine.id">
                                    {{ machine.name }}
                                  </option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <button style="width: 100%" type="button" class="btn btn-default" v-on:click="saveSiteMachinery()">Add</button>
                            </div>
                        </form>
                      </td>
                    </tr>

                    <tr v-for="siteMachine in siteMachines" :key="siteMachine.id">
                      <td>{{ siteMachine.machine.name }}</td>
                      <td>{{ siteMachine.machine.humanUuid }}</td>
                      <td>{{ siteMachine.created | moment("MMM Do YYYY") }}</td>
                      <td><i class="fa fa-times" v-on:click="deleteSiteMachinery(siteMachine)"></i></td>
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

    <div class="row site-images" v-if="$store.state.user_type != 'client' || ($store.state.user_type == 'client' && site.can_client_view_survey_reports)">
      <div class="col-md-12">
        <div class="project-roles-box">
          <div class="row">
            <div class="col-md-5">
              <h3>Survey Results</h3>
            </div>

            <div class="comp-title col-md-4">
              
            </div>

            <div class="comp-title col-md-3">
              <button type="button" data-toggle="modal" data-target="#addSurveyResult" 
              v-on:click="resetSurveyResult(); reset();"
              v-if="surveyResults.length > 0">
                Upload survey result
              </button>
            </div>
          </div>
          <div class="row" v-if="surveyResults.length == 0">
            <div class="col-md-12 empty-upload-btn">
              <button type="button" data-toggle="modal" data-target="#addSurveyResult" v-on:click="resetSurveyResult(); reset()">
                Upload survey result
              </button>
            </div>
          </div>

          <table class="table" v-if="surveyResults.length > 0">
            <thead>
              <tr>
                <td>Title</td>
                <td>Status</td>
                <td>Creation Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="surveyResult in surveyResults" :key="surveyResult.id">
                <td>{{ surveyResult.title }}</td>
                <td>{{ surveyResult.acceptStatus }}</td>
                <td>{{ surveyResult.created | moment("dddd, MMMM Do YYYY") }}</td>
                <td>
                  <a class="custom-btn" data-toggle="modal" data-target="#surveyResultsComment" v-on:click="getSurveyComments(surveyResult)">comments</a>
                  <a class="custom-btn btn-light" target="_blank" v-bind:href="surveyResult.file_url" download>Download</a>
                </td>
              </tr>
            </tbody>
          </table>          
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="surveyResultsComment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Survey Result title
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="detailBox">
              <div class="commentBox">
                  <form class="form-inline" role="form">
                      <div class="form-group">
                          <input class="form-control" v-model="surveyResultComment.comment" type="text" placeholder="Your comments" />
                      </div>
                      <div class="form-group">
                          <button type="button" class="btn btn-default" v-on:click="saveSurveyComment()">Add</button>
                      </div>
                  </form>
              </div>
              <div class="actionBox">
                  <ul class="commentList">
                      <li v-for="surveyComment in surveyComments" :key="surveyComment.id">
                          <div class="commenterImage">
                            <img src="http://placekitten.com/50/50" />
                          </div>
                          <div class="commentText">
                              <p class="">{{ surveyComment.comment }}</p> <span class="date sub-text">on {{ surveyComment.created | moment("dddd, MMMM Do YYYY") }}</span>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          </div>
          <div class="modal-footer">
            <form>
              <select class="form-control" v-model="selectedSurveyResult.acceptStatus" style="position: absolute; left: 15px;">
                <option v-bind:value="'true'">Accepted</option>
                <option v-bind:value="'false'">Not Accepted</option>
              </select>

              <button type="button" class="btn btn-primary" v-on:click="surveyResultAcceptance" data-dismiss="modal">Save</button>
              <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addSurveyResult" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add survey result</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
              <div class="row">
                <div class="col-md-12">
                  <div class="dropbox">
                    <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                      accept="image/*" class="input-file">
                      <p v-if="isInitial">
                        Drag your file(s) here to begin<br> or click to browse
                      </p>
                      <p v-if="isSaving">
                        Uploading {{ fileCount }} files...
                        <br> {{ fileNames }}
                      </p>
                  </div>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" v-model="surveyResult.title"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveSurveyResult" data-dismiss="modal">
              Add survey result
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { select } from "../../mixins/select";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  mixins: [select],
  data(router) {
    return {
      userFleet: null,
      addSiteRole: false,
      addSiteFleet: false,
      addSiteTool: false,
      addSiteMachinery: false,
      siteRole:{
        site: window.localStorage.getItem("selectsite"),
        user: '', 
        role: ''
      },
      siteFleet:{
        site: window.localStorage.getItem("selectsite"),
        fleet: ''
      },
      siteTool:{
        site: window.localStorage.getItem("selectsite"),
        tool: ''
      },
      siteMachinery:{
        site: window.localStorage.getItem("selectsite"),
        machine: ''
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
      uploadFieldName: 'photos'.mapState,
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
    }),

    getUsers () {
      return this.$store.getters['users/getUsers'];
    },
    getBoqTotal () {
      return this.$store.getters['sites/getBoqTotal'];
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
    },
  },
  mounted() {
    this.$store.commit('users/CHANGE_LIST_TYPE', 'all');
    this.$store.dispatch("sites/loadSite", window.localStorage.getItem("selectsite"));
    this.$store.dispatch("sites/getSurveyImages", window.localStorage.getItem("selectsite"));
    this.$store.dispatch("sites/loadBoqs", window.localStorage.getItem("selectsite"));

    //this is for the upload
    this.reset();
  },
  methods: {
    loadSiteFleets(){
      this.$store.dispatch("sites/loadSiteFleets", window.localStorage.getItem("selectsite"));
    },
    loadSiteTools(){
      this.$store.dispatch("sites/loadSiteTools", window.localStorage.getItem("selectsite"));
    },
    loadSiteMachinery(){
      this.$store.dispatch("sites/loadSiteMachinery", window.localStorage.getItem("selectsite"));
    },
    saveSurveyResult() {
      const { surveyResult } = this;

      this.formData.append('title', surveyResult.title)
      this.formData.append('site', window.localStorage.getItem("selectsite"))
      this.formData.append('surveyor', (JSON.parse(window.localStorage.getItem('user'))).user_id)
      this.formData.append('acceptStatus', 'false')

      this.$store.dispatch("sites/addSurveyResult", this.formData);
    },
    deleteSurveyResult(surveyResult){
      if (confirm(`are you sure you want to delete ${surveyResult}?`)) {
          this.$store.dispatch("sites/deleteSurveyResult", surveyResult);
      }
    },
    deleteSiteRole(siteRole){
      if (confirm(`are you sure you want to delete ${siteRole.user.first_name}?`)) {
          this.$store.dispatch("sites/deleteSiteRole", siteRole);
      }
    },
    deleteSiteFleet(siteFleet){
      if (confirm(`are you sure you want to delete ${siteFleet.fleet.name}?`)) {
          this.$store.dispatch("sites/deleteSiteFleet", siteFleet);
      }
    },
    deleteSiteTool(siteTool){
      if (confirm(`are you sure you want to delete ${siteTool.tool.name}?`)) {
          this.$store.dispatch("sites/deleteSiteTool", siteTool);
      }
    },
    deleteSiteMachinery(siteMachine){
      if (confirm(`are you sure you want to delete ${siteMachine.machine.name}?`)) {
          this.$store.dispatch("sites/deleteSiteMachinery", siteMachine);
      }
    },
    resetSurveyResult(){
      this.surveyResult = {
        file: ""
      }
    },
    saveSiteRole(role){
      this.addSiteRole = false;
      const { siteRole } = this;
      siteRole.user = siteRole.user.id
      if(this.userFleet != null){
        this.$store.dispatch("sites/addUserSiteFleet", {user: siteRole.user, site_fleet: this.userFleet});
      }
      this.$store.dispatch("sites/addSiteRole", siteRole);
      this.userFleet = null
    },
    saveSiteFleet(role){
      this.addSiteFleet = false;
      const { siteFleet } = this;
      this.$store.dispatch("sites/addSiteFleet", siteFleet);
    },
    saveSiteTool(tool){
      this.addSiteTool = false;
      const { siteTool } = this;
      this.$store.dispatch("sites/addSiteTool", siteTool);
    },
    saveSiteMachinery(){
      this.addSiteMachinery = false;
      const { siteMachinery } = this;
      this.$store.dispatch("sites/addSiteMachinery", siteMachinery);
    },
    getSurveyComments(survey_result){
      //show loading
      this.selectedSurveyResult = survey_result
      this.$store.commit("sites/SET_SURVEY_COMMENTS", []);
      this.surveyResultComment.survey_result = survey_result.id
      this.$store.dispatch("sites/getSurveyComments", survey_result.id);
    },
    saveSurveyComment(){
      const { surveyResultComment } = this;
      this.$store.dispatch("sites/addSurveyComment", surveyResultComment);
      //this.surveyResultComment.comment = "";
    },
    surveyResultAcceptance(){
      const { selectedSurveyResult } = this;
      this.$store.dispatch("sites/updateSurveyResult", selectedSurveyResult);
    },

    //this is for the upload
    reset() {
      // reset form to initial state
      this.formData = new FormData(),
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
      this.fileNames = [];
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          this.formData.append('file_url', fileList[x], fileList[x].name);
          this.fileNames.push(fileList[x].name)
        });

      
      this.currentStatus = STATUS_SAVING;
    }
  }

};
</script>

<style lang="scss">
@import "../../../../static/css/variables";

.summary-card{
  color: #fff;
  position: relative;
  height: 120px;
  position: relative;

  div{
    display: inline-table;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
  }
  span{
    position: absolute;
    top: 10px;
    right: 20px;
    i{
      font-size: 18px
    }
  }

  h3{
    font-family: $font;
    font-size: 30px;
    font-weight: 400;
    line-height: 22px;
    padding: 0 0 5px;
    padding-right: 5px;
    margin: 0;
  }

  p{
    color: #fff;
    font-family: $font;
    font-size: 12px;
    font-weight: 400;
    line-height: 13px;
    margin-bottom: 0;
  }

  p:last-child{
    padding-bottom: 15px;
  }
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
.comp-title .ac_select{
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  background: no-repeat;
  font-size: 14px;
  padding: 0;
}
.ac_btn:hover{
  background: #256ae1;
}
.comp-title p {
  max-width: 250px;
}
.comp-title p small{
  margin-right: 15px;
}
#listTabs.nav > li:hover a {
  border-bottom: 3px solid #256ae1;
}
#listTabs.nav > li > a {
  color: #333;
}
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

#stages {
  width: 100%;
  margin: auto;
  height: 30px;
  margin-top: 50px;
}
#stages ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
#stages li {
  float: left;
  width: 20%;
  text-align: center;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
}
#stages ul > li:first-child::before {
  text-align: left;
  width: 50%;
  margin-left: 50%;
}
#stages ul > li:last-child::before {
  text-align: right;
  width: 50%;
  margin-right: 50%;
}
#stages ul > li:before {
  content: "\B7";
  font-size: 80px;
  line-height: 1px;
  display: block;
  color: #000;
  border-bottom: 1px solid #ededed;
  margin: 0 0 10px 0;
  font-family: serif;
}

#stages ul > li.active:before {
  color: #256ae1;
  text-shadow: 0px 0px 10px #256ae1;
}

#stages ul > li.active {
  font-weight: 700;
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
._projects, .site-images {
  margin-top: 28px;
}
.project-roles-box {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  padding: 27px 38px;
}

.nav-tabs{
  padding: 5px 0
}

.project-roles-box .nav-tabs > li > a{
  padding: 5px 15px;
}

.project-roles-box .nav-justified {
  border-bottom: 2px solid #e0e0e0;
}

.project-roles-box .nav-tabs > li a.active {
  border-bottom: 3px solid #256ae1;
}
.nav-pills > li.active > a,
.nav-pills > li.active > a:focus,
.nav-pills > li.active > a:hover {
  color: #000;
  background-color: #fff;
  border: none;
}
.tab-pane .comp-title .fleet_search input {
  border: 2px solid #ccc;
  color: #666;
  padding: 7px 15px 7px 35px;
  border-radius: 20px;
}
.project-roles-box .tab-pane .comp-title {
  padding-top: 15px;
}
.project-roles-box .table {
  margin-top: 15px;
}
.project-roles-box .table tbody tr {
  background-color: #f9f9f9;
  border-top: none;
  border-bottom: 1.5px solid;
  border-color: #ececec;
}
.site-images h3{
  font-size: 16px;
  font-weight: bold;
}
.site-images .project-roles-box > .row:first-child{
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
}
.empty-upload-btn button{
  background-color: #256ae1;
  color: white;
  padding: 10px 30px;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  border-radius: 20px;
  border: none;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  display: block;
  margin-top: 70px;
  margin-bottom: 50px;
}

.site-images .table tbody tr td:last-child{
  text-align: right;
}
.site-images .table tbody tr td:last-child a{
  margin-right: 15px;
}
.site-images .table tbody tr td:last-child a:hover{
  color: #fff;
  cursor: pointer;
}
.custom-btn.btn-light{
  background-color: #142235;
}
.modal-lg{
  width: 50%
}

.modal-footer select{
  width: 150px;
  float: left;
}


/* comments box */
.commentBox {
    padding:10px;
    border-top:1px dotted #bbb;
}
.commentBox .form-inline{
  padding: 0
}
.commentBox .form-inline input,.commentBox .form-inline button{
  width: 100%;
}
.commentBox .form-group:first-child, .actionBox .form-group:first-child {
    width:80%;
}
.commentBox .form-group:nth-child(2), .actionBox .form-group:nth-child(2) {
    width:18%;
}
.actionBox .form-group * {
    width:100%;
}
.commentList {
    padding:0;
    list-style:none;
    max-height:200px;
    overflow:auto;
}
.commentList li {
    margin:0;
    margin-top:10px;
}
.commentList li > div {
    display:table-cell;
}
.commenterImage {
    width:30px;
    margin-right:5px;
    height:100%;
    float:left;
}
.commenterImage img {
    width:100%;
    border-radius:50%;
}
.commentText p {
    margin:0;
}
.sub-text {
    color:#aaa;
    font-family:verdana;
    font-size:11px;
}
.actionBox {
    border-top:1px dotted #bbb;
    padding:10px;
}

</style>


