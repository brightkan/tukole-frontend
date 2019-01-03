<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>OFC Users</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Manholes assigned</td>
            </tr>
          </thead>
          <tbody class="ofc-users"> 
            <tr v-for="user in getOFCUsers" :key="user.id">
              <td v-on:click="navigateToUser(user)">{{ user.first_name }} {{ user.last_name}}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.assignManholes.join(', ') }}</td>
            </tr>
            <tr v-if="getOFCUsers.length <= 0">
              <td colspan="7" class="text-center">No Users Yet</td>
            </tr>
          </tbody>
        </table>
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
        user: ''
      },
      editMode: false,
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("users/loadUsers", window.localStorage.getItem("workspace"));
    this.$store.dispatch("users/loadManHoles", window.localStorage.getItem("workspace"));
  },
  computed: {
    ...mapState('users', ['manholes']),
    ...mapGetters('users', ['getOFCUsers'])
  },
  methods: {
    saveAssignment(){
      const { selectedManhole } = this;
      this.$store.dispatch("users/assignManhole", selectedManhole);
    },
    selectUser(user){
      this.selectedManhole.user = user.id
    },
    navigateToUser(user){
      this.$router.push('/dash/manholeManagment/userManholes/'+user.id);
    }
  }
};
</script>

<style>
.ofc-users tr td:first-child:hover{
  cursor: pointer;
}
</style>


