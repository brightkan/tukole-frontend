<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-10">
        <h3>Survey requests</h3>
      </div>

      <div class="comp-title col-md-2">
        <button v-if="$store.state.user_type == 'client'" 
          type="button" data-toggle="modal" data-target="#addRequest" v-on:click="resetRequest()">
          Add Request
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-sitemap"></i> Requests</h3>
          <table>
            <thead>
              <tr v-if="getRequests.length > 0">
                <td>Request</td>
                <td>Creation Date</td>
                <td>Acknowledgement Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in getRequests" :key="request.id">
                <td>{{ request.site_name }}</td>
                <td>{{ request.created | moment("MMM Do YYYY")}}</td>
                <td>{{ request.ackStatus ? 'Acknowledged' : 'Not Acknowledged' }}</td>
                <td class="text-right">
                  <button v-if="!request.ackStatus && $store.state.user_type != 'client'" v-on:click="ackSite(request)">Acknowledge site</button>
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
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
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
        company: window.localStorage.getItem('company'),
        workspace: window.localStorage.getItem("workspace"),
      }
    };
  },
  mounted() {
    this.$store.dispatch("sites/loadSites", window.localStorage.getItem("workspace"));
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
        company: window.localStorage.getItem('company'),
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

</style>


