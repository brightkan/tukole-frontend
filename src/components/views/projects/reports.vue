<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>{{ site.site_name }}</h3>
      </div>
      <div class="text-right col-md-6">
        <p>project reports</p>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="project-roles-box">
            <ul id="listTabs" class="nav nav-tabs" role="tablist" data-tabs="tabs">
              <li><a class="active" href="#manhole" data-toggle="tab" role="tab">Manholes</a></li>
              <li><a href="#reInstallations" data-toggle="tab" role="tab" v-on:click="loadSiteReInstallations()">ReInstallations</a></li>
              <li><a href="#roadCrossings" data-toggle="tab" role="tab" v-on:click="loadSiteRoadCrossings()">RoadCrossing</a></li>
              <li><a href="#trenchDistances" data-toggle="tab" role="tab" v-on:click="loadSiteTrenchDistances()">Trench Distance</a></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade show active" id="manhole">
                <div> <!-- Todo: remove this div-->
                  <table class="table">
                    <thead>
                      <tr>
                        <td>ManHole number</td>
                        <td>Creation Date</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="manhole in manholes" :key="manhole.id">
                        <td><span class="oval"></span>{{ manhole.number }}</td>
                        <td>12. 08. 2018</td>
                      </tr>
                      <tr v-if="manholes.length <= 0">
                        <td colspan="7" class="text-center">No ManHoles installed Yet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="reInstallations">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Type</td>
                      <td>Material</td>
                      <td>Amount</td>
                      <td>Creation Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="reInstallation in reInstallations" :key="reInstallation.id">
                      <td><span class="oval"></span>{{ reInstallation.type }}</td>
                      <td>{{ reInstallation.material.name }}</td>
                      <td>{{ reInstallation.amount }} {{ reInstallation.material.measurement }}</td>
                      <td>12. 08. 2018</td>
                    </tr>
                    <tr v-if="reInstallations.length <= 0">
                      <td colspan="7" class="text-center">No Site ReInstallations Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="roadCrossings">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Distance crossed</td>
                      <td>Tool</td>
                      <td>Creation Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="roadCrossing in roadCrossings" :key="roadCrossing.id">
                      <td><span class="oval"></span>{{ roadCrossing.distance_crossed }} meters</td>
                      <td>{{ roadCrossing.tool.name }}</td>
                      <td>12. 08. 2018</td>
                    </tr>

                    <tr v-if="roadCrossings.length <= 0">
                      <td colspan="7" class="text-center">No Road crossings Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="trenchDistances">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Distance</td>
                      <td>Depth</td>
                      <td>Creation Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="trenchDistance in trenchDistances" :key="trenchDistance.id">
                      <td><span class="oval"></span>{{ trenchDistance.distance }} meters</td>
                      <td>{{ trenchDistance.depth }} meters</td>
                      <td>12. 08. 2018</td>
                    </tr>

                    <tr v-if="trenchDistances.length <= 0">
                      <td colspan="7" class="text-center">No Trench Distance Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  created() {},
  mounted() {
    this.$store.dispatch("sites/loadSiteManholes", window.localStorage.getItem("selectsite"));
  },
  computed: {
    ...mapState({
      site: state => state.sites.site,
      manholes: state => state.sites.siteManholes,
      reInstallations: state => state.sites.siteReInstallations,
      roadCrossings: state => state.sites.siteRoadCrossings,
      trenchDistances: state => state.sites.siteTrenchDistances,
    })
  },
  methods: {
    loadSiteReInstallations(){
      this.$store.dispatch("sites/loadSiteReInstallations", window.localStorage.getItem("selectsite"));
    },
    loadSiteRoadCrossings(){
      this.$store.dispatch("sites/loadSiteRoadCrossings", window.localStorage.getItem("selectsite"));
    },
    loadSiteTrenchDistances(){
      this.$store.dispatch("sites/loadSiteTrenchDistance", window.localStorage.getItem("selectsite"));
    }
  }
};
</script>

<style>
.boq-list {
  padding: 36px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  width: 100%;
}
.boq-list h3 {
  margin-top: 0;
}
.boq-list table tr {
  border-bottom: 1px solid #e0e0e0;
  border-top: none;
}
.boq-list thead tr td {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 15px 0;
}
.boq-list tbody tr td {
  color: #333;
  font-family: "Montserrat", sans-serif;
  padding: 15px 0;
  font-size: 12px;
  line-height: 15px;
}
.table tbody tr td span {
  /* color: #333; */
  font-size: 9px;
  line-height: 11px;
  /* padding: 0; */
  margin-right: 15px;
}
.boq-list > p {
  text-align: right;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin-top: 89px;
}
.boq-list > p span {
  background-color: #fff;
  border: 1px solid #256ae1;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 8px 13px;
  border-radius: 5px;
  margin-left: 15px;
}
.boq-list table tbody td span {
  color: #333;
  padding: 0;
  margin: 0;
  font-size: 12px;
  display: inline-block;
  min-width: 5%;
}
.text-danger td{
  color: red !important;
}
</style>


