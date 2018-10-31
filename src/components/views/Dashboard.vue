<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      
    </div>
  </section>
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
          <h4>Users</h4>
          <div class="container user-list">
            <div class="skills" v-bind:style="{ width: '80%' }">90</div>
            <p>ISP</p>
            <div class="skills" v-bind:style="{ width: '85%' }">90</div>
            <p>Drivers</p>
            <div class="skills" v-bind:style="{ width: '40%' }">90</div>
            <p>QSP</p>
            <div class="skills" v-bind:style="{ width: '90%' }">90</div>
            <p>0FC</p>
            <div class="skills" v-bind:style="{ width: '65%' }">90</div>
            <p>Supervisor</p>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="box">
          <h4 class="title-select">
            <span>Projects Cost</span>
            <select class="pull-right">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </h4>
          <div class="box-header with-border">
            <canvas id="trafficBar"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="box">
          <div class="container">
            <ul id="myTabs" class="nav nav-pills nav-justified" role="tablist" data-tabs="tabs">
              <li class="active">
                <a href="#Vechicles" data-toggle="tab">Vehicles</a></li>
              <li>
                <a href="#Machines" data-toggle="tab">Machines</a></li>
              <li>
                <a href="#Tools" data-toggle="tab">Tools</a></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade in active" id="Vechicles">
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

      <div class="col-md-3">
          <div class="box project-status">
            <h4>Projects Status</h4>

            <select>
              <option>Delayed</option>
              <option>On Time</option>
            </select>

            <h3>40</h3>

            <ul>
              <li>
                <p>
                  Kampala Fibre Cable extension <br>
                  <span>12 Oct 2018</span>
                </p>
              </li>

              <li>
                <p>
                  Soroti LTE extension <br>
                  <span>12 Nov 2018</span>
                </p>
              </li>

              <li>
                <p>
                  Mbale Fibre cabling <br>
                  <span>12 Jul 2018</span>
                </p>
              </li>

              <li>
                <p>
                  Soroti LTE extension <br>
                  <span>12 Nov 2018</span>
                </p>
              </li>

              <li>
                <p>
                  Mbale Fibre cabling <br>
                  <span>12 Jul 2018</span>
                </p>
              </li>
            </ul>
          </div>
      </div>

      <div class="col-md-5 project-locations">
        <div class="box">
          <h4>Current Project locations</h4>
          <div id="map" class="map"></div>
          <ul>
            <li><span>Kampala Fibre extension</span></li>
            <li><span>Railway repairs</span></li>
            <li><span>Road extension</span></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- /.row -->

  </section>
  <!-- /.content -->
</div>
</template>

<script>
import Chart from "chart.js";
import { mapGetters } from "vuex";

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
    //...mapGetters('fleets', ['availableVehicles', 'assignedVehicles', 'brokenDownVehicles'])
  },
  mounted() {
    let res = this.$store.dispatch("fleets/loadFleets");
    Promise .all([res]).then( ()=> {
      this.loadDoughnutGraph('chart-vechicles');
    });
    
    this.loadDoughnutGraph('chart-machines');
    this.loadDoughnutGraph('chart-tools');

    this.$nextTick(() => {
      var ctx = document.getElementById("trafficBar").getContext("2d");
      var config = {
        type: "bar",
        data: {
          labels: [
            "Project 1",
            "Project 2",
            "Project 3",
            "Project 4",
            "Project 5",
            "Project 6"
          ],
          datasets: [
            {
              label: "Estimated",
              backgroundColor: '#256AE1',
				      borderColor:'#256AE1',
				      borderWidth: 1,
              data: this.coPilotNumbers
            },
            {
              label: "Actual",
              backgroundColor: '#8BAEEA',
				      borderColor:'#8BAEEA',
				      borderWidth: 1,
              data: this.personalNumbers
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: "bottom",
            display: false
          },
          tooltips: {
            mode: "label",
            xPadding: 10,
            yPadding: 10,
            bodySpacing: 10
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Month"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value"
                }
              }
            ]
          }
        }
      };

      document.getElementById("trafficBar").height = 94;
      new Chart(ctx, config); // eslint-disable-line no-new

      var map = new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
      });
    });

    this.$emit("customEventForValChange", this.$route.path);
  },
  methods: {
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
        }else{
          return Math.round(Math.random() * 100);
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
  }
};
</script>
<style>
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
  padding: 18px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: none;
}

.box .container {
  width: 100%;
}

.box .container .nav-pills {
  background: transparent;
  border-bottom: 1px solid #e0e0e0;
}

.box .container .nav-pills li > a {
  color: #bdbdbd;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 13px;
}

.box .container .nav-pills li.active > a {
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
  max-height: 140px;
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
  line-height: 1.1em;
  position: absolute;
  bottom: 6px;
}

.project-locations .box ul li span {
  margin-left: 20px;
}
</style>
