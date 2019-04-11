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
            <ul class="nav nav-tabs" role="tablist" data-tabs="tabs" style="margin-bottom: 20px">
              <li><a class="active" href="#before" data-toggle="tab" role="tab">Quality Checks</a></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade show active" id="before">
                <div class="row">
                  <div class="col-md-12">
                    <div class="table-alt" style="padding: 0; box-shadow: none">
                    <table class="table">
                      <thead>
                        <tr>
                          <td>Title</td>
                          <td>Description</td>
                          <td>Affected teams</td>
                          <td>Priority</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="qualityCheck in qualityChecks" :key="qualityCheck.id" > 
                          <td>{{ qualityCheck.title }}</td>
                          <td style="max-width: 300px">{{ qualityCheck.description }}</td>
                          <td v-if="!qualityCheck.appraisal">{{ qualityCheck.affected_teams }}</td>
                          <td v-if="!qualityCheck.appraisal">{{ qualityCheck.priority }}</td>
                          <td>
                            <span v-if="qualityCheck.status == 'fixed'">Fixed</span>
                            <button v-if="(qualityCheck.status == 'pending' || qualityCheck.status == null) && !qualityCheck.appraisal" class="mark-read" v-on:click="editQuality(qualityCheck)">Mark as fixed</button>
                          </td>
                        </tr>
                        <tr v-if="qualityChecks.length <= 0">
                          <td colspan="6" class="text-center">No Qauality checks Yet</td>
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
    this.$store.dispatch("qualityChecks/loadQualityChecks", window.localStorage.getItem("selectsite"));
  },
  computed: {
    ...mapState({
      site: state => state.sites.site,
      qualityChecks: state => state.qualityChecks.qualityChecks,
    }),
  },
  methods: {
    editQuality(qualityCheck){
      if (confirm(`Are you sure its fixed`)) {
        qualityCheck.status = 'fixed'
        this.$store.dispatch("qualityChecks/updateQualityCheck", qualityCheck);
      }
    }
  }
};
</script>


