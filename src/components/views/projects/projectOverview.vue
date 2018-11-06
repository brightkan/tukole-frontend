<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>{{ site.site_name }}</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-3">
        <div class="summary-card row">
          <h3 class="col-md-6">3000</h3>
          <p class="col-md-6">Total Number of vehicles</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row">
          <h3 class="col-md-6"><small>USD 3000</small></h3>
          <p class="col-md-6">Estimated Budget</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row">
          <h3 class="col-md-6 text-danger">20</h3>
          <p class="col-md-6">Employees on project</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row">
          <h3 class="col-md-6 text-danger"><small>76 hours</small></h3>
          <p class="col-md-6">Delays</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="timeline-box">
          <h3>Progress Timeline</h3>

          <div id="stages">
            <ul>
              <li>Stage 1</li>
              <li>Stage 2</li>
              <li class="active">Stage 3</li>
              <li>Stage 4</li>
              <li>Stage 5</li>
            </ul>
          </div>

          <h3 class="timeline-activites-label">Activities</h3>
          
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

    <div class="row _projects">
      <div class="col-md-12">
        <div class="project-roles-box">
            <ul id="listTabs" class="nav nav-pills nav-justified" role="tablist" data-tabs="tabs">
              <li class="active"><a href="#Commentary" data-toggle="tab">Team</a></li>
              <li><a href="#Videos" data-toggle="tab">Fleet</a></li>
              <li><a href="#Events" data-toggle="tab">Tool</a></li>
              <li><a href="#Machinery" data-toggle="tab">Machinery</a></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade in active" id="Commentary">
                <div class="row">
                  <div class="col-md-5"></div>

                  <div class="comp-title col-md-5">
                    <form method="get" action="/search" class="fleet_search">
                      <input name="q" type="text" size="40" placeholder="Search..." />
                    </form>
                  </div>

                  <div class="comp-title col-md-2">
                    <button type="button" data-toggle="modal" data-target="#addMachinery">
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span class="oval"></span>Bagonza Jerome</td>
                        <td>+256 705 123 567</td>
                        <td>Admin</td>
                        <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
                      </tr>
                      <tr>
                        <td><span class="oval"></span>Bagonza Jerome</td>
                        <td>+256 705 123 567</td>
                        <td>Admin</td>
                        <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
                      </tr>
                      <tr>
                        <td><span class="oval"></span>Bagonza Jerome</td>
                        <td>+256 705 123 567</td>
                        <td>Admin</td>
                        <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
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
                    <button type="button" data-toggle="modal" data-target="#addMachinery">
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
                      <td>Status</td>
                      <td>Creation Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span class="oval"></span>Catapiller Multrix</td>
                      <td>TUK-CAT-1002</td>
                      <td>Grader</td>
                      <td><span class="green">Available</span></td>
                      <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
                    </tr>
                    <tr>
                      <td><span class="oval"></span>Catapiller Multrix</td>
                      <td>TUK-CAT-1002</td>
                      <td>Grader</td>
                      <td><span class="green">Available</span></td>
                      <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
                    </tr>
                    <tr>
                      <td><span class="oval"></span>Catapiller Multrix</td>
                      <td>TUK-CAT-1002</td>
                      <td>Grader</td>
                      <td><span class="green">Available</span></td>
                      <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
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
                    <button type="button" data-toggle="modal" data-target="#addMachinery">
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
                      <td>Status</td>
                      <td>Creation Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span class="oval"></span>Catapiller Multrix</td>
                      <td>TUK-CAT-1002</td>
                      <td>Grader</td>
                      <td><span class="green">Available</span></td>
                      <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
                    </tr>
                    <tr>
                      <td><span class="oval"></span>Catapiller Multrix</td>
                      <td>TUK-CAT-1002</td>
                      <td>Grader</td>
                      <td><span class="green">Available</span></td>
                      <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
                    </tr>
                    <tr>
                      <td><span class="oval"></span>Catapiller Multrix</td>
                      <td>TUK-CAT-1002</td>
                      <td>Grader</td>
                      <td><span class="green">Available</span></td>
                      <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
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
                    <button type="button" data-toggle="modal" data-target="#addMachinery">
                      Add Machine
                    </button>
                  </div>
                </div>
                <table class="table">
                  <thead>
                    <tr>
                      <td>Machine</td>
                      <td>Serial Number</td>
                      <td>Type</td>
                      <td>Status</td>
                      <td>Creation Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span class="oval"></span>Catapiller Multrix</td>
                      <td>TUK-CAT-1002</td>
                      <td>Grader</td>
                      <td><span class="green">Available</span></td>
                      <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
                    </tr>
                    <tr>
                      <td><span class="oval"></span>Catapiller Multrix</td>
                      <td>TUK-CAT-1002</td>
                      <td>Grader</td>
                      <td><span class="green">Available</span></td>
                      <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
                    </tr>
                    <tr>
                      <td><span class="oval"></span>Catapiller Multrix</td>
                      <td>TUK-CAT-1002</td>
                      <td>Grader</td>
                      <td><span class="green">Available</span></td>
                      <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </div>

    <div class="row site-images">
      <div class="col-md-12">
        <div class="project-roles-box">
          <div class="row">
            <div class="col-md-9">
              <h3>Survey Results</h3>
            </div>

            <div class="comp-title col-md-3">
              <button type="button" data-toggle="modal" data-target="#addSurveyResult" 
              v-on:click="resetSurveyResult()"
              v-if="surveyResults.length > 0">
                Upload survey result
              </button>
            </div>
          </div>
          <div class="row" v-if="surveyResults.length == 0">
            <div class="col-md-12 empty-upload-btn">
              <button type="button" data-toggle="modal" data-target="#addSurveyResult" v-on:click="resetSurveyResult()">
                Upload survey result
              </button>
            </div>
          </div>

          <table class="table" v-if="surveyResults.length > 0">
            <thead>
              <tr>
                <td>File</td>
                <td>Status</td>
                <td>Creation Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a target="_blank" href="https://ppsnc.com/wp-content/uploads/2015/09/Land-Survey-picture-s.jpg" download>
                  Link to downloadable file
                  </a>
                </td>
                <td>Accepted</td>
                <td>12. 08. 2018</td>
                <td>
                  <a>comments</a> 
                  <button>Accept</button>
                </td>
              </tr>
            </tbody>
          </table>          
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
            <div class="row">
              <div class="col-md-6">
                <div class="upload-image"></div>
              </div>
              <div class="col-md-6 text-center">
                <p class="upload-img-text">Upload Thumbnail</p>
                <button class="custom-btn">Select Image</button>
              </div>
            </div>
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
export default {
  mixins: [select],
  data(router) {
    return {
      surveyResult: {
        file: ""
        // workspace: window.localStorage.getItem("workspace")
      }
    };
  },
  created() {},
  computed: {
    ...mapState("sites", ["site", "surveyResults"])
  },
  mounted() {
    this.$emit("customEventForValChange", this.$route.path);
    this.$store.dispatch(
      "sites/loadSite",
      window.localStorage.getItem("selectsite")
    );
  },
  methods: {
    saveSurveyResult() {
      const { surveyResult } = this;
      this.$store.dispatch("sites/addSurveyResult", surveyResult);
    },
    deleteSurveyResult(surveyResult){
      if (confirm(`are you sure you want to delete ${surveyResult}?`)) {
          this.$store.dispatch("sites/deleteSurveyResult", surveyResult);
      }
    },
    resetSurveyResult(){
      this.surveyResult = {
        file: ""
        //workspace: window.localStorage.getItem("workspace")
      }
    }
  }

};
</script>

<style>
#listTabs.nav > li:hover {
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

.project-roles-box .nav-justified > li {
  display: inline-table;
}

.project-roles-box .nav-justified {
  border-bottom: 2px solid #e0e0e0;
}

.project-roles-box .nav-justified > li.active {
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
  font-size: 24px;
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
.site-images .table a{
  color: #142235;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
}
.site-images .table tbody tr td:last-child a{
  margin-right: 15px;
  text-decoration: underline;
}
.site-images .table tbody tr td:last-child a:hover{
  text-decoration: none;
}

</style>


