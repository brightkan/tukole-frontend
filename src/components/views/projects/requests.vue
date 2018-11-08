<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-3">
        <h3>Survey requests</h3>
      </div>

      <div class="comp-title col-md-3">
        <label id="img_category_label" class="field" for="img_category" data-value="">
          <span>Status</span>
          <div id="img_category" class="psuedo_select" name="img_category">
            <span class="selected"></span>
            <ul id="img_category_options" class="options">
              <li class="option" data-value="opt_1" v-on:click="filter('all')">All</li>
              <li class="option" data-value="opt_2" v-on:click="filter('accepted')">Accepted</li>
              <li class="option" data-value="opt_3" v-on:click="filter('pending')">Pending</li>
            </ul>
          </div>
        </label>
      </div>

      <div class="col-md-4">
      </div>

      <div class="comp-title col-md-2">
        <button v-if="$store.state.user_type == 'client' || $store.state.user_type == 'admin'" 
          type="button" data-toggle="modal" data-target="#addRequest" v-on:click="resetRequest()">
          Add Request
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
              <td>Request</td>
              <td>Creation Date</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in getRequests" :key="request.id">
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>{{ request.site_name }}</td>
              <td>12. 08. 2018</td>
              <td class="text-right">
                <button v-if="!request.ackStatus" v-on:click="ackSite(site)">Acknowledge site</button>
                <i v-if="!request.ackStatus" class="fa fa-times" v-on:click="deleteRequest(request)"></i>
              </td>
            </tr>
            <tr v-if="getRequests.length <= 0">
              <td colspan="7" class="text-center">No Requests Yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="addRequest" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Request</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <form>
              <div class="form-group">
                <label>Request Name</label>
                <input type="text" class="form-control" v-model="site.site_name"/>
              </div>
              <div class="form-group">
                <label>Location Latitude</label>
                <input type="number" class="form-control" v-model="site.location_lat"/>
              </div>
              <div class="form-group">
                <label>Location longitude</label>
                <input type="number" class="form-control" v-model="site.location_long"/>
              </div>
              <div class="form-group">
                <label>Select Surveyor</label>
                <select class="form-control">
                  <option>Select</option>  
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveSite" data-dismiss="modal">
              Add Request
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

export default {
  mixins: [select],
  data(router) {
    return {
      selectedSite: window.localStorage.getItem("selectsite"),
      editMode: false,
      site: {
        site_name: "",
        location_lat: "",
        location_long: "",
        archivedStatus: false,
        clientId: (JSON.parse(window.localStorage.getItem('user'))).user_id,
        ackStatus: false,
        workspace: window.localStorage.getItem("workspace"),
      }
    };
  },
  mounted() {
    this.$store.dispatch("sites/loadSites");
  },
  computed: {
    ...mapState('sites',["sites"]),
    ...mapGetters('sites', ['getRequests'])
  },
  methods: {
    saveSite() {
      const { site } = this;
      if(this.editMode){
        this.$store.dispatch("sites/updateSite", site);
      }else{
        this.$store.dispatch("sites/addSite", site);
      }
    },
    ackSite(site){
      this.editMode = true;
      this.site = Object.assign({}, site);
      this.site.ackStatus = true;
      this.saveSite();
    },
    deleteSite(site){
      if (confirm(`are you sure you want to delete ${site.site_name}?`)) {
          this.$store.dispatch("sites/deleteSite", site);
      }
    },
    resetSite(){
      this.editMode = false;
      this.site = {
        site_name: "",
        location_lat: "",
        location_long: "",
        archivedStatus: false,
        clientId: (JSON.parse(window.localStorage.getItem('user'))).user_id,
        ackStatus: false,
        workspace: window.localStorage.getItem("workspace"),
      }
    },
    filter(type){
      this.$store.commit('sites/CHANGE_REQUEST_LIST', type)
    },
  }
};
</script>

<style>
.empty-site-list{
  color: #c3c3c3;
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
}
.site{
  cursor: pointer;
}
.site .project-card.active{
  border: 1px solid #256ae1;
}
.comp-title button {
  width: 100%;
}
.comp-title button,
.custom-btn {
  background-color: #256ae1;
  color: white;
  padding: 10px 30px;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  border-radius: 20px;
  border: none;
}

.project-card {
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
}
.project-card h3 {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
  padding: 0 0 30px;
  margin: 0;
}
.project-card .status {
  margin-left: -15px;
  margin-right: -15px;
}
.project-card .status div {
  margin-bottom: 15px;
}
.project-card .status span {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 10px;
}
.project-card .status img {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14);
}
.project-card ._timeline {
  margin-left: -15px;
  margin-right: -15px;
}
.project-card ._timeline span {
  color: #828282;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 7px;
}
.project-card ._timeline p {
  color: #000;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  margin-bottom: 0;
  margin-top: 5px;
}
.project-card ._timeline div:nth-child(1),
.project-card .status div:nth-child(1) {
  padding-left: 15px;
  padding-right: 5px;
}
.project-card ._timeline div:nth-child(2),
 .project-card .status div:nth-child(2){
  padding-left: 5px;
  padding-right: 5px;
}
.project-card ._timeline div:nth-child(3),
.project-card .status div:nth-child(3) {
  padding-left: 5px;
  padding-right: 15px;
}

#container {
  margin: 20px;
  width: 200px;
  height: 200px;
}

.modal-dialog {
  width: 500px;
}
.modal-title {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  display: inline-block;
}
.modal-header {
  border-bottom: none;
  padding: 30px 40px;
}
.modal-body > .row {
  padding: 0 25px;
}
.upload-img-text {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
}
.upload-image {
  background-image: url("http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg");
  background-position: center;
  background-size: cover;
  height: 113px;
  width: 179px;
}
.modal-body form {
  padding: 36px 25px;
  padding-bottom: 0;
}
.modal-body form .form-control {
  background-color: #f0f0f0;
  border: none;
}
.modal-body form label {
  color: #828282;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
}
.modal-footer button:nth-child(1) {
  box-sizing: border-box;
  width: 115px;
  border: 1px solid #256ae1;
  background-color: #fff;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  padding: 10px 40px;
}
.modal-footer button:nth-child(2) {
  box-sizing: border-box;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  padding: 10px 40px;
  background-color: #256ae1;
}
</style>


