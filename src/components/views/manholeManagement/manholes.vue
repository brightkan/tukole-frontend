<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Manholes</h3>
      </div>

      <div class="comp-title col-md-3">
        
      </div>

      <div class="comp-title col-md-5">
        <form method="get" action="/search" class="fleet_search">
          <input name="q" type="text" size="40" placeholder="Search..." />
        </form>
      </div>

      <div class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addManhole" v-on:click="resetManhole()">
          Add Manhole
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <td>Manhole</td>
              <td>Site</td>
              <td>Created</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="manhole in manholes" :key="manhole.id">
              <td>{{ manhole.number }}</td>
              <td>{{ manhole.site ? manhole.site.site_name : '' }}</td>
              <td>{{ manhole.created | moment('MMM Do YYYY') }}</td>
              <td class="text-right">
                <i class="fa fa-edit" v-on:click="editManhole(manhole)" data-toggle="modal" data-target="#addManhole"></i> 
                <i class="fa fa-times" v-on:click="deleteManhole(manhole)"></i>
              </td>
            </tr>
            <tr v-if="manholes.length <= 0">
              <td colspan="6" class="text-center">No Manholes Yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addManhole" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Edit' : 'Add'}} Material</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="manhole.number"/>
              </div>
              <div class="form-group">
                <label>Site</label>
                <select class="form-control" v-model="manhole.site">
                  <option v-for="site in sites" v-bind:value="site.id" :key="site.id">
                    {{ site.site_name }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveManhole" data-dismiss="modal">
              {{ editMode ? 'Edit' : 'Add'}} Manhole
            </button>
          </div>
        </div>
      </div>
    </div>

  </section>
</div>
</template>

<script>

import { mapState } from "vuex";

export default {
  data(router) {
    return {
      editMode: false,
      manhole: {
        number: "",
        site: ""
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("manholes/loadManholes");
  },
  computed: {
    ...mapState({
      sites: state => state.sites.sites,
      manholes: state => state.manholes.manholes
    })
  },
  methods: {
    saveManhole() {
      const { manhole } = this;
      if(this.editMode){
        this.$store.dispatch("manholes/updateManhole", manhole);
      }else{
        this.$store.dispatch("manholes/addManhole", manhole);
      }
    },
    editManhole(manhole){
      this.editMode = true;
      this.manohle = Object.assign({}, manhole);
      this.manhole.site = manhole.site.site_name;
    },
    deleteManhole(manhole){
      if (confirm(`are you sure you want to delete ${manhole.number}?`)) {
          this.$store.dispatch("manholes/deleteManhole", manhole);
      }
    },
    resetManhole(){
      this.editMode = false;
      this.manohle = {
        number: "",
        site: ""
      }
    }
  }
};
</script>

<style>

</style>


