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
      <div class="col-md-12">
        <div class="box project-status">
          <h4><span class="icon"><i class="fa fa-truck"></i></span> Project costs</h4>
          <div class="chart-time-group">
            <div>Annually</div>
            <div style="background-color: #d9d9d9; color: rgb(168, 168, 168)">Monthly</div>
          </div>
          <div class="chart-wrapper">
            <div class="chart" ref="chartdiv"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="box">
          <div class="container">
            <ul id="myTabs" class="nav nav-tabs" role="tablist" data-tabs="tabs">
              <li>
                <a class="active show" href="#Vechicles" data-toggle="tab">Vehicles</a></li>
              <li>
                <a href="#Machines" data-toggle="tab">Machines</a></li>
              <li>
                <a href="#Tools" data-toggle="tab">Tools</a></li>
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
        <div class="box">
          <h4>Users</h4>
          <div class="container user-list">
            <div class="skills" v-bind:style="{ width: getUsersPercentage('isp')+'%' }"
              v-bind:class="{ empty: getUsersPercentage('isp') == 0 }">
              {{ getUsersPercentage('isp') != 0 ? getUsersByType('isp').length : '' }}
            </div>
            <p>ISP</p>
            <div class="skills" v-bind:style="{ width: getUsersPercentage('driver')+'%' }"
              v-bind:class="{ empty: getUsersPercentage('driver') == 0 }">
              {{ getUsersPercentage('driver') != 0 ? getUsersByType('driver').length : '' }}
            </div>
            <p>Drivers</p>
            <div class="skills" v-bind:style="{ width: getUsersPercentage('surveyor')+'%' }"
              v-bind:class="{ empty: getUsersPercentage('surveyor') == 0 }">
              {{ getUsersPercentage('surveyor') != 0 ? getUsersByType('surveyor').length : '' }}
            </div>
            <p>SURVEYOR</p>
            <div class="skills" v-bind:style="{ width: getUsersPercentage('ofc')+'%' }"
              v-bind:class="{ empty: getUsersPercentage('ofc') == 0 }">
              {{ getUsersPercentage('ofc') != 0 ? getUsersByType('ofc').length : '' }}
            </div>
            <p>0FC</p>
            <div class="skills" v-bind:style="{ width: getUsersPercentage('project_manager')+'%' }"
              v-bind:class="{ empty: getUsersPercentage('project_manager') == 0 }">
              {{ getUsersPercentage('project_manager') != 0 ? getUsersByType('project_manager').length : '' }}
            </div>
            <p>Project Manager</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="box project-status">
          <h4>Material Status <small class="float-right text-muted">RUNNING OUT</small></h4>
          <ul>
            <li v-for="material in runningOut" :key="material.id">
              <p>
                {{ material.name }} <br>
                <span>{{ material.measurement }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- /.row -->

  </section>
  <!-- /.content -->
</template>

<script>
import Chart from "chart.js";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  data() {
    return {
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
    ...mapGetters('materials', ['runningOut']),
    getUsersByType() {
        return this.$store.getters['users/getUsersByType']
    }
  },
  mounted() {
    this.$store.dispatch("materials/loadMaterials");
    this.$store.dispatch("users/loadUsers", window.localStorage.getItem("workspace"));
    let resFleets = this.$store.dispatch("fleets/loadFleets");
    let resMachines = this.$store.dispatch("machinery/loadMachines");
    let resTools = this.$store.dispatch("tools/loadTools");
    Promise.all([resFleets, resMachines, resTools]).then( ()=> {
      this.loadDoughnutGraph('chart-vechicles');
      this.loadDoughnutGraph('chart-machines');
      this.loadDoughnutGraph('chart-tools');
    });

    this.$emit("customEventForValChange", this.$route.path);

    // New Chart
    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    chart.paddingRight = 20;

    // Add data
    chart.data = [{
      "year": "1930",
      "italy": 1,
      "germany": 5,
      "uk": 3
    }, {
      "year": "1934",
      "italy": 1,
      "germany": 2,
      "uk": 6
    }, {
      "year": "1938",
      "italy": 2,
      "germany": 3,
      "uk": 1
    }, {
      "year": "1950",
      "italy": 3,
      "germany": 4,
      "uk": 1
    }, {
      "year": "1954",
      "italy": 5,
      "germany": 1,
      "uk": 2
    }, {
      "year": "1958",
      "italy": 3,
      "germany": 2,
      "uk": 1
    }, {
      "year": "1962",
      "italy": 1,
      "germany": 2,
      "uk": 3
    }, {
      "year": "1966",
      "italy": 2,
      "germany": 1,
      "uk": 5
    }, {
      "year": "1970",
      "italy": 3,
      "germany": 5,
      "uk": 2
    }, {
      "year": "1974",
      "italy": 4,
      "germany": 3,
      "uk": 6
    }, {
      "year": "1978",
      "italy": 1,
      "germany": 2,
      "uk": 4
    }];

    // Create category axis
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.opposite = false;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //valueAxis.renderer.inversed = true;
    //valueAxis.title.text = "Place taken";
    //valueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "italy";
    series1.dataFields.categoryX = "year";
    series1.name = "Italy";
    series1.strokeWidth = 3;
    series1.bullets.push(new am4charts.CircleBullet());
    //series1.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";
    series1.legendSettings.valueText = "{valueY}";
    series1.visible  = false;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "germany";
    series2.dataFields.categoryX = "year";
    series2.name = 'Germany';
    series2.strokeWidth = 3;
    series2.bullets.push(new am4charts.CircleBullet());
    //series2.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";
    series2.legendSettings.valueText = "{valueY}";

    let series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "uk";
    series3.dataFields.categoryX = "year";
    series3.name = 'United Kingdom';
    series3.strokeWidth = 3;
    series3.bullets.push(new am4charts.CircleBullet());
    //series3.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";
    series3.legendSettings.valueText = "{valueY}";

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    // Add legend
    // chart.legend = new am4charts.Legend();

    this.chart = chart;
  },
  methods: {
    getUsersPercentage(type){
      let users = this.$store.state.users.users
      return ( this.getUsersByType(type).length / users.length ) * 100   
    },
    loadDoughnutGraph(canvas){
      /**
       * this is the for the dognut chart
       */
      let _this = this;
      var getData = function(canvas, type) {
        if(canvas === 'chart-vechicles'){
          if(type === 'broken'){
            return _this.$store.getters['fleets/brokenDownVehicles'].length
          }else if(type === 'assigned'){
            return _this.$store.getters['fleets/assignedVehicles'].length
          }else {
            return _this.$store.getters['fleets/availableVehicles'].length
          }
        }else if(canvas === 'chart-machines') {
          if(type === 'broken'){
            return _this.$store.getters['machinery/brokenDown'].length
          }else if(type === 'assigned'){
            return _this.$store.getters['machinery/assigned'].length
          }else {
            return _this.$store.getters['machinery/available'].length
          }
        }else{
          if(type === 'broken'){
            return _this.$store.getters['tools/brokenDown'].length
          }else if(type === 'assigned'){
            return _this.$store.getters['tools/assigned'].length
          }else {
            return _this.$store.getters['tools/available'].length
          }
        }
      };

      var config2 = {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [
                getData(canvas, 'broken'),
                getData(canvas, 'assigned'),
                getData(canvas, 'available')
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
.chart{
  width: 100%;
  height: 400px;
}

.chart-time-group{
  float: right;
}

.chart-time-group div{
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
.skills.empty{
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
</style>
