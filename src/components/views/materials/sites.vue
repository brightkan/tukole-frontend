<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row"  v-if="this.$route.meta.type == 'Materials'">
      <div class="comp-title col-md-12">
        <h3>Select sites</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row"  v-if="this.$route.meta.type == 'Materials'">
      <div class="col-md-4 site" v-for="site in getSites" :key="site.id">
        <a v-on:click="selectSite(site)">
          <div class="project-card" v-bind:class="site.id == selectedSite ? 'active' : ''">
            <div class="site-bg" v-bind:style="{ backgroundImage: 'url(\'https://www.soliton.co.ke/img/capacity.JPG\')'}">
              <h3>
                {{ site.site_name }}
              </h3>
            </div>
          </div>
        </a>        
      </div>
    </div>
    <div v-if="sites.length <= 0 && this.$route.meta.type == 'Materials'" class="row empty-site-list">
      <h3 class="text-center">NO SITES YET</h3>
    </div>

    <router-view></router-view>
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
/* .modal-body > .row {
  padding: 0 25px;
} */
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
/* .modal-body form {
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
} */
/* .modal-footer button:nth-child(1) {
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
} */
</style>


