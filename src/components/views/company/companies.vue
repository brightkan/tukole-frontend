<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-10">
        <h3>Companies</h3>
      </div>

      <div v-if="$store.state.user_type != 'client'" class="comp-title col-md-2">
        <button class="mdc-button mdc-button--raised" v-on:click="showForm();resetCompany()">
          Add Company
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-4 site" v-for="company in companies" :key="company.id">
        <a v-on:click="selectCompany(company)">
            <div class="card">
              <div class="row">
                <h3 class="col-md-8">{{ company.name }}</h3>
                <p class="col-md-12 text-sm" style="margin: 0">Created on: {{ company.created | moment('MMM Do YYYY')}}</p>
              </div>
            </div>
        </a>        
      </div>
    </div>
    <div v-if="companies.length <= 0" class="row empty-site-list">
      <h3 class="text-center">NO COMPANIES YET</h3>
    </div>

    <!-- Modal -->
    <modal name="modal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} Company</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveCompany"> 
            <div class="modal-body">
              <div>
                <mdc-textfield v-model="company.name" label="Company Name" required outline/>

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >{{ editMode ? 'Edit' : 'New'}} Company</button>
            </div>
          </form>
        </div>
      </div>
    </modal>

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
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveCompany(){
        const { company } = this
        this.hideForm()
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

<style lang="scss" scoped>
.content{
  .row{
    padding: 15px;
  }
  .card {
    margin-bottom: 15px; 
    .row{
      margin: 0;
    }
  }
  
}
.mdc-button.mdc-button--raised{
  background-color: #256ae1;
}
.site p{
  font-weight: 400;
  color: #ababab;
}
</style>