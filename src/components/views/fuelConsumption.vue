<template>
<div>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="container search-wrapper">
      <div class="row search">
        <div class="input">
          <form method="get" action="/search">
            <input name="q" type="text" size="40" placeholder="Search..." v-model="filter">
          </form>
          <span class="date-picker">
            <date-range-picker 
                      :startDate="startDate"
                      :endDate="endDate"
                      @update="updateValues"
                      :locale-data="locale"
                      :opens="opens"  
                      v-model="dateRange"     
                  >
              </date-range-picker>
          </span>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="tab-layout">
            <ul class="nav nav-tabs" role="tablist" data-tabs="tabs">
              <li><a class="active" href="#fleets" data-toggle="tab" role="tab" v-on:click="loadFleetFuel()">Fleets</a></li>
              <li><a href="#machines" data-toggle="tab" role="tab" v-on:click="loadMachineFuel()">Machines</a></li>
              <li><a href="#users" data-toggle="tab" role="tab" v-on:click="loadUserFuel()">Users</a></li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade show active" id="fleets">
                <div class="table-alt">
                  <h3>
                    <i class="fa fa-wrench"></i> Fuel consumption 
                  </h3>
                  <datatable :columns="table_columns" :data="fuelRequests" :filter-by="filter">
                    <template scope="{ row }">
                        <tr>
                            <td>{{ row.humanUuid }}</td>
                            <td>{{ row.fuel_amount }}</td>
                            <td>{{ row.received_fuel_in_litres }}</td>
                            <td>{{ row.status }}</td>
                        </tr>
                    </template>
                  </datatable>
                </div>

                <div class="container pagination-container">
                    <div class="form-inline">
                        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
                    </div>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="machines">
                <div class="table-alt">
                  <h3>
                    <i class="fa fa-wrench"></i> Fuel consumption 
                  </h3>
                  <datatable :columns="table_columns" :data="fuelRequests" :filter-by="filter">
                    <template scope="{ row }">
                        <tr>
                            <td>{{ row.humanUuid }}</td>
                            <td>{{ row.fuel_amount }}</td>
                            <td>{{ row.received_fuel_in_litres }}</td>
                            <td>{{ row.status }}</td>
                        </tr>
                    </template>
                  </datatable>
                </div>

                <div class="container pagination-container">
                    <div class="form-inline">
                        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
                    </div>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="users">
                <div class="table-alt">
                  <h3>
                    <i class="fa fa-wrench"></i> Fuel consumption 
                  </h3>
                  <datatable :columns="table_columns" :data="fuelRequests" :filter-by="filter">
                    <template scope="{ row }">
                        <tr>
                            <td>{{ row.humanUuid }}</td>
                            <td>{{ row.fuel_amount }}</td>
                            <td>{{ row.received_fuel_in_litres }}</td>
                            <td>{{ row.status }}</td>
                        </tr>
                    </template>
                  </datatable>
                </div>

                <div class="container pagination-container">
                    <div class="form-inline">
                        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  

  </section>
</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'

export default {
  components: { DateRangePicker },
  data(router) {
    return {
      currentPage: "fleet",
      filter: '',
      table_columns: [
          {label: 'HumanUuid', field: 'humanUuid'},
          {label: 'Amount', field: 'fuel_amount'},
          {label: 'Quantity', field: 'received_fuel_in_litres'},
          {label: 'Status', field: 'status'}
      ],
      rows: window.rows,
      page: 1,
      per_page: 10,

      startDate: '2017-09-05',
      endDate: '2017-09-15',
      opens: "center",//which way the picker opens, default "center", can be "left"/"right"
      dateRange: {
        startDate: '2017-09-10',
        endDate: '2017-9-20',
      },
      locale: {
          direction: 'ltr', //direction of text
          format: 'DD-MM-YYYY', //fomart of the dates displayed
          separator: ' - ', //separator between the two ranges
          applyLabel: 'Apply',
          cancelLabel: 'Cancel',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
          monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
          firstDay: 1, //ISO first day of week - see moment documenations for details
          showWeekNumbers: true //show week numbers on each row of the calendar
      },
      ranges: { //default value for ranges object (if you set this to false ranges will no be rendered)
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'This month': [moment().startOf('month'), moment().endOf('month')],
          'This year': [moment().startOf('year'), moment().endOf('year')],
          'Last week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
          'Last month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("fuelConsumption/loadFuelRequests", {page: this.currentPage, start: this.startDate, end: this.endDate});
  },
  computed: {
    ...mapState({
      fuelRequests: state => state.fuelConsumption.fuelRequests
    })
  },
  methods: {
    loadFleetFuel(){
      this.currentPage = "fleet"
      this.$store.dispatch("fuelConsumption/loadFuelRequests", {page: this.currentPage, start: this.startDate, end: this.endDate});
    },
    loadMachineFuel(){
      this.currentPage = "machine"
      this.$store.dispatch("fuelConsumption/loadFuelRequests", {page: this.currentPage, start: this.startDate, end: this.endDate});
    },
    loadUserFuel(){
      this.currentPage = "user"
      this.$store.dispatch("fuelConsumption/loadFuelRequests", {page: this.currentPage, start: this.startDate, end: this.endDate});
    },
    updateValues (values) {
      this.startDate = values.startDate.toISOString().slice(0, 10)
      this.endDate = values.endDate.toISOString().slice(0, 10)

      this.$store.dispatch("fuelConsumption/loadFuelRequests", {page: this.currentPage, start: this.startDate, end: this.endDate});
    }
  }
};
</script>


