<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>Kampala Renovation project</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="pip-box">
          <h4>Project Implementation Plan</h4>

          <ul class="header">
            <li>Timeline</li>
          </ul>

          <table class="table">
            <thead>
              <tr>
                <td>Tasks</td>
                <td>Week 1</td>
                <td>Week 2</td>
                <td>Week 3</td>
                <td>Week 4</td>
                <td>Week 5</td>
                <td>Week 6</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1. Identify Personell</td>
                <td colspan="6">
                  <span style="width: 35%; background-color: #00C9FF; margin-left: 0;"></span>
                </td>
              </tr>
              <tr>
                <td>2. Identify Project Ma...</td>
                <td colspan="6">
                  <span style="width: 10%; background-color: #F36; margin-left: 0%;"></span>
                </td>
              </tr>
              <tr>
                <td>3. Schedule Meetings</td>
                <td colspan="6">
                  <span style="width: 50%; background-color: #39F; margin-left: 10%;"></span>
                </td>
              </tr>
              <tr>
                <td>4. Budget Costing</td>
                <td colspan="6">
                  <span style="width: 40%; background-color: #F3CA3E; margin-left: 20%;"></span>
                </td>
              </tr>
              <tr>
                <td>4. Budget Costing</td>
                <td colspan="6">
                  <span style="width: 50%; background-color: #2AC940; margin-left: 20%;"></span>
                </td>
              </tr>
              <tr>
                <td>5. Surveyor Report</td>
                <td colspan="6">
                  <span style="width: 50%; background-color: #4F4F4F; margin-left: 50%;"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  created() {},
  mounted() {
    this.$emit("customEventForValChange", this.$route.path);
  }
};
</script>

<style>
.pip-box {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  padding: 27px 0;
}
.pip-box h4 {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin: 0 24px;
  margin-bottom: 27px;
}
.pip-box ul.header {
  list-style: none;
  padding: 0;
  border-bottom: 2px solid #e0e0e0;
  margin: 0;
}
.pip-box ul.header li {
  display: inline-block;
  padding: 9px 34px;
  text-align: center;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  border-bottom: 4px solid #256ae1;
  background-color: #f5f6f7;
}
.pip-box table thead {
  background-color: #f9f9f9;
}
.pip-box .table tbody tr {
  border: none;
}
.pip-box table thead td {
  padding: 10px 0;
  text-align: center;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
}
.pip-box table thead td:nth-child(1) {
  color: #333;
  text-align: left;
  padding: 10px 25px;
}
.pip-box table tbody td:nth-child(1) {
  color: #333;
  text-align: left;
  padding: 10px 25px;
}
.pip-box table tbody td:nth-child(2) {
  padding: 10px 5px 5px;
}
.pip-box table tbody td span {
  height: 16px;
  display: inline-block;
}
</style>


