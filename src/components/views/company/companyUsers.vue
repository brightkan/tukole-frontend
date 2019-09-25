<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-10">
        <h3>{{ getCompany() }}</h3>
      </div>

      <div class="comp-title col-md-2">
        <button v-if="$store.state.user_role == 'project_manager'" 
          class="mdc-button mdc-button--raised" v-on:click="showForm();resetUser()">
          Add Users
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-users"></i> Users</h3>
          <table>
            <thead>
              <tr v-if="getCompanyUsers(this.$route.params.id).length > 0">
                <td>Name</td>
                <td>Contact</td>
                <td>Email</td>
                <td>Creation Date</td>
                <td v-if="$store.state.user_role == 'project_manager'"></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in getCompanyUsers(this.$route.params.id)" :key="user.id">
                <td>{{ user.first_name }} {{ user.last_name}}</td>
                <td>{{ user.phone_number }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.created | moment('MMM Do YYYY')}}</td>
                <td v-if="$store.state.user_role == 'project_manager'" class="text-right">
                  <i class="fa fa-edit" v-on:click="editUser(user)"></i> 
                  <i class="fa fa-times" v-on:click="deleteUser(user)"></i>
                </td>
              </tr>
              <tr v-if="getCompanyUsers(this.$route.params.id).length <= 0">
                <td colspan="7" class="text-center">No Users Yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <modal name="modal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} User</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveUser">
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-md-6">
                    <mdc-textfield v-model="user.first_name" label="First Name" required outline/>
                    <mdc-textfield v-model="user.email" label="Email" type="email" required outline/>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="user.last_name" label="Last Name" required outline/>
                    <mdc-select v-model="user.contract_type" label="Contract type" required outlined>
                      <option v-bind:value="'permanent'">Permament</option>
                      <option v-bind:value="'temporary'">Temporary</option>
                    </mdc-select>
                  </div>
                </div>

                <mdc-textfield
                  v-model="user.phone_number"
                  label="Phone Number"
                  required
                  helptext="Enter correct phone number format"
                  :valid="isValidTel"
                  helptext-validation
                  @keyup="checkTelValidity"
                  outline
                />

                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised">{{ editMode ? 'Edit' : 'New'}} User</button>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  data(router) {
    return {
      editMode: false,
      isValidTel: true,
      user: {
        first_name: "",
        last_name: "",
        email: "",
        type: "client",
        contract_type: "",
        phone_number: "",
        role: "",
        company: this.$route.params.id,
        workspace: window.localStorage.getItem("workspace")
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("users/loadUsers", window.localStorage.getItem("workspace"));
  },
  computed: {
    ...mapGetters("users", [
        "getCompanyUsers"
    ])
  },
  methods: {
    getCompany() {
      let company = this.$store.getters['companies/getCompany'](this.$route.params.id);
      return company ? company.name : ""
    },
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    checkTelValidity(evt) {
      var phoneno = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
      var phoneNumber = evt.srcElement.value;

      if (phoneNumber.match(phoneno)) {
        this.isValidTel = true;
      } else {
        this.isValidTel = false;
      }
    },
    saveUser() {
      const { user } = this;
      this.$modal.hide("modal");

      if (this.isValidTel) {
        if (this.editMode) {
          this.$store.dispatch("users/updateUser", user);
        } else {
          this.$store.dispatch("users/inviteUser", user);
        }
      }
    },
    editUser(user){
      this.editMode = true;
      this.$modal.show("modal");
      this.user = Object.assign({}, user);
    },
    deleteUser(user){
      if (confirm(`are you sure you want to delete ${user.first_name}?`)) {
          this.$store.dispatch("users/deleteUser", user);
      }
    },
    resetUser(){
      this.editMode = false;
      this.user = {
        first_name: '',
        last_name: '',
        email: '',
        type: 'client',
        contract_type: '',
        phone_number: '',
        password: '1234',
        company: this.$route.params.id,
        role: "",
        workspace: window.localStorage.getItem("workspace")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content{
  > .row{
    padding: 15px;
  }
}
.mdc-button.mdc-button--raised{
  background-color: #256ae1;
}
</style>