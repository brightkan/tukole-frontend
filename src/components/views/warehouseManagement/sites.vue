<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>Sites</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-4 site" v-for="site in getSites" :key="site.id">
        <a v-on:click="selectSite(site)">
          <div class="project-card" v-bind:class="site.id == selectedSite ? 'active' : ''">
          <h3>{{ site.site_name }}</h3>
        </div>
        </a>        
      </div>
    </div>
    <div v-if="sites.length <= 0" class="row empty-site-list">
      <h3 class="text-center">NO SITES YET</h3>
    </div>

  </section>
</template>

<script>
import { select } from "../../mixins/select";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import moment from 'moment'

export default {
  mixins: [select],
  data(router) {
    return {
      selectedSite: window.localStorage.getItem("selectsite"),
      editMode: false
    };
  },
  mounted() {
    this.$store.dispatch("sites/loadSites", window.localStorage.getItem("workspace"));
  },
  computed: {
    ...mapState('sites',["sites"]),
    ...mapGetters('sites', ['getSites'])
  },
  methods: {
    reformateDate(date) {
      return moment(date).format('MMM Do YYYY');
    },
    selectSite(site){
      this.$store.commit('warehouse/SET_WAREHOUSES', [])
      this.$router.push('warehouse/'+site.id)
    }
  }
};
</script>

<style>
.empty-site-list{
  color: #c3c3c3;
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
}
.site{
  cursor: pointer;
}
.site .project-card.active{
  border: 1px solid #256ae1;
}
.comp-title button {
  width: 100%;
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

.project-card {
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
}
.project-card h3 {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
  padding: 0 0 30px;
  margin: 0;
}
.project-card .status {
  margin-left: -15px;
  margin-right: -15px;
}
.project-card .status div {
  margin-bottom: 15px;
}
.project-card .status span {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 10px;
}
.project-card .status img {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14);
}
.project-card ._timeline {
  margin-left: -15px;
  margin-right: -15px;
}
.project-card ._timeline span {
  color: #828282;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 7px;
}
.project-card ._timeline p {
  color: #000;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  margin-bottom: 0;
  margin-top: 5px;
}
.project-card ._timeline div:nth-child(1),
.project-card .status div:nth-child(1) {
  padding-left: 15px;
  padding-right: 5px;
}
.project-card ._timeline div:nth-child(2),
 .project-card .status div:nth-child(2){
  padding-left: 5px;
  padding-right: 5px;
}
.project-card ._timeline div:nth-child(3),
.project-card .status div:nth-child(3) {
  padding-left: 5px;
  padding-right: 15px;
}

#container {
  margin: 20px;
  width: 200px;
  height: 200px;
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
.modal-body > .row {
  padding: 0 25px;
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
.modal-body form {
  padding: 36px 25px;
  padding-bottom: 0;
}
.modal-body form .form-control {
  background-color: #f0f0f0;
  border: none;
}
.modal-body form label {
  color: #828282;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
}
.modal-footer button:nth-child(1) {
  box-sizing: border-box;
  width: 115px;
  border: 1px solid #256ae1;
  background-color: #fff;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  padding: 10px 40px;
}
.modal-footer button:nth-child(2) {
  box-sizing: border-box;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  padding: 10px 40px;
  background-color: #256ae1;
}
</style>


