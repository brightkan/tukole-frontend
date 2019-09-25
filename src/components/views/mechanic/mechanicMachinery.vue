<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>Faulty Machinery</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="table-alt">
          <h3><i class="fa fa-wrench"></i> Machines</h3>
          <table>
            <thead>
              <tr v-if="brokenDown.length > 0">
                <td>Machine</td>
                <td>Serial Number</td>
                <td>status</td>
                <td>Creation Date</td>
                <td v-if="$store.state.user_role != 'management'"></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="machine in brokenDown" :key="machine.id">
                <td>{{ machine.name }}</td>
                <td>{{ machine.humanUuid }}</td>
                <td><span v-bind:class="machine.status.color">{{ machine.status.name.replace('_', ' ') }}</span></td>
                <td>{{ machine.created | moment("dddd, MMMM Do YYYY") }}</td>
                <td v-if="$store.state.user_role != 'management'" class="text-right">
                  <a class="custom-btn text-white" v-on:click="showForm();fixMachine(machine)" style="padding-top: 5px; padding-bottom: 5px;">
                    Fix</a>
                </td>
              </tr>
              <tr v-if="brokenDown.length <= 0">
                <td colspan="7" class="text-center">No machines Yet</td>
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
        type: 'fault_fix',
        fleet: '',
        reason: '',
        cost: '',
        fleet_type: 'machinery',
        user: (JSON.parse(window.localStorage.getItem('user'))).user_id
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("machinery/loadMachines");
  },
  computed: {
    ...mapGetters('machinery', ['brokenDown', 'faultHistory'])
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
      this.$store.dispatch("machinery/saveFix", fault);
    },
    selectMachine(machine){
      this.fault.machine = machine
      this.$store.commit("machinery/SET_HISTORY", []);
      this.$store.dispatch("machinery/getHistory", machine.id);
    },
    fixMachine(machine){
      this.fault.fleet = machine
    },
    resetFix(){
      this.machine = {
        machine: '',
        reason: '',
        cost: '',
        fleet: '',
        fleet_type: 'machinery',
        user: (JSON.parse(window.localStorage.getItem('user'))).user_id
      }
    }
  }
};
</script>



