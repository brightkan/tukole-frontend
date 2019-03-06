<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>{{ site.site_name }}</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="tab-layout">
            <ul id="listTabs" class="nav nav-tabs" role="tablist" data-tabs="tabs" style="margin-bottom: 20px">
              <li><a class="active" href="#before" data-toggle="tab" role="tab">Challenges</a></li>
              <li><a href="#after" data-toggle="tab" role="tab" v-on:click="loadIncidents()">Incidents</a></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade show active" id="before">
                <div class="row">
                  <div class="col-md-12">
                      <div class="table-alt">
                        <table class="table">
                          <thead>
                            <tr>
                              <td>Title</td>
                              <td>Description</td>
                              <td>Type</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="challenge in challenges" :key="challenge.id" > 
                              <td>{{ challenge.title }}</td>
                              <td>{{ challenge.description }}</td>
                              <td>{{ challenge.type }}</td>
                            </tr>
                            <tr v-if="challenges.length <= 0">
                              <td colspan="6" class="text-center">No challenges Yet</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                  </div>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="after">
                <div class="row">
                  <div class="col-md-12">
                    <div class="table-alt">
                      <table class="table">
                        <thead>
                          <tr>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Type</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="incident in incidents" :key="incident.id" > 
                            <td>{{ incident.title }}</td>
                            <td>{{ incident.description }}</td>
                            <td>{{ incident.type }}</td>
                          </tr>
                          <tr v-if="incidents.length <= 0">
                            <td colspan="6" class="text-center">No incidents Yet</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {},
  mounted() {
    this.$store.dispatch("challenges/loadChallenges", window.localStorage.getItem("selectsite"));
  },
  computed: {
    ...mapState({
      site: state => state.sites.site,
      challenges: state => state.challenges.challenges,
      incidents: state => state.challenges.incidents
    }),
  },
  methods: {
    loadIncidents(){
      this.$store.dispatch("challenges/loadIncidents", window.localStorage.getItem("selectsite"));
    }
  }
};
</script>


