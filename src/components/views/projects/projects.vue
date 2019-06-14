<template>

  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="container search-wrapper" v-if="this.$route.meta.type != 'ProjectOverview'">
      <div class="row search">
        <div class="input">
          <mdc-select label="Sort By">
            <option>Newest</option>
            <option>Oldest</option>
            <option>Oldest</option>
          </mdc-select>
          <form method="get" action="/search">
            <input name="q" type="text" size="40" placeholder="Search...">
          </form>
        </div>
        <button v-if="$store.state.user_type != 'client'" class="mdc-button mdc-button--raised" v-on:click="showSiteForm();resetSite()">Add Site</button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row" v-if="this.$route.meta.type != 'ProjectOverview'">
      <div class="col-md-4 site" v-for="site in getSites" :key="site.id">
        <a v-on:click="selectSite(site)">
          <div class="project-card" v-bind:class="site.id == selectedSite ? 'active' : ''">
            <div class="site-bg" v-bind:style="{ backgroundImage: 'url('+site.site_image+')'}">
              <h3>
                {{ site.site_name }}
                <span v-if="site.site_ready_for_connection && !site.site_connected"></span>
              </h3>
            </div>
            <!-- <div class="row stats">
              <div class="col-md-6">
                <span class="icon" style="background: #b7f5b5"><i class="fa fa-truck"></i></span>
                <div>
                  <p>{{ site.number_of_site_fleet == null ? 0 : site.number_of_site_fleet }}</p>
                  <span>Vehicles</span>
                </div>
              </div>
              <div class="col-md-6">
                <span class="icon" style="background: #79aef5"><i class="fa fa-users"></i></span>
                <div>
                  <p>{{ site.number_of_members_on_site == null ? 0 : site.number_of_members_on_site }}</p>
                  <span>Workers</span>
                </div>
              </div>
            </div> -->
            <div class="row">
              <div class="col-md-12"><p>Progress</p></div>
              <div class="col-md-12">
                <div class="progress">
                  <div class="progress-bar" role="progressbar" aria-valuenow="40"
                  aria-valuemin="0" aria-valuemax="100" v-bind:style="{width: site.current_stage + '%'}">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>        
      </div>
    </div>
    <div v-if="sites.length <= 0 && this.$route.meta.type != 'ProjectOverview'" class="row empty-site-list">
      <h3 class="text-center">NO SITES YET</h3>
    </div>

    <!-- Modal -->

    <!-- Modal -->
    <modal name="siteForm" class="custom-modal" height="auto" :scrollable="true" v-if="this.$route.meta.type != 'ProjectOverview'">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">Add Site</h5>
          <button type="button" class="close" v-on:click="hideSiteForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form>
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="site.site_name" label="Site Name" outline/>
                    <mdc-textfield v-model="site.expected_end_date" label="Expected end date" type="date" outline/>
                    <mdc-textfield v-model="site.location_lat" label="Location Latitude" outline/>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="site.start_date" label="Start date" type="date" outline/>
                    <mdc-select v-model="site.company" label="Company" outlined>
                      <option v-for="company in companies" v-bind:value="company.id" :key="company.id">
                        {{ company.name }}
                      </option>
                    </mdc-select>
                    <mdc-textfield v-model="site.location_long" label="Location Longitude" outline/>
                  </div>
                </div>
                <mdc-select v-model="site.site_type" label="Site Type" outlined>
                    <option v-bind:value="'single'" :key="'1'">
                      Single
                    </option>
                    <option v-bind:value="'dual'" :key="'2'">
                      Dual
                    </option>
                    <option v-bind:value="'shared'" :key="'3'">
                      Shared
                    </option>
                  </mdc-select>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" 
                class="mdc-button mdc-button--raised"
                v-on:click="saveSite()"
              >Add Site</button>
            </div>
          </form>
        </div>
      </div>
    </modal>

    <div class="row" v-if="this.$route.meta.type == 'ProjectOverview'">
      <div class="col-md-12 project-heading" v-bind:style="{ backgroundImage: 'url('+activeSite.site_image+')'}"> 
        <h3>{{ activeSite.site_name }} <small class="float-right">{{ activeSite.current_stage }}% completed</small></h3>
      </div>
    </div>

    <div class="row" v-if="this.$route.meta.type == 'ProjectOverview'">
      <div class="col-md-12 toolbar">
        <ul>
          <router-link tag="li" to="/dash/project/projects/overview">
            <a href="#"> 
              Overview
            </a>
          </router-link>  
          <router-link tag="li" to="/dash/project/projects/boq" v-if="$store.state.user_type != 'client'">
            <a href="#">
              BOQ
            </a>
          </router-link>  
          <router-link tag="li" to="/dash/project/projects/pip" v-if="$store.state.user_type != 'client'">
            <a href="#">
              PIP
            </a>
          </router-link> 
          <router-link tag="li" to="/dash/project/projects/costs" v-if="$store.state.user_type != 'client'">
            <a href="#">
              Site Costs
            </a>
          </router-link>  
          <router-link tag="li" to="/dash/project/projects/documentation">
            <a href="#">
              Documents
            </a>
          </router-link> 
          <router-link tag="li" to="/dash/project/projects/reports" v-if="$store.state.user_type != 'client'">
            <a href="#">
              Reports
            </a>
          </router-link>  
          <router-link tag="li" to="/dash/project/projects/gallery">
            <a href="#">
              Gallery
            </a>
          </router-link> 
          <router-link tag="li" to="/dash/project/projects/quality" v-if="$store.state.user_type != 'client'">
            <a href="#">
              Quality Checks
            </a>
          </router-link> 
          <router-link tag="li" to="/dash/project/projects/challenges">
            <a href="#">
              Challenges / Incidents
            </a>
          </router-link> 
          <router-link tag="li" to="/dash/project/projects/settings">
            <a href="#">
              Settings
            </a>
          </router-link> 
        </ul>
      </div>
    </div>

    <router-view></router-view>
  </section>
