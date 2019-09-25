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
        <div class="table-alt">
          <h3><i class="fa fa-wrench"></i> Tools</h3>

          <table>
            <thead>
              <tr v-if="brokenDown.length > 0">
                <td>Tool</td>
                <td>Serial Number</td>
                <td>Type</td>
                <td>status</td>
                <td>Creation Date</td>
                <td v-if="$store.state.user_role != 'management'"></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in brokenDown" :key="tool.id">
                <td>{{ tool.name }}</td>
                <td>{{ tool.humanUuid }}</td>
                <td>{{ tool.type.type }}</td>
                <td><span v-bind:class="tool.status.color">{{ tool.status.name }}</span></td>
                <td>{{ tool.created | moment("dddd, MMMM Do YYYY") }}</td>
                <td v-if="$store.state.user_role != 'management'" class="text-right">
                  <a class="custom-btn text-white" v-on:click="showForm();fixTool(tool)" style="padding-top: 5px; padding-bottom: 5px;">
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
    </div>

    <!-- Modal -->
    <modal name="modal" class="custom-modal" height="auto" :scrollable="true">
      <div class="row modal-header">
        <div class="col-md-12">
          <h5 class="modal-title" id="exampleModalLabel">Fix Vechicle</h5>
          <button type="button" class="close" v-on:click="hideForm()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <form v-on:submit.prevent="saveFix"> 
            <div class="modal-body">
              <div>
                <mdc-textfield v-model="fault.reason" label="Fault Reason" multiline fullwidth required outline/>
                <mdc-textfield v-model="fault.cost" label="Total Cost" type="number" required outline/>
                <p class="note">
                  <span>Note:</span> Make sure the details above are accurate and correct.
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="mdc-button mdc-button--raised" >Save</button>
            </div>
          </form>
        </div>
      </div>
    </modal>
  </section>
</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
 
export default {
  data(router) {
    return {
      fault: {
        reason: '',
        cost: '',
        type: 'fault_fix',
        fleet: '',
        fleet_type: 'tool',
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
    ...mapGetters('tools', ['brokenDown'])
  },
  methods: {
    showForm() {
      this.$modal.show("modal");
    },
    hideForm() {
      this.$modal.hide("modal");
    },
    saveFix() {
      const { fault } = this;
      this.$modal.hide("modal");
      fault.fleet = fault.fleet.id
      this.$store.dispatch("tools/saveFix", fault);
    },
    selectTool(tool){
      this.fault.tool = tool
      this.$store.commit("tools/SET_HISTORY", []);
      this.$store.dispatch("tools/getHistory", tool.id);
    },
    fixTool(tool){
      this.fault.fleet = tool
    },
    resetFix(){
      this.tool = {
        reason: '',
        user: (JSON.parse(window.localStorage.getItem('user'))).user_id,
        cost: '',
        fleet: '',
        type: 'fault_fix',
        fleet_type: 'tool',
      }
    }
  }
};
</script>


