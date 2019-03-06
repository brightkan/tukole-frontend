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
            <div class="site-bg" v-bind:style="{ backgroundImage: 'url('+site.site_image+')'}">
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
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import moment from 'moment'

export default {
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



