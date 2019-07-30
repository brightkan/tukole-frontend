<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>{{ site.site_name }}</h3>
      </div>
      <div class="text-right col-md-6">
        <p>project gallery</p>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="tab-layout">
          <ul class="nav nav-tabs" role="tablist" data-tabs="tabs" style="margin-bottom: 20px">
            <li>
              <a class="active" href="#before" data-toggle="tab" role="tab">Before</a>
            </li>
            <li>
              <a href="#after" data-toggle="tab" role="tab">After</a>
            </li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade show active" id="before">
              <div class="row">
                <div class="col-md-4" v-for="image in getBeforeImages" :key="image.id">
                  <div class="gallery_image card">
                    <img v-bind:src="image.image">
                    <div class="row">
                      <div class="col-md-12 text-center">
                        <b>({{image.lat}}, {{ image.long}})</b><br>
                        {{ image.created | moment("dddd, MMMM Do YYYY") }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12" v-if="getBeforeImages.length <= 0">
                  <h3 class="text-muted text-center">No Images yet</h3>
                </div>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="after">
              <div class="row">
                <div class="col-md-4" v-for="image in getAfterImages" :key="image.id">
                  <div class="gallery_image card">
                    <img v-bind:src="image.image">
                    <div class="row">
                      <div class="col-md-12 text-center">
                        <b>({{image.lat}}, {{ image.long}})</b><br>
                        {{ image.created | moment("dddd, MMMM Do YYYY") }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12" v-if="getAfterImages.length <= 0">
                  <h3 class="text-muted text-center">No Images yet</h3>
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
import { mapGetters } from "vuex";

export default {
  created() {},
  mounted() {
    this.$store.dispatch(
      "sites/loadSiteImages",
      window.localStorage.getItem("selectsite")
    );
  },
  computed: {
    ...mapState({
      site: state => state.sites.site
    }),
    ...mapGetters("sites", ["getBeforeImages", "getAfterImages"])
  }
};
</script>

<style>
.gallery_image img {
  width: 100%;
  margin-bottom: 20px;
}
</style>


