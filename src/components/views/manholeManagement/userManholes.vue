
<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-10">
        <h3>{{ getUser(this.$route.params.id).first_name +' '+getUser(this.$route.params.id).last_name }}</h3>
      </div>
      <div class="col-md-2"> 
        <a class="custom-btn text-white" data-toggle="modal" data-target="#showManHoleAssignment" style="padding-top: 5px; padding-bottom: 5px;">
          Assign Manhole
        </a>  
      </div>
    </div>
    <!-- /.row -->

    <div class="row _projects" v-if="$store.state.user_type != 'client'">
      <div class="col-md-12">
        <div class="project-roles-box">
            <ul id="listTabs" class="nav nav-tabs" role="tablist" data-tabs="tabs">
              <li><a class="active" href="#current" data-toggle="tab" role="tab">Current</a></li>
              <li><a href="#previous" data-toggle="tab" role="tab" v-on:click="loadAllManholes()">Previous</a></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade show active" id="current">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Login time</td>
                      <td>Logout time</td>
                      <td>Assigned on</td>
                    </tr>
                  </thead>
                  <tbody> 
                    <tr v-for="manhole in getUserCurrentManholes(this.$route.params.id)" :key="manhole.id">
                      <td>{{ manhole.manhole }}</td>
                      <td>{{ manhole.login_time | moment("HH:mm:ss") }}</td>
                      <td>{{ manhole.logout_time | moment("HH:mm:ss") }}</td>
                      <td>{{ manhole.created | moment('MMM Do YYYY')}}</td>
                    </tr>
                    <tr v-if="getUserCurrentManholes(this.$route.params.id).length <= 0">
                      <td colspan="7" class="text-center">No Manholes Yet</td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
              <div role="tabpanel" class="tab-pane fade" id="previous">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Login time</td>
                      <td>Logout time</td>
                      <td>Assigned on</td>
                    </tr>
                  </thead>
                  <tbody> 
                    <tr v-for="manhole in getUserPreviousManholes(this.$route.params.id)" :key="manhole.id">
                      <td>{{ manhole.manhole }}</td>
                      <td>{{ manhole.login_time | moment("HH:mm:ss") }}</td>
                      <td>{{ manhole.logout_time | moment("HH:mm:ss") }}</td>
                      <td>{{ manhole.created | moment('MMM Do YYYY')}}</td>
                    </tr>
                    <tr v-if="getUserPreviousManholes(this.$route.params.id).length <= 0">
                      <td colspan="7" class="text-center">No Manholes Yet</td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="showManHoleAssignment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <label>ManHoles</label>
                <select class="form-control" v-model="selectedManhole.manhole">
                  <option v-for="manhole in manholes" :key="manhole.id" v-bind:value="manhole.id">
                    {{ manhole.number }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveAssignment()" data-dismiss="modal">
              save</button>
          </div>
        </div>
      </div>
    </div>

  </section>
</div>
</template>

<script>
import { select } from "../../mixins/select";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  mixins: [select],
  data(router) {
    return {
      selectedManhole: {
        manhole: '',
        user: this.$route.params.id
      },
      editMode: false,
    };
  },
  mounted() {
    this.$store.dispatch("users/loadManHoles", window.localStorage.getItem("workspace"));
    this.$store.dispatch("users/loadCurrentManHoles", this.$route.params.id);
  },
  computed: {
    ...mapState('users', ['manholes']),
    ...mapGetters('users', ['getUser', 'getUserCurrentManholes', 'getUserPreviousManholes'])
  },
  methods: {
    saveAssignment(){
      const { selectedManhole } = this;
      this.$store.dispatch("users/assignManhole", selectedManhole);
    },
    loadAllManholes(){
      this.$store.dispatch("users/getUserAssignedManholes", this.$route.params.id);
    }
  }
};
</script>

<style>
</style>


