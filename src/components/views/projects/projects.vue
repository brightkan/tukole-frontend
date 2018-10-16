<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Sites</h3>
      </div>

      <div class="comp-title col-md-3">
        <label id="img_category_label" class="field" for="img_category" data-value="">
          <span>Status</span>
          <div id="img_category" class="psuedo_select" name="img_category">
            <span class="selected"></span>
            <ul id="img_category_options" class="options">
              <li class="option" data-value="opt_1">Newest</li>
              <li class="option" data-value="opt_2">Oldest</li>
              <li class="option" data-value="opt_2">Active</li>
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
          Add Site
        </button>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-3">
        <a href="overview">
          <div class="project-card">
          <h3>Kampala Renovation project</h3>
          <div class="row status">
            <div class="col-md-4">
              <img src="../../../assets/imgs/icons8-crane-96.png"/>
              <span>6000</span>
            </div>
            <div class="col-md-4">
              <img src="../../../assets/imgs/icons8-crane-96.png"/>
              <span>640</span>
            </div>
            <div class="col-md-4">
              <img src="../../../assets/imgs/Oval_2.png"/>
              <span>60%</span>
            </div>
          </div>
          <div class="row _timeline">
            <div class="col-md-4">
              <span>
                Start Date
              </span>
              <p>
                12.08.2018
              </p>
            </div>
            <div class="col-md-4">
              <span>
                End Date
              </span>
              <p>
                12.08.2018
              </p>
            </div>
            <div class="col-md-4">
              <span>
                Cost Estimate
              </span>
              <p>
                USD 500K
              </p>
            </div>
          </div>
        </div>
        </a>        
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addMachinery" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Project</h5>
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
            <button type="button" class="btn btn-primary">Add Site</button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { select } from "../../mixins/select";

// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

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

.project-card {
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
}
.project-card h3 {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 15px;
  margin-top: 0;
  margin-bottom: 40px;
}
.project-card .status {
  margin-left: -15px;
  margin-right: -15px;
}
.project-card .status div {
  text-align: center;
  margin-bottom: 5px;
}
.project-card .status span {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 10px;
}
.project-card .status img {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14);
}
.project-card ._timeline {
  margin-left: -15px;
  margin-right: -15px;
}
.project-card ._timeline span {
  color: #828282;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  line-height: 7px;
}
.project-card ._timeline p {
  color: #000;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 10px;
  margin-bottom: 0;
  margin-top: 5px;
}
.project-card ._timeline div:nth-child(1) {
  padding-left: 15px;
  padding-right: 5px;
}
.project-card ._timeline div:nth-child(2) {
  padding-left: 5px;
  padding-right: 5px;
}
.project-card ._timeline div:nth-child(3) {
  padding-left: 5px;
  padding-right: 15px;
}

#container {
  margin: 20px;
  width: 200px;
  height: 200px;
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


