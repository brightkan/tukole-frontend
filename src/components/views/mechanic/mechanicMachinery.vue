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
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="machine in brokenDown" :key="machine.id">
                <td>{{ machine.name }}</td>
                <td>{{ machine.humanUuid }}</td>
                <td><span v-bind:class="machine.status.color">{{ machine.status.name.replace('_', ' ') }}</span></td>
                <td>{{ machine.created | moment("dddd, MMMM Do YYYY") }}</td>
                <td class="text-right">
                  <a class="custom-btn text-white" data-toggle="modal" data-target="#FixMachine" v-on:click="fixMachine(machine)" style="padding-top: 5px; padding-bottom: 5px;">
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
    <div class="modal fade" id="FixMachine" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Fix Machine</h5>
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
    saveFix() {
      const { fault } = this;
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

<style>
</style>


