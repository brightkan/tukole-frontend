<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Machinery</h3>
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
          Add Machinery
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
              <td>Mavhinary</td>
              <td>Serial Number</td>
              <td>Type</td>
              <td>status</td>
              <td>Creation Date</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>Catapiller Multrix</td>
              <td>TUK-CAT-1002</td>
              <td>Grader</td>
              <td><span class="green">Available</span> <i class="pull-right fa fa-ellipsis-h"></i></td>
              <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
            </tr>
            <tr>
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>Catapiller Multrix</td>
              <td>TUK-CAT-1002</td>
              <td>Grader</td>
              <td><span class="red">Broken Down</span> <i class="pull-right fa fa-ellipsis-h"></i></td>
              <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
            </tr>
            <tr>
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>Catapiller Multrix</td>
              <td>TUK-CAT-1002</td>
              <td>Grader</td>
              <td><span class="orange">ASsigned</span> <i class="pull-right fa fa-ellipsis-h"></i></td>
              <td>12. 08. 2018 <i class="pull-right fa fa-ellipsis-v"></i></td>
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
            <h5 class="modal-title" id="exampleModalLabel">Add Machinery</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="upload-image"></div>
              </div>
              <div class="col-md-6 text-center">
                <p class="upload-img-text">Upload Thumbnail</p>
                <button class="custom-btn">Select Image</button>
              </div>
            </div>

            <form>
              <div class="form-group">
                <label>Machinery Name</label>
                <input type="text" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Type</label>
                <input type="text" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Status</label>
                <input type="text" class="form-control"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary">Add Machinery</button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { select } from "../../mixins/select";

export default {
  mixins: [select],
  created() {},
  mounted() {
    this.$emit("customEventForValChange", this.$route.path);
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


