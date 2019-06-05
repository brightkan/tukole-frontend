<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="container search-wrapper">
      <div class="row search">
        <div class="input">
          <mdc-select label="Sort By">
            <option v-on:click="filter('all')">All</option>
            <option v-on:click="filter('admin')">Admin</option>
            <option v-on:click="filter('super_admin')">Super Admin</option>
            <option v-on:click="filter('client')">Client</option>
            <option v-on:click="filter('warehouse_manager')">Warehouse Manager</option>
            <option v-on:click="filter('fleet_manager')" >Fleet Manager</option>
            <option v-on:click="filter('project_manager')" >Project Manager</option>
            <option v-on:click="filter('osp')">OSP</option>
            <option v-on:click="filter('isp')">ISP</option>
            <option v-on:click="filter('ofc')">OFC</option>
          </mdc-select>
          <form method="get" action="/search">
            <input name="q" type="text" size="40" placeholder="Search..." v-model="filterUser">
          </form>
        </div>
        <button class="mdc-button mdc-button--raised" v-on:click="showUserForm();resetUser()">Add User</button>
      </div>
    </div>

    <!-- /.row -->
    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3>
            <i class="fa fa-users"></i> Users
          </h3>

          <datatable :columns="table_columns" :data="getAdminUsers" :filter-by="filterUser">
            <template scope="{ row }">
                <tr>
                  <td>{{ row.first_name }} {{ row.last_name}}</td>
                  <td>{{ row.phone_number }}</td>
                  <td>{{ row.email }}</td>
                  <td style="text-transform: capitalize">{{ row.type }}</td>
                  <td style="text-transform: capitalize">{{ row.role == "garage_manager" ? "Workshop Supervisior" :row.role.replace('_', ' ') }}</td>
                  <td>{{ row.created | moment('MMM Do YYYY')}}</td>
                  <td class="text-right">
                    <i class="fa fa-edit" v-on:click="editUser(row)"></i>
                    <i class="fa fa-times" v-on:click="deleteUser(row)"></i>
                  </td>
                </tr>
            </template>
          </datatable>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <modal name="userForm" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'New'}} User</h5>
          <button type="button" class="close" v-on:click="hideUserForm()">
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
                    <mdc-select v-model="user.type" label="Account Type" required outlined>
                      <option v-bind:value="'admin'">Admin</option>
                      <option v-bind:value="'employee'">Employee</option>
                    </mdc-select>
                  </div>
                  <div class="col-md-6">
                    <mdc-textfield v-model="user.last_name" label="Last Name" required outline/>

                    <mdc-select v-model="user.contract_type" label="Contract type" required outlined>
                      <option v-bind:value="'permanent'">Permament</option>
                      <option v-bind:value="'temporary'">Temporary</option>
                    </mdc-select>

                    <mdc-select v-model="user.role" label="Role" required outlined>
                      <option v-bind:value="'driver'">Driver</option>
                      <option v-bind:value="'isp'">ISP</option>
                      <option v-bind:value="'quality'">Quality</option>
                      <option v-bind:value="'ofc'">OFC</option>
                      <option v-bind:value="'osp_field_manager'">OSP Field Manager</option>
                      <option v-bind:value="'osp_supervisor'">OSP Supervisor</option>
                      <option v-bind:value="'surveyor'">Surveyor</option>
                      <option v-bind:value="'project_manager'">Project Manager</option>
                      <option v-bind:value="'fleet_manager'">Fleet Manager</option>
                      <option v-bind:value="'fuel_station_user'">Fuel Station User</option>
                      <option v-bind:value="'garage_manager'">Workshop Supervisor</option>
                      <option v-bind:value="'warehouse'">Warehouse</option>
                      <option v-bind:value="'mechanic'">Mechanic</option>
                      <option v-bind:value="'tools_head_of_department'">Tools Head of Department</option>
                      <option v-bind:value="'tools_manager'">Tools Manager</option>
                      <option v-bind:value="'technician'">Technician</option>
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
      },

      //dataTables implementation
      filterUser: '',
      table_columns: [
          {label: 'Name', representedAs: function (metric) {
            var fName = metric.first_name ? metric.first_name : ""
            var lName = metric.last_name ? metric.last_name : ""
                  return fName + ' ' + lName
              }, sortable: false
          },
          {label: 'Contact', field: 'phone_number'},
          {label: 'Email', field: 'email'},
          {label: 'Account Type', field: 'type'},
          {label: 'Role', field: "role"},
          {label: 'Created', field: 'created'},
          {label: '', field: ''}
      ],
      rows: window.rows,
      page: 1,
      per_page: 10
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
    showUserForm() {
      this.$modal.show("userForm");
    },
    hideUserForm() {
      this.$modal.hide("userForm");
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
      console.log(user);
      this.$modal.hide("userForm");

      if (this.isValidTel) {
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
      this.$modal.show("userForm");
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
  &::-webkit-input-placeholder {
    @content;
  }
  &::-moz-placeholder {
    @content;
  }
  &:-ms-input-placeholder {
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

.custom-modal {
  .v--modal {
    top: 80px !important;
  }
  .modal-header {
    margin: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    padding: 20px 0;

    > div {
      padding: 0 30px;
    }

    .modal-title {
      font-family: $font;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.22;
      letter-spacing: normal;
      text-align: left;
      color: #28354a;
    }
  }

  /*material design edits*/
  .modal-body {
    padding-left: 30px;
    padding-right: 30px;

    .mdc-textfield-wrapper {
      width: 100%;

      label {
        margin-bottom: 0;
      }
      input {
        box-sizing: initial;
      }
    }

    .mdc-select {
      width: 100%;
      margin: 15px 0 8px;

      label {
        margin-bottom: 0;
      }
      select {
        box-sizing: initial;
      }
    }

    .note {
      font-family: $font;
      font-size: 15px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.27;
      letter-spacing: normal;
      text-align: left;
      color: #28354a;

      span {
        color: #ffbd08;
      }
    }
  }

  .modal-footer {
    padding-bottom: 30px;
    border-top: none;
    position: relative;

    button.mdc-button {
      margin-left: auto;
      margin-right: auto;
      font-family: $font;
      font-size: 12px;
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.22;
      letter-spacing: normal;
      text-align: left;
      color: #ffffff;
      border-radius: 4px;
      background-color: #256ae1;
      text-transform: capitalize;
      min-width: 120px;
    }
  }
}

.search-wrapper {
  width: fit-content;
  margin-top: 15px;

  .search {
    button:focus {
      outline: initial;
    }

    .mdc-button {
      height: initial;
    }

    .mdc-button:not(:disabled) {
      margin-left: 10px;
      font-family: $font;
      font-size: 12px;
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.22;
      letter-spacing: normal;
      text-align: left;
      color: #ffffff;
      border-radius: 4px;
      background-color: #256ae1;
      text-transform: capitalize;
      min-width: 120px;
    }

    .input {
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
      .mdc-select {
        height: initial;
        label {
          margin-bottom: 0;
        }
        select {
          box-sizing: initial;
        }
        .mdc-select__native-control {
          height: initial;
          border-radius: 4px 0 0 0;
          border-bottom: none;
          border-right: 1px solid rgba(0, 0, 0, 0.16);
          padding-bottom: 6px;
          padding-top: 10px;
          font-size: 14px;
        }
      }
      .mdc-select--box:not(.mdc-select--disabled) {
        background-color: white;
      }

      .mdc-select--box .mdc-floating-label {
        bottom: 6px;
      }
      .mdc-select--box .mdc-floating-label--float-above {
        display: none;
      }

      form {
        float: right;
        height: 100%;
        width: 500px;

        input {
          width: 100%;
          height: 100%;
          border: none;
          padding-left: 15px;
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.29;
          letter-spacing: normal;
          text-align: left;

          &:focus{
            outline: initial;
          }

          &::placeholder{
            color: $placeholder-color;
          }
        }
      }
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


