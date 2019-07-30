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
        <div class="tab-layout">
          <ul class="nav nav-tabs" role="tablist" data-tabs="tabs">
            <li>
              <a class="active" href="#manhole" data-toggle="tab" role="tab">Manholes</a>
            </li>
            <li>
              <a
                href="#reInstallations"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteReInstallations()"
              >Reinstatements</a>
            </li>
            <li>
              <a
                href="#roadCrossings"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteRoadCrossings()"
              >RoadCrossing</a>
            </li>
            <li>
              <a
                href="#trenchDistances"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteTrenchDistances()"
              >Trench Distance</a>
            </li>

            <li>
              <a
                href="#ductInstallation"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteDuctInstallation()"
              >Duct Installation</a>
            </li>
            <li>
              <a
                href="#cableInstallation"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteCableInstallations()"
              >Cable Installation</a>
            </li>
            <li>
              <a
                href="#odfInstallation"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteOdfInstallations()"
              >Odf Installation</a>
            </li>
            <li>
              <a
                href="#odfTermination"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteOdfTerminations()"
              >Odf Termination</a>
            </li>

            <li>
              <a
                href="#routeChange"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteRouteChanges()"
              >Route Change</a>
            </li>
            <li>
              <a
                href="#handholeInstallation"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteHandoleInstallations()"
              >HandHole Installation</a>
            </li>
            <li>
              <a
                href="#trunking"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteTrunkings()"
              >Trunking</a>
            </li>
            <li>
              <a
                href="#others"
                data-toggle="tab"
                role="tab"
                v-on:click="loadSiteOthers()"
              >Others</a>
            </li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade show active" id="manhole">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>ManHole number</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('manholesinstallation')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="manholeInstallation in manholeInstallations"
                      :key="manholeInstallation.id"
                    >
                      <td>{{ manholeInstallation.number_installed }}</td>
                      <td>{{ manholeInstallation.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(manholeInstallation, 'manholeInstallations')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="manholeInstallations.length <= 0">
                      <td colspan="7" class="text-center">No ManHoles installed Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="reInstallations">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Type</td>
                      <td>Material</td>
                      <td>Quantity</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('reinstallation')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="reInstallation in reInstallations" :key="reInstallation.id">
                      <td>{{ reInstallation.type }}</td>
                      <td>{{ reInstallation.material.name }}</td>
                      <td>{{ reInstallation.amount }} {{ reInstallation.material.measurement }}</td>
                      <td>{{ reInstallation.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(reInstallation, 'reInstatement')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="reInstallations.length <= 0">
                      <td colspan="7" class="text-center">No Site ReInstallations Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="roadCrossings">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Distance crossed</td>
                      <td>Machine</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03"
                        v-bind:href="getCsvUrl('roadcrossing')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="roadCrossing in roadCrossings" :key="roadCrossing.id">
                      <td>{{ roadCrossing.distance_crossed }} meters</td>
                      <td>{{ roadCrossing.machinery != null ? roadCrossing.machinery.name : "" }}</td>
                      <td>{{ roadCrossing.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(roadCrossing, 'roadCrossing')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="roadCrossings.length <= 0">
                      <td colspan="7" class="text-center">No Road crossings Yet</td>
                    </tr>
                  </tbody>
                </table>
                <div class="col-md-12">
                  Total Road Crossing
                  <span>{{getTotalRoadCrossing | formatNumber}}</span>
                </div>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="trenchDistances">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Distance</td>
                      <td>Depth</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('distance/trenched')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="trenchDistance in trenchDistances" :key="trenchDistance.id">
                      <td>{{ trenchDistance.distance }} meters</td>
                      <td>{{ trenchDistance.depth }} meters</td>
                      <td>{{ trenchDistance.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(trenchDistance, 'trenchDistance')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="trenchDistances.length <= 0">
                      <td colspan="7" class="text-center">No Trench Distance Yet</td>
                    </tr>
                  </tbody>
                </table>
                <div class="col-md-12">
                  Total Trench Distance
                  <span>{{getTotalTrench + getTotalRoadCrossing | formatNumber}}</span>
                </div>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="cableInstallation">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Length</td>
                      <td>Size</td>
                      <td>Method</td>
                      <td>Type</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('cableinstallation')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cableInstallation in cableInstallations" :key="cableInstallation.id">
                      <td>{{ cableInstallation.distance }}</td>
                      <td>{{ cableInstallation.depth }}</td>
                      <td>{{ cableInstallation.depth }}</td>
                      <td>{{ cableInstallation.depth }}</td>
                      <td>{{ cableInstallation.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(cableInstallation, 'cableInstallation')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="cableInstallations.length <= 0">
                      <td colspan="7" class="text-center">No Data Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="ductInstallation">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Number</td>
                      <td>Size</td>
                      <td>Micro duct</td>
                      <td>Duct type</td>
                      <td>Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('ductinstallation')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ductInstallation in ductInstallations" :key="ductInstallation.id">
                      <td>{{ ductInstallation.number }}</td>
                      <td>{{ ductInstallation.size }}</td>
                      <td>{{ ductInstallation.micro_duct }}</td>
                      <td>{{ ductInstallation.duct_type }}</td>
                      <td>{{ ductInstallation.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(ductInstallation, 'ductInstallation')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="ductInstallations.length <= 0">
                      <td colspan="7" class="text-center">No Data Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="handholeInstallation">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Number Installed</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('handholeinstallation')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="handHoleInstallation in handHoleInstallations"
                      :key="handHoleInstallation.id"
                    >
                      <td>{{ handHoleInstallation.number_installed }}</td>
                      <td>{{ handHoleInstallation.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(handholeInstallation, 'handholeInstallation')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="handHoleInstallations.length <= 0">
                      <td colspan="7" class="text-center">No Data Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="odfInstallation">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Size</td>
                      <td>Number installed</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('odfinstallation')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="odfInstallation in odfInstallations" :key="odfInstallation.id">
                      <td>{{ odfInstallation.size_of_odf }}</td>
                      <td>{{ odfInstallation.number_of_odf_installed }}</td>
                      <td>{{ odfInstallation.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(odfInstallation, 'odfInstallation')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="odfInstallations.length <= 0">
                      <td colspan="7" class="text-center">No Data Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="odfTermination">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Port</td>
                      <td>Label</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('odftermination')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="odfTermination in odfTerminations" :key="odfTermination.id">
                      <td>{{ odfTermination.ports }}</td>
                      <td>{{ odfTermination.label }}</td>
                      <td>{{ odfTermination.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(odfTermination, 'odfTermination')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="odfTerminations.length <= 0">
                      <td colspan="7" class="text-center">No Data Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="routeChange">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Reason</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('routechange')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="routeChange in routeChanges" :key="routeChange.id">
                      <td>{{ routeChange.route_change_reason }}</td>
                      <td>{{ routeChange.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(routeChange, 'changeRoute')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="routeChanges.length <= 0">
                      <td colspan="7" class="text-center">No Data Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="trunking">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Meters Trunked</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('trunking')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="trunking in trunkings" :key="trunking.id">
                      <td>{{ trunking.meters_trunked }}</td>
                      <td>{{ trunking.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(trunking, 'trunking')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="trunkings.length <= 0">
                      <td colspan="7" class="text-center">No Data Yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="others">
              <div class="table-alt">
                <table class="table">
                  <thead>
                    <tr>
                      <td>Other</td>
                      <td>Creation Date</td>
                      <td>
                        <a class="custom-btn text-white" 
                        style="padding-top: 5px; padding-bottom: 5px; cursor: pointer; background: #f5ab03" 
                        v-bind:href="getCsvUrl('other')">
                        Download csv</a>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="other in others" :key="other.id">
                      <td>{{ other.reason }}</td>
                      <td>{{ other.created | moment("dddd, MMMM Do YYYY") }}</td>
                      <td>
                        <a
                          class="custom-btn text-white"
                          style="padding-top: 5px; padding-bottom: 5px; cursor: pointer"
                          v-on:click="selectMaterialsUsed(other, 'other')"
                        >Materials Used</a>
                      </td>
                    </tr>
                    <tr v-if="others.length <= 0">
                      <td colspan="7" class="text-center">No Data Yet</td>
                    </tr>
                  </tbody>
                </table>
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
import { mapGetters } from "vuex";

export default {
  created() {},
  mounted() {
    this.$store.dispatch(
      "sites/loadSiteManholeInstallation",
      window.localStorage.getItem("selectsite")
    );
  },
  computed: {
    ...mapState({
      site: state => state.sites.site,
      manholeInstallations: state => state.sites.siteManholeInstallations,
      reInstallations: state => state.sites.siteReInstallations,
      roadCrossings: state => state.sites.siteRoadCrossings,
      trenchDistances: state => state.sites.siteTrenchDistances,
      ductInstallations: state => state.sites.siteDuctInstallation,
      cableInstallations: state => state.sites.siteCableInstallation,
      odfInstallations: state => state.sites.siteOdfInstallation,
      odfTerminations: state => state.sites.siteOdfTermination,
      others: state => state.sites.siteOthers,
      handHoleInstallations: state => state.sites.siteHandHoleInstallation,
      routeChanges: state => state.sites.siteRouteChange,
      trunkings: state => state.sites.siteTrunking
    }),
    ...mapGetters("sites", ["getTotalTrench", "getTotalRoadCrossing"])
  },
  methods: {
    loadSiteReInstallations() {
      this.$store.dispatch(
        "sites/loadSiteReInstallations",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteRoadCrossings() {
      this.$store.dispatch(
        "sites/loadSiteRoadCrossings",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteTrenchDistances() {
      this.$store.dispatch(
        "sites/loadSiteTrenchDistance",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteTrunkings() {
      this.$store.dispatch(
        "sites/loadSiteTrunking",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteRouteChanges() {
      this.$store.dispatch(
        "sites/loadSiteRouteChange",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteOthers() {
      this.$store.dispatch(
        "sites/loadSiteOther",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteOdfTerminations() {
      this.$store.dispatch(
        "sites/loadSiteOdfTermination",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteOdfInstallations() {
      this.$store.dispatch(
        "sites/loadSiteOdfInstallation",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteHandoleInstallations() {
      this.$store.dispatch(
        "sites/loadSiteHandoleInstallation",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteCableInstallations() {
      this.$store.dispatch(
        "sites/loadSiteCableInstallation",
        window.localStorage.getItem("selectsite")
      );
    },
    loadSiteDuctInstallation() {
      this.$store.dispatch(
        "sites/loadSiteDuctInstallation",
        window.localStorage.getItem("selectsite")
      );
    },
    selectMaterialsUsed(activity, type) {
      this.$router.push("/dash/project/projects/materialsused/" + activity.id + "/" + type);
    },
    getCsvUrl(type){
      return "http://178.62.54.104/api/"+type+"/?site="+window.localStorage.getItem("selectsite")+"&format=csv"
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-layout {
  ul {
    width: 100%;
    max-height: 63px;
    width: 100%;
    overflow-y: hidden;
    display: -webkit-box;

    &::-webkit-scrollbar {
      height: 5px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #a0a0a0;
      border: 2px solid #a0a0a0;
    }

    li a {
      padding: 12px !important;
    }
  }
}
</style>


