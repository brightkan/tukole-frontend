<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-10">
        <h3>{{ getCompany(this.$route.params.id).name }}</h3>
      </div>

      <div class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addUser" v-on:click="resetUser()">
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
              <tr>
                <td>Name</td>
                <td>Contact</td>
                <td>Email</td>
                <td>Creation Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in getCompanyUsers(this.$route.params.id)" :key="user.id">
                <td>{{ user.first_name }} {{ user.last_name}}</td>
                <td>{{ user.phone_number }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.created | moment('MMM Do YYYY')}}</td>
                <td class="text-right">
                  <i class="fa fa-edit" v-on:click="editUser(user)" data-toggle="modal" data-target="#addUser"></i> 
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
    <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" v-model="user.first_name"/>
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" v-model="user.last_name"/>
              </div>
              <div class="form-group" v-if="!editMode">
                <label>Email</label>
                <input type="text" class="form-control" v-model="user.email"/>
              </div>
              <div class="form-group">
                <label>Contract type</label>
                <select class="form-control" v-model="user.contract_type">
                  <option v-bind:value="'permanent'">Permament</option>
                  <option v-bind:value="'temporary'">Temporary</option>
                </select>
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="text" class="form-control" v-model="user.phone_number"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveUser" data-dismiss="modal">
              {{ editMode ? 'Edit' : 'New'}} User</button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  data(router) {
    return {
      editMode: false,
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
    ]),
    ...mapGetters("companies", [
        "getCompany"
    ])
  },
  methods: {
    saveUser() {
      const { user } = this;
      if(this.editMode){
        this.$store.dispatch("users/updateUser", user);
      }else{
        this.$store.dispatch("users/inviteUser", user);
      }
    },
    editUser(user){
      this.editMode = true;
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

<style>
</style>