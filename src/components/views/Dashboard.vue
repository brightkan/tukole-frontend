<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>Overview</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-4">
        <div class="box">
          <div class="container">
            <ul id="myTabs" class="nav nav-tabs" role="tablist" data-tabs="tabs">
              <li>
                <a class="active show" href="#Vechicles" data-toggle="tab">Vehicles</a>
              </li>
              <li>
                <a href="#Machines" data-toggle="tab">Machines</a>
              </li>
              <li>
                <a href="#Tools" data-toggle="tab">Tools</a>
              </li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade show active" id="Vechicles">
                <div id="canvas-vechicles" style="margin-top: 23px">
                  <canvas id="chart-vechicles" height="200" width="200"></canvas>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Machines">
                <div id="canvas-machines" style="margin-top: 23px">
                  <canvas id="chart-machines" height="200" width="200"></canvas>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Tools">
                <div id="canvas-tools" style="margin-top: 23px">
                  <canvas id="chart-tools" height="200" width="200"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="box project-status">
          <h4>
            Material Status
            <small class="float-right text-muted">RUNNING OUT</small>
          </h4>
          <ul>
            <li v-for="material in runningOut" :key="material.id">
              <p>
                {{ material.name }}
                <br>
                <span>{{ material.measurement }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-4">
        <div class="box project-status">
          <div class="container">
            <h4>
              Fuel usage
              <small class="float-right">
                <router-link tag="span" class="pageLink" to="/dash/fuelConsumption">
                  <a>Details</a>
                </router-link>
              </small>
            </h4>
            <datepicker
              :minimumView="'month'"
              :maximumView="'month'"
              placeholder="Select Date"
              v-model="selectedDate"
              @closed="loadFuelConsumption"
              :format="'MMMM yyyy'"
            ></datepicker>
            <div id="canvas-fuel" style="margin-top: 23px">
              <canvas id="chart-fuel" height="200" width="200"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-4">
        <div class="box project-status">
          <h4>Site Progress</h4>
          <ul style="height: 100%">
            <li v-for="site in siteProgress" :key="site.id">
              <p class="site-percentage">
                {{ site.site_name }}
                <br>
                <span>{{ site.current_stage }}%</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-8">
        <div class="box project-status">
          <h4>
            <span class="icon">
              <i class="fa fa-truck"></i>
            </span> Project costs
          </h4>
          <div class="chart-time-group">
            <div>Annually</div>
            <div style="background-color: #d9d9d9; color: rgb(168, 168, 168)">Monthly</div>
          </div>
          <div class="chart-wrapper">
            <div class="chart" ref="chartdiv" id="barGraph"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /.content -->
</template>

<script>
import Chart from "chart.js";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import Datepicker from "vuejs-datepicker";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      selectedDate: new Date(),
      generateRandomNumbers(numbers, max, min) {
        var a = [];
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max);
        }
        return a;
      }
    };
  },
  computed: {
    coPilotNumbers() {
      return this.generateRandomNumbers(6, 1000000, 10000);
    },
    personalNumbers() {
      return this.generateRandomNumbers(6, 1000000, 10000);
    },
    isMobile() {
      return window.innerWidth <= 800 && window.innerHeight <= 600;
    },
    runningOut() {
      return this.$store.getters["materials/runningOut"];
    },
    siteProgress() {
      return this.$store.getters["sites/getSites"];
    },
    getUsersByType() {
      return this.$store.getters["users/getUsersByType"];
    },
    ...mapState({
      fuelSummary: state => state.fuelConsumption.summary
    })
  },
  mounted() {
    this.$store.dispatch("materials/loadMaterials");
    this.$store.dispatch(
      "sites/loadSites",
      window.localStorage.getItem("workspace")
    );
    this.$store.dispatch(
      "users/loadUsers",
      window.localStorage.getItem("workspace")
    );
    let resFleets = this.$store.dispatch("fleets/loadFleets");
    let resMachines = this.$store.dispatch("machinery/loadMachines");
    let resTools = this.$store.dispatch("tools/loadTools");
    Promise.all([resFleets, resMachines, resTools]).then(() => {
      this.loadDoughnutGraph("chart-vechicles");
      this.loadDoughnutGraph("chart-machines");
      this.loadDoughnutGraph("chart-tools");
      this.loadFuelConsumption();
    });

    this.$emit("customEventForValChange", this.$route.path);

    this.loadGraph()
  },
  methods: {
    loadGraph(){
      // New Chart
      let element = document.getElementById('barGraph')

      console.log(element)

      let chart = am4core.create(element, am4charts.XYChart);

      chart.paddingRight = 20;

      // Add data
      chart.data = this.$store.getters["sites/getSiteCosts"]


      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "site";
      categoryAxis.title.text = "Sites";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Site Costs";

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "cost";
      series.dataFields.categoryX = "site";
      series.name = "Costs";
      series.columns.template.tooltipText = "Series: {name}\Site: {categoryX}\nValue: {valueY}";
      series.columns.template.fill = am4core.color("#104547");

      this.chart = chart;
    },
    loadFuelConsumption() {
      var d = new Date(this.selectedDate);

      let resFleetFuelSummary = this.$store.dispatch(
        "fuelConsumption/loadSummary",
        { type: "fleet", month: d.toISOString().slice(0, 10) }
      );
      let resMachineFuelSummary = this.$store.dispatch(
        "fuelConsumption/loadSummary",
        { type: "machine", month: d.toISOString().slice(0, 10) }
      );
      let resUserFuelSummary = this.$store.dispatch(
        "fuelConsumption/loadSummary",
        { type: "users", month: d.toISOString().slice(0, 10) }
      );
      Promise.all([
        resFleetFuelSummary,
        resMachineFuelSummary,
        resUserFuelSummary
      ]).then(() => {
        this.loadFuelGraph("chart-fuel");
      });
    },
    getUsersPercentage(type) {
      let users = this.$store.state.users.users;
      return (this.getUsersByType(type).length / users.length) * 100;
    },
    loadFuelGraph(canvas) {
      let _this = this;
      var getData = function(type) {
        if (type === "car") {
          return _this.$store.getters["fuelConsumption/getSummary"].fleet;
        } else if (type === "machine") {
          return _this.$store.getters["fuelConsumption/getSummary"].machine;
        } else {
          return _this.$store.getters["fuelConsumption/getSummary"].user;
        }
      };
      var config = {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [getData("car"), getData("machine"), getData("users")],
              backgroundColor: ["#FF5F58", "#FA9917", "#2AC940"],
              label: "Dataset 1",
              borderWidth: [2, 2, 2]
            }
          ],
          labels: ["Cars", "Machines", "Users"]
        },
        options: {
          responsive: true,
          legend: {
            position: "bottom"
          },
          title: {
            display: false,
            text: "Chart.js Doughnut Chart"
          },
          animation: {
            animateScale: true,
            animateRotate: true
          },
          circumference: 1.5 * Math.PI,
          cutoutPercentage: 60
        }
      };

      var ctx = document.getElementById(canvas).getContext("2d");
      document.getElementById(canvas).height = 70;
      document.getElementById(canvas).width = 100;
      new Chart(ctx, config);


      this.loadGraph();
    },
    loadDoughnutGraph(canvas) {
      /**
       * this is the for the dognut chart
       */
      let _this = this;
      var getData = function(canvas, type) {
        if (canvas === "chart-vechicles") {
          if (type === "broken") {
            return _this.$store.getters["fleets/brokenDownVehicles"].length;
          } else if (type === "assigned") {
            return _this.$store.getters["fleets/assignedVehicles"].length;
          } else {
            return _this.$store.getters["fleets/availableVehicles"].length;
          }
        } else if (canvas === "chart-machines") {
          if (type === "broken") {
            return _this.$store.getters["machinery/brokenDown"].length;
          } else if (type === "assigned") {
            return _this.$store.getters["machinery/assigned"].length;
          } else {
            return _this.$store.getters["machinery/available"].length;
          }
        } else {
          if (type === "broken") {
            return _this.$store.getters["tools/brokenDown"].length;
          } else if (type === "assigned") {
            return _this.$store.getters["tools/assigned"].length;
          } else {
            return _this.$store.getters["tools/available"].length;
          }
        }
      };

      var config2 = {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [
                getData(canvas, "broken"),
                getData(canvas, "assigned"),
                getData(canvas, "available")
              ],
              backgroundColor: ["#FF5F58", "#FA9917", "#2AC940"],
              label: "Dataset 1",
              borderWidth: [2, 2, 2]
            }
          ],
          labels: ["Broken Down", "Assigned", "Available"]
        },
        options: {
          responsive: true,
          legend: {
            position: "bottom"
          },
          title: {
            display: false,
            text: "Chart.js Doughnut Chart"
          },
          animation: {
            animateScale: true,
            animateRotate: true
          },
          circumference: 1.5 * Math.PI,
          cutoutPercentage: 60
        }
      };

      console.log(canvas);
      var ctx2 = document.getElementById(canvas).getContext("2d");
      document.getElementById(canvas).height = 70;
      document.getElementById(canvas).width = 100;
      new Chart(ctx2, config2); // eslint-disable-line no-new
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>
<style>
.chart {
  width: 100%;
  height: 400px;
}

