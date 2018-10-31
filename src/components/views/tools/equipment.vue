<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Machines</h3>
      </div>

      <div class="comp-title col-md-3">
        <label id="img_category_label" class="field" for="img_category" data-value="">
          <span>Status</span>
          <div id="img_category" class="psuedo_select" name="img_category">
            <span class="selected"></span>
            <ul id="img_category_options" class="options">
              <li class="option" data-value="opt_1">Avialable</li>
              <li class="option" data-value="opt_2">Broken Down</li>
              <li class="option" data-value="opt_2">ASsigned</li>
            </ul>
          </div>
        </label>
      </div>

      <div class="comp-title col-md-5">
        <form method="get" action="/search" class="fleet_search">
          <input name="q" type="text" size="40" placeholder="Search..." />
        </form>
      </div>

      <div class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addMachinery">
          Add Machine
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <td><span class="dot"></span></td>
              <td>Machine</td>
              <td>Serial Number</td>
              <td>Type</td>
              <td>status</td>
              <td>Creation Date</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="machine in machines" :key="machine.id">
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>{{ machine.name }}</td>
              <td>{{ machine.humanUuid }}</td>
              <td>Grader</td>
              <td><span v-bind:class="machine.status.color">{{ machine.status.name }}</span> <i class="pull-right fa fa-ellipsis-h"></i></td>
              <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
            </tr>
            <tr v-if="machines.length <= 0">
              <td colspan="6" class="text-center">No Machines Yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addMachinery" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Machine</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Machine Name</label>
                <input type="text" class="form-control" v-model="machine.name"/>
              </div>
              <div class="form-group">
                <label>Serial number</label>
                <input type="text" class="form-control"  v-model="machine.humanUuid"/>
              </div>
              <div class="form-group">
                <label>Status</label>
                <select class="form-control" v-model="machine.status">
                  <option v-for="status in statuses" v-bind:value="status.name" :key="status.id">
                    {{ status.name }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveMachine" data-dismiss="modal">
              Add Machine
            </button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { select } from "../../mixins/select";
import { mapState } from "vuex";

export default {
  mixins: [select],
  data(router) {
    return {
      machine: {
        name: '',
        uuid: 'null',
        humanUuid: '',
        status: '',
        workspace: window.localStorage.getItem("workspace")
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("machinery/loadMachines");
  },
  computed: {
    ...mapState({
      machines: state => state.machinery.machines,
      statuses: state => state.statuses
    })
  },
  methods: {
    saveMachine() {
      const { machine } = this;
      this.$store.dispatch("machinery/addMachine", machine);
    }
  }
};
</script>

<style>
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


