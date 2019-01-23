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
            <div class="row">
                <div class="col-md-6">
                    <p class="switch-label">Site Accepted:</p>
                </div>
                <div class="material-switch col-md-6">
                    <input id="someSwitchOptionPrimary" name="someSwitchOption001" type="checkbox"
                        v-model="site.site_accepted">
                    <label for="someSwitchOptionPrimary" class="label-primary"></label>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <p class="switch-label">Survey Result User Access:</p>
                </div>
                <div class="material-switch col-md-6">
                    <input id="userAccessibility" name="userAccess" type="checkbox" 
                        v-model="site.can_client_view_survey_reports">
                    <label for="userAccessibility" class="label-primary"></label>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <p class="switch-label">Survey Date:</p>
                </div>
                <div class="form-group col-md-5" style="padding-right: 0px">
                    <p v-if="!editSite">{{ site.survey_date | moment("MMM Do YYYY") }}</p>
                    <input v-if="editSite" type="date" class="form-control" v-model="site.survey_date" style="width: 100%">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <p class="switch-label">Percentage completed:</p>
                </div>
                <div class="form-group col-md-5" style="padding-right: 0px">
                    <p v-if="!editSite">{{ site.current_stage }}% </p>
                    <input v-if="editSite" type="text" pattern= "[0-9]" class="form-control" v-model="site.current_stage" style="width: 100%">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 container">
                    <button v-if="!editSite"
                        style="width: 100%"
                        type="button"
                        class="btn btn-default ac_btn"
                        v-on:click="editSite = true"
                        >Edit
                    </button>
                    <button v-if="editSite"
                        style="width: 100%"
                        type="button"
                        class="btn btn-primary ac_btn"
                        v-on:click="updateSite()"
                        >Save
                    </button>  
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

export default {
  mixins: [select],
  data(router) {
    return {
        site: {
            survey_date: '',
            current_stage: '',
            can_client_view_survey_reports: '',
            site_accepted: ''
        },
        editSite: false
    };
  },
  created() {},
  computed: {

  },
  mounted() {
      this.initialise(window.localStorage.getItem("selectsite"))
  },
  methods: {
    updateSite(){
        const { site } = this;
        this.$store.dispatch("sites/updateSite", site);
        this.editSite = false
    },
    initialise(id){
        let site = this.$store.getters['sites/getSite'](id);
        this.site = site[0]
    }
  }
};
</script>

<style>
.switch-label{
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
    content: '';
    height: 16px;
    margin-top: -8px;
    position:absolute;
    opacity: 0.3;
    transition: all 0.4s ease-in-out;
    width: 40px;
}
.material-switch > label::after {
    background: rgb(255, 255, 255);
    border-radius: 16px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    content: '';
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