.chart-time-group {
  float: right;
}

.chart-time-group div {
  float: left;
  width: 150px;
  border-radius: 6px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: 10px;
  text-align: center;
  margin-right: 5px;
  cursor: pointer;
}

.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
.comp-title {
  padding: 20px 15px 30px;
  margin-bottom: 32px;
  border-bottom: 1px solid #e0e0e0;
}
.comp-title h3 {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  margin: 0;
}
.content > .row {
  padding: 0 30px;
}
.box {
  height: 100%;
  padding: 18px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: none;
}
.box .container {
  width: 100%;
}
.box .container .nav-tabs {
  background: transparent;
  border-bottom: 1px solid #e0e0e0;
}
.box .container .nav-tabs li > a {
  color: #bdbdbd;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 13px;
  padding: 0 15px;
}

.box .container .nav-tabs li > a.active {
  border-bottom: 3px solid #256ae1;
  background: transparent;
  border-top: none;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 13px;
}

.box > h4:nth-child(1) {
  color: #172233;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 13px;
}

.box h4 select {
  padding: 10px 18px;
  width: 150px;
  color: #256ae1;
  background-color: #fff;
  border: 1px solid #f2f2f2;
}

.box h4 select option {
  padding: 10px;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
}

.box .title-select {
  height: 35px;
}

