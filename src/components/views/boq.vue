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
      <div class="boq-list">
        <h3>Bill of Quanties</h3>

        <table class="table">
          <thead>
            <tr>
              <td>Item</td>
              <td>Description</td>
              <td>Type</td>
              <td>Quantity</td>
              <td>Unit Cost</td>
              <td>Total Cost</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span>1.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
            <tr>
              <td><span>2.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
            <tr>
              <td><span>3.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
            <tr>
              <td><span>4.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
            <tr>
              <td><span>5.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
          </tbody>
        </table>

        <p>
          Total Project cost
          
          <span>
            USD 100,0000
          </span>
        </p>
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
.boq-list {
  padding: 36px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
}
.boq-list h3 {
  margin-top: 0;
}
.boq-list table tr {
  border-bottom: 1px solid #e0e0e0;
  border-top: none;
}
.boq-list thead tr td {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 15px 0;
}
.boq-list tbody tr td {
  color: #333;
  font-family: "Montserrat", sans-serif;
  padding: 15px 0;
  font-size: 12px;
  line-height: 15px;
}
.table tbody tr td span {
  /* color: #333; */
  font-size: 9px;
  line-height: 11px;
  /* padding: 0; */
  margin-right: 15px;
}
.boq-list > p {
  text-align: right;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin-top: 89px;
}
.boq-list > p span {
  background-color: #fff;
  border: 1px solid #256ae1;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 8px 13px;
  border-radius: 5px;
  margin-left: 15px;
}
.boq-list table tbody td span {
  color: #333;
  padding: 0;
  margin: 0;
  font-size: 12px;
  display: inline-block;
  width: 5%;
}
</style>