</template>

<script>
import { select } from "../../mixins/select";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import moment from 'moment'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  props: {
      type: {
        type: Date
      }
  },
  mixins: [select],
  data(router) {
    return {
      activeSite: "",
      selectedSite: window.localStorage.getItem("selectsite"),
      editMode: false,
      site: {
        site_name: "",
        location_lat: "",
        location_long: "",
        start_date: moment().format('YYYY-MM-DD'),
        expected_end_date: moment().format('YYYY-MM-DD'),
        archivedStatus: false,
        clientId: (JSON.parse(window.localStorage.getItem('user'))).user_id,
        ackStatus: true,
        current_stage: 0,
        company: "",
        workspace: window.localStorage.getItem("workspace"),
        site_type: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("sites/loadSites", window.localStorage.getItem("workspace"));
    this.$store.dispatch("companies/loadCompanies", window.localStorage.getItem("workspace"));
  },
  computed: {
    ...mapState('sites',["sites"]),
    ...mapState('companies',["companies"]),
    ...mapGetters('sites', ['getSites']),
  },
  methods: {
    showSiteForm() {
      this.$modal.show("siteForm");
    },
    hideSiteForm() {
      this.$modal.hide("siteForm");
    },
    reformateDate(date) {
      return moment(date).format('MMM Do YYYY');
    },
    saveSite() {
      const { site } = this;
      this.$modal.hide("siteForm");
      if(this.editMode){
        this.$store.dispatch("sites/updateSite", site);
      }else{
        this.$store.dispatch("sites/addSite", site);
      }
    },
    editSite(site){
      this.editMode = true;
      this.site = Object.assign({}, site);
      this.$modal.hide("siteForm");
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
        start_date: moment().format('YYYY-MM-DD'),
        expected_end_date: moment().format('YYYY-MM-DD'),
        archivedStatus: false,
        clientId: (JSON.parse(window.localStorage.getItem('user'))).user_id,
        ackStatus: true,
        current_stage: 0,
        company: '',
        workspace: window.localStorage.getItem("workspace"),
        site_type: ""
      }
    },
    selectSite(site){
      this.activeSite = site
      window.localStorage.setItem("selectsite", site.id)
      this.$router.push('projects/overview')
    }
  }
};
</script>

<style lang="scss">
@import "../../../../static/css/variables";

.project-heading{
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0;
  
  h3{
    color: white;
    background: #00000080;
    padding: 90px 40px 30px;
    font-family: $font;
    font-size: 25px;
    font-weight: 400;
    margin: 0;
  }
}

.toolbar{
  position: relative;
  text-align: center;
  border-bottom: 1px solid #d0d0d0;

  ul{
    list-style: none;
    padding: 0;
    display: inline-flex;
    margin-bottom: 0;

    li{
      float: left;
      font-family: $font;
      font-size: 16px;
      font-weight: 400;
      padding: 10px 15px;

      a{
        color: #a0a0a0;
      }
    }

    li.active{
      /* background-color: #f0f0f0; */
      background-color: #dbdbdb;
      border-radius: 10px 10px 0 0;

      a{
        color: #28354a;
      }
    }
  }
}


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

.project-card{
  padding: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
  border-radius: 5px;
}
.project-card .site-bg{
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px 5px 0 0;
}
.project-card .site-bg h3{
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
  font-size: 17px;
  font-weight: 700;
  padding: 60px 22px 24px 22px;
  margin: 0;
  background: #0000004d;
  line-height: 1.18;
  border-radius: 5px 5px 0 0;
}

.project-card h3 span{
  width: 10px;
  height: 10px;
  background-color: #b7f5b5;
  display: inline-flex;
  border-radius: 50%;
  float: right;
  margin-top: 5px;
}
.project-card .row:last-child{
  margin: 0;
  padding: 0 15px 33px 15px
}

p{
  font-size: 16px;
  font-weight: 600;
  color: #28354a;
  margin-bottom: 5px
}

.project-card .stats{
  margin: 10px 0;
}
.project-card .stats span.icon{
  padding: 4px 7px;
  display: inline-block;
  font-size: 26px;
  border-radius: 50%;
  color: white;
  float: left;
  margin: 0 10px;
}
.project-card .stats div div{
  display: inline-block;
}
.project-card .stats p{
  color: #28354a;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0;
  line-height: 1em;
}
.project-card .stats div div span{
  color: #28354a;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0;
}

.project-card .progress{
  background-color: rgba(0, 0, 0, 0.16);
  border-radius: 5px;
  height: 6px;
}

.project-card .progress .progress-bar{
  background-color: #28354a;
}




.project-card .status {
  margin-left: -15px;
  margin-right: -15px;
}
.project-card .status div {
  margin-bottom: 15px;
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
</style>