.box .title-select span {
  line-height: 3em;
}

.skills {
  text-align: right;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 10px;
  padding: 6px 8px;
  background-color: #265499;
}
.skills.empty {
  padding-left: 0;
  padding-right: 1px;
  min-height: 22px;
}

.user-list {
  padding: 0;
  width: 100%;
}

.user-list p {
  color: #172233;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 9px;
  margin: 0;
  padding: 10px 15px 10px 5px;
  border-left: 1px solid #cdd9ea;
}

.project-status.box h4 {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 13px;
}

.project-status.box select {
  padding: 10px 18px;
  width: 100%;
  color: #256ae1;
  background-color: #fff;
  border: 1px solid #f2f2f2;
}

.project-status.box select option {
  padding: 10px;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
}

.project-status.box h3 {
  font-family: "Montserrat", sans-serif;
  color: #256ae1;
  text-align: center;
  font-size: 23px;
  font-weight: 700;
  line-height: 28px;
}

.project-status.box ul {
  list-style: none;
  padding: 0;
  height: 210px;
  margin: 0;
  overflow: auto;
}

.project-status.box ul li {
  color: black;
  list-style-type: none;
}
.project-status.box ul li::before {
  content: "\2022";
  color: #ed6a5f;
  padding-right: 0.3em;
  font-size: 40px;
  line-height: 1em;
}

.project-status.box ul li p {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 13px;
  display: inline-block;
  margin: 0px;
}

.project-status.box ul li .site-percentage {
  margin-bottom: 15px;
  line-height: 1.5em;
}

.project-status.box ul li p span {
  color: #bdbdbd;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 500;
}

.map {
  width: 100%;
  height: 195px;
}

.project-locations .box {
  padding-left: 0;
  padding-right: 0;
}

.project-locations .box h4 {
  padding: 0 18px;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 13px;
}

.project-locations .box ul {
  margin-bottom: 0;
  padding: 0 18px;
  margin-top: 15px;
}

.project-locations .box ul li {
  display: inline-block;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 11px;
  margin-right: 15px;
}

.project-locations .box ul li::before {
  content: "\2022";
  color: #ed6a5f;
  padding-right: 0.3em;
  font-size: 40px;
  line-height: 0.4em;
  position: absolute;
}

.project-locations .box ul li span {
  margin-left: 20px;
}

.project-status.box .site-percentage span {
  font-size: 20px;
  color: #6f6f6f;
  line-height: 1.3em;
}
</style>
