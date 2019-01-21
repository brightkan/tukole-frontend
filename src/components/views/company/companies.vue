<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-10">
        <h3>Companies</h3>
      </div>

      <div v-if="$store.state.user_type != 'client'" class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addCompany" v-on:click="resetCompany()">
          Add Company
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-4 site" v-for="company in companies" :key="company.id">
        <a v-on:click="selectCompany(company)">
            <div class="project-card">
                <h3>{{ company.name }}</h3>
                <p class="text-sm" style="margin: 0">Created on: {{ company.created | moment('MMM Do YYYY')}}</p>
            </div>
        </a>        
      </div>
    </div>
    <div v-if="companies.length <= 0" class="row empty-site-list">
      <h3 class="text-center">NO COMPANIES YET</h3>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addCompany" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Company</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <form>
              <div class="form-group">
                <label>Company Name</label>
                <input type="text" class="form-control" v-model="company.name"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveCompany" data-dismiss="modal">
              Add Company
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
import moment from 'moment'

export default {
  mixins: [select],
  data(router) {
    return {
      editMode: false,
      company: {
          name: "",
          workspace: window.localStorage.getItem("workspace")
      }
    };
  },
  mounted() {
    this.$store.dispatch("companies/loadCompanies", window.localStorage.getItem("workspace"));
  },
  computed: {
    ...mapState('companies',["companies"])
  },
  methods: {
    saveCompany(){
        const { company } = this
        this.$store.dispatch("companies/addCompany", company);
    },
    reformateDate(date) {
      return moment(date).format('MMM Do YYYY');
    },
    selectCompany(company){
      this.$router.push('companyUsers/'+company.id)
    },
    resetCompany(){
      this.company = {
        name: "",
        workspace: window.localStorage.getItem("workspace")
      }
    }
  }
};
</script>

<style>
</style>