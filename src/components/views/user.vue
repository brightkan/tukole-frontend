<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Users</h3>
      </div>

      <div class="comp-title col-md-3">
        <label id="img_category_label" class="field" for="img_category" data-value>
          <span>Sort By</span>
          <div id="img_category" class="psuedo_select" name="img_category">
            <span class="selected"></span>
            <ul id="img_category_options" class="options">
              <li class="option" data-value="opt_1" v-on:click="filter('all')">All</li>
              <li class="option" data-value="opt_2" v-on:click="filter('admin')">Admin</li>
              <li class="option" data-value="opt_3" v-on:click="filter('super_admin')">Super Admin</li>
              <li class="option" data-value="opt_4" v-on:click="filter('client')">Client</li>
              <li
                class="option"
                data-value="opt_5"
                v-on:click="filter('warehouse_manager')"
              >Warehouse Manager</li>
              <li
                class="option"
                data-value="opt_6"
                v-on:click="filter('fleet_manager')"
              >Fleet Manager</li>
              <li
                class="option"
                data-value="opt_7"
                v-on:click="filter('project_manager')"
              >Project Manager</li>
              <li class="option" data-value="opt_8" v-on:click="filter('osp')">OSP</li>
              <li class="option" data-value="opt_9" v-on:click="filter('isp')">ISP</li>
              <li class="option" data-value="opt_0" v-on:click="filter('ofc')">OFC</li>
            </ul>
          </div>
        </label>
      </div>

      <div class="comp-title col-md-5">
        <form method="get" action="/search" class="fleet_search">
          <input name="q" type="text" size="40" placeholder="Search...">
        </form>
      </div>

      <div class="comp-title col-md-2">
        <!-- <button
          type="button"
          data-toggle="modal"
          data-target="#addUser"
          v-on:click="resetUser()"
        >Add User</button> -->
        <button type="button" v-on:click="showUserForm()">Add User...</button>
      </div>
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3>
            <i class="fa fa-users"></i> Users
          </h3>
          <table>
            <thead>
              <tr v-if="getAdminUsers.length > 0">
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
                  <i
                    class="fa fa-edit"
                    v-on:click="editUser(user)"
                    data-toggle="modal"
                    data-target="#addUser"
                  ></i>
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
    </div>

    <!-- Modal -->
    <modal name="userForm" class="custom-modal"  height="auto" :scrollable="true">
        <div class="row modal-header">
          <div class="col-md-12">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} User</h5>
            <button type="button" class="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <form>
              <div class="modal-body">
                  <div>
                    <mdc-textfield v-model="user.first_name" label="First Name" outline/>

                    <mdc-textfield v-model="user.last_name" label="Last Name" outline/>

                    <mdc-textfield v-model="user.email" label="Email" outline/>

                    <mdc-select v-model="user.type" label="Account Type" outlined>
                      <option v-bind:value="'admin'">Admin</option>
                      <option v-bind:value="'employee'">Employee</option>
                    </mdc-select>

                    <mdc-select v-model="user.contract_type" label="Contract type" outlined>
                      <option v-bind:value="'permanent'">Permament</option>
                      <option v-bind:value="'temporary'">Temporary</option>
                    </mdc-select>

                    <mdc-select v-model="user.role" label="Role" outlined>
                      <option v-bind:value="'driver'">Driver</option>
                      <option v-bind:value="'isp'">ISP</option>
                      <option v-bind:value="'quality'">Quality</option>
                      <option v-bind:value="'ofc'">OFC</option>
                      <option v-bind:value="'osp_field_manager'">OSP Field Manager</option>
                      <option v-bind:value="'osp_superisor'">OSP Supervisor</option>
                      <option v-bind:value="'surveyor'">Surveyor</option>
                      <option v-bind:value="'project_manager'">Project Manager</option>
                      <option v-bind:value="'fleet_manager'">Fleet Manager</option>
                      <option v-bind:value="'fuel_station_user'">Fuel Station User</option>
                      <option v-bind:value="'garage_manager'">Garage Manager</option>
                      <option v-bind:value="'warehouse'">Warehouse</option>
                      <option v-bind:value="'mechanic'">Mechanic</option>
                    </mdc-select>
                  </div>
                  
                  <mdc-textfield v-model="user.phone_number" label="Phone Number" required
                  helptext="Enter correct phone number format" :valid="isValidTel" helptext-validation 
                  @keyup="checkTelValidity" outline/>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" v-on:click="saveUser()" class="btn btn-primary" >{{ editMode ? 'Edit' : 'New'}} User</button>
              </div>
            </form>
          </div>
        </div>
    </modal>


    <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form v-on:submit="saveUser">
            <div class="modal-body">
                <div>
                  <mdc-textfield v-model="user.first_name" label="First Name" outline/>

                  <mdc-textfield v-model="user.last_name" label="Last Name" outline/>

                  <mdc-textfield v-model="user.email" label="Email" outline/>

                  <mdc-select v-model="user.type" label="Account Type" outlined>
                    <option v-bind:value="'admin'">Admin</option>
                    <option v-bind:value="'employee'">Employee</option>
                  </mdc-select>

                  <mdc-select v-model="user.contract_type" label="Contract type" outlined>
                    <option v-bind:value="'permanent'">Permament</option>
                    <option v-bind:value="'temporary'">Temporary</option>
                  </mdc-select>

                  <mdc-select v-model="user.role" label="Role" outlined>
                    <option v-bind:value="'driver'">Driver</option>
                    <option v-bind:value="'isp'">ISP</option>
                    <option v-bind:value="'quality'">Quality</option>
                    <option v-bind:value="'ofc'">OFC</option>
                    <option v-bind:value="'osp'">OSP</option>
                    <option v-bind:value="'surveyor'">Surveyor</option>
                    <option v-bind:value="'project_manager'">Project Manager</option>
                    <option v-bind:value="'fleet_manager'">Fleet Manager</option>
                    <option v-bind:value="'fuel_station_user'">Fuel Station User</option>
                  </mdc-select>
                </div>
                
                <mdc-textfield v-model="user.phone_number" label="Phone Number" required
                helptext="Enter correct phone number format" :valid="isValidTel" helptext-validation 
                @keyup="checkTelValidity" outline/>


                <!-- <div class="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="telephone-check"
                    v-model="user.phone_number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    v-on:keypress="signalChange"
                  >
                  <p id="pherror" class="text-sm alert-danger">Input right phone number</p>
                </div> -->
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button
                type="submit"
                class="btn btn-primary"
                data-dismiss="modal"
              >{{ editMode ? 'Edit' : 'New'}} User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
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
      errorPhone: false,
      isValidTel: true,
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
    this.$store.dispatch(
      "users/loadUsers",
      window.localStorage.getItem("workspace")
    );
  },
  computed: {
    ...mapGetters("users", ["getAdminUsers"])
  },
  methods: {
    showUserForm () {
      this.$modal.show('userForm');
    },
    hideUserForm () {
      this.$modal.hide('userForm');
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
      console.log(user)
      this.$modal.hide('userForm');

      if(this.isValidTel){
        if (this.editMode) {
          this.$store.dispatch("users/updateUser", user);
        } else {
          this.$store.dispatch("users/inviteUser", user);
        }
      }
      
    },
    filter(type) {
      this.$store.commit("users/CHANGE_LIST_TYPE", type);
    },
    editUser(user) {
      this.editMode = true;
      this.user = Object.assign({}, user);
    },
    deleteUser(user) {
      if (confirm(`are you sure you want to delete ${user.first_name}?`)) {
        this.$store.dispatch("users/deleteUser", user);
      }
    },
    resetUser() {
      this.editMode = false;
      this.user = {
        first_name: "",
        last_name: "",
        email: "",
        type: "",
        contract_type: "",
        phone_number: "",
        password: "1234",
        workspace: window.localStorage.getItem("workspace")
      };
    }
  }
};
</script>

<style lang="scss">
@import "../../../static/css/variables";

@mixin platform-prefixes {
  &::-webkit-input-placeholder{
    @content;
  }
  &::-moz-placeholder{
    @content;
  }
  &:-ms-input-placeholder{
    @content;
  }
  &:-moz-placeholder {
    @content;
  }
}

.table-alt {
  border-radius: 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  background-color: #ffffff;
  padding-bottom: 15px;

  h3 {
    padding: 15px 30px;
    border-bottom: 1px solid #b4b4b4;
    color: #28354a;
    line-height: 1.22;
    font-size: 18px;
    font-weight: 500;

    i {
      display: inline-block;
      margin-right: 15px;
    }
  }

  table {
    width: 100%;

    thead {
      tr {
        td {
          padding: 15px 15px;
          color: #000;
          line-height: 1.29;
          font-family: $font;
          font-size: 15px;
          font-weight: 600;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 10px 15px;
          color: #28354a;
          line-height: 1.29;
          font-family: $font;
          font-size: 14px;
          font-weight: normal;

          span {
            color: #fff;
            font-size: 12px;
            line-height: 11px;
            padding: 3px 15px;
            border-radius: 20px;
            text-transform: capitalize;
          }
          span.green {
            background-color: #2dae3e;
          }
          span.red {
            background-color: #ff5f58;
          }
          span.orange {
            background-color: #fa9917;
          }
        }

        .fa-edit {
          display: inline-block;
          margin-right: 15px;
        }
      }
    }

    tr {
      td:nth-child(1) {
        padding-left: 30px;
      }
      td:last-child {
        padding-right: 30px;
      }
    }
  }
}

.custom-modal{
  .v--modal{
    top: 80px !important;
  }
  .modal-header{
    margin: 0;
    border-bottom: 1px solid rgba(0,0,0, 0.09);
    padding: 20px 0;

    .modal-title{
      font-family: $font;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.22;
      letter-spacing: normal;
      text-align: left;
      color: #28354a;
    }
  }
}
/*material design edits*/
.modal-body{
  .mdc-textfield-wrapper {
      width: 100%;

      label{
        margin-bottom: 0;
      }
      input{
        box-sizing: initial;
      }
  }

  .mdc-select{
    width: 100%;
    margin: 15px 0;

    label{
      margin-bottom: 0;
    }
    select{
      box-sizing: initial;
    }
  }
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
/* .modal-body > .row {
  padding: 0 25px;
} */
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
/* .modal-body form {
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
} */
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


