<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      
    </div>
  </section>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Users</h3>
      </div>

      <div class="comp-title col-md-3">
        <label id="img_category_label" class="field" for="img_category" data-value="">
          <span>Sort By</span>
          <div id="img_category" class="psuedo_select" name="img_category">
            <span class="selected"></span>
            <ul id="img_category_options" class="options">
              <li class="option" data-value="opt_1" v-on:click="filter('all')">All</li>
              <li class="option" data-value="opt_2" v-on:click="filter('admin')">Admin</li>
              <li class="option" data-value="opt_3" v-on:click="filter('super_admin')">Super Admin</li>
              <li class="option" data-value="opt_4" v-on:click="filter('client')">Client</li>
              <li class="option" data-value="opt_5" v-on:click="filter('warehouse_manager')">Warehouse Manager</li>
              <li class="option" data-value="opt_6" v-on:click="filter('fleet_manager')">Fleet Manager</li>
              <li class="option" data-value="opt_7" v-on:click="filter('project_manager')">Project Manager</li>
              <li class="option" data-value="opt_8" v-on:click="filter('osp')">OSP</li>
              <li class="option" data-value="opt_9" v-on:click="filter('isp')">ISP</li>
              <li class="option" data-value="opt_0" v-on:click="filter('ofc')">OFC</li>
            </ul>
          </div>
        </label>
      </div>

      <div class="comp-title col-md-5">
        <form method="get" action="/search" class="fleet_search">
          <input name="q" type="text" size="40" placeholder="Search..." />
        </form>
      </div>

      <div class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addUser" v-on:click="resetUser()">
          Add User
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Contact</td>
              <td>Email</td>
              <td>Account Type</td>
              <td>Role</td>
              <td>Creation Date</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in getAdminUsers" :key="user.id">
              <td>{{ user.first_name }} {{ user.last_name}}</td>
              <td>{{ user.phone_number }}</td>
              <td>{{ user.email }}</td>
              <td style="text-transform: capitalize">{{ user.type }}</td>
              <td style="text-transform: capitalize">{{ user.role.replace('_', ' ') }}</td>
              <td>{{ user.created | moment('MMM Do YYYY')}}</td>
              <td class="text-right">
                <i class="fa fa-edit" v-on:click="editUser(user)" data-toggle="modal" data-target="#addUser"></i> 
                <i class="fa fa-times" v-on:click="deleteUser(user)"></i>
              </td>
            </tr>
            <tr v-if="getAdminUsers.length <= 0">
              <td colspan="7" class="text-center">No Users Yet</td>
            </tr>
          </tbody>
        </table>
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
                <label>Type</label>
                <select class="form-control"  v-model="user.type">
                  <option v-bind:value="'admin'">Admin</option>
                  <option v-bind:value="'employee'">Employee</option>
                </select>
              </div>
              <div class="form-group">
                <label>Contract type</label>
                <select class="form-control" v-model="user.contract_type">
                  <option v-bind:value="'permanent'">Permament</option>
                  <option v-bind:value="'temporary'">Temporary</option>
                </select>
              </div>
              <div class="form-group">
                <label>Role</label>
                <select class="form-control" v-model="user.role">
                  <option v-bind:value="'driver'">Driver</option>
                  <option v-bind:value="'isp'">ISP</option>
                  <option v-bind:value="'quality'">Quality</option>
                  <option v-bind:value="'ofc'">OFC</option>
                  <option v-bind:value="'surveyor'">Surveyor</option>
                  <option v-bind:value="'project_manager'">Project Manager</option>
                  <option v-bind:value="'fleet_manager'">Fleet Manager</option>
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
</div>
</template>

<script>
import { select } from "../mixins/select";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  mixins: [select],
  data(router) {
    return {
      editMode: false,
      user: {
        first_name: "",
        last_name: "",
        email: "",
        type: "",
        contract_type: "",
        phone_number: "",
        role: "",
        workspace: window.localStorage.getItem("workspace")
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("users/loadUsers", window.localStorage.getItem("workspace"));
  },
  computed: {
    ...mapGetters('users', ['getAdminUsers'])
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
    filter(type){
      this.$store.commit('users/CHANGE_LIST_TYPE', type)
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
        type: '',
        contract_type: '',
        phone_number: '',
        password: '1234',
        workspace: window.localStorage.getItem("workspace")
      }
    }
  }
};
</script>

<style>
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


