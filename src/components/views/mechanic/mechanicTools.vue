<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>Faulty Tools</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <td><span class="dot"></span></td>
              <td>Tool</td>
              <td>Serial Number</td>
              <td>Type</td>
              <td>status</td>
              <td>Creation Date</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tool in brokenDown" :key="tool.id">
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>{{ tool.name }}</td>
              <td>{{ tool.humanUuid }}</td>
              <td>{{ tool.type.type }}</td>
              <td><span v-bind:class="tool.status.color">{{ tool.status.name }}</span></td>
              <td>{{ tool.created | moment("dddd, MMMM Do YYYY") }}</td>
              <td class="text-right">
                <a class="custom-btn text-white" data-toggle="modal" data-target="#showHistory" v-on:click="selectTool(tool)" style="padding-top: 5px; padding-bottom: 5px;">
                  Fault history</a>  
                <a class="custom-btn text-white" data-toggle="modal" data-target="#FixTool" v-on:click="fixTool(tool)" style="padding-top: 5px; padding-bottom: 5px;">
                  Fix</a>
              </td>
            </tr>
            <tr v-if="brokenDown.length <= 0">
              <td colspan="7" class="text-center">No tools Yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="FixTool" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Fix Tool</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Fault Reason</label>
                <textarea rows="10" type="text" class="form-control" v-model="fault.reason"></textarea>
              </div>
              <div class="form-group">
                <label>Total Cost</label>
                <input type="number" class="form-control" v-model="fault.cost"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveFix()" data-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="showHistory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ fault.tool.name }} history
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="detailBox">
              <div class="actionBox">
                  <ul class="commentList">
                      <li v-for="history in faultHistory" :key="history.id">
                          <div class="commentText">
                              <p>Total cost: <b>{{ history.cost | formatNumber }}</b></p>
                              <p class="">{{ history.reason }}</p> <span class="date sub-text">on {{ history.created | moment("dddd, MMMM Do YYYY") }}</span>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>


  </section>
</div>
</template>

<script>
import { select } from "../../mixins/select";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
 
export default {
  mixins: [select],
  data(router) {
    return {
      fault: {
        tool: '',
        reason: '',
        cost: '',
        user: (JSON.parse(window.localStorage.getItem('user'))).user_id
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("tools/loadTools");
  },
  computed: {
    ...mapState('tools',["tool_types"]),
    ...mapGetters('tools', ['brokenDown', 'faultHistory'])
  },
  methods: {
    saveFix() {
      const { fault } = this;
      this.$store.dispatch("tools/saveFix", fault);
    },
    selectTool(tool){
      this.fault.tool = tool
      this.$store.commit("tools/SET_HISTORY", []);
      this.$store.dispatch("tools/getHistory", tool.id);
    },
    fixTool(tool){
      this.fault.tool = tool
    },
    resetFix(){
      this.tool = {
        tool: '',
        reason: '',
        user: (JSON.parse(window.localStorage.getItem('user'))).user_id,
        cost: ''
      }
    }
  }
};
</script>

<style>
</style>


