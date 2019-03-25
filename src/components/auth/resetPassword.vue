<template>
  <div class="row">
    <div class="auth-form container">
      <h3>Tukole</h3>
      <form>
        <div class="form-group">
          <label>Email</label>
          <input class="form-control" name="email" type="email" v-model="email">
        </div>

        <div class="form-group">
          <label>Confirm Email</label>
          <input class="form-control" name="email" type="email" v-model="c_email">
        </div>

        <button type="button" v-on:click="checkCreds()" v-bind:class="'btn btn-primary btn-lg ' + loading" 
          :disabled="loading == 'loading'">
          {{ loading ? 'Loading...' : 'Submit' }}
        </button>
      </form>
    </div>

    <div id="myCarousel" class="col-md-12 carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="first-slide" src="../../assets/imgs/construction.jpg" alt="First slide">
          <div class="overlay-effect h-100 w-100">
            <div class="container">
            <div class="carousel-caption text-left">
              <h1>Soliton Uganda</h1>
            </div>
          </div>
          </div>
        </div>
        <div class="carousel-item">
          <img class="second-slide" src="../../assets/imgs/dev_bg.jpg" alt="Second slide">
          <div class="overlay-effect h-100 w-100">
            <div class="container">
            <div class="carousel-caption text-left">
              <h1>Another example headline.</h1>
            </div>
          </div>
          </div>
        </div>
        <div class="carousel-item">
          <img class="third-slide" src="../../assets/imgs/industries.jpg" alt="Third slide">
          <div class="overlay-effect h-100 w-100">
            <div class="container">
            <div class="carousel-caption text-left">
              <h1>One more for good measure.</h1>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  name: "resetPassword",
  data(router) {
    return {
      loading: false,
      email: "",
      c_email: ""
    };
  },
  created() {
    window.localStorage.removeItem('token');
  },
  methods: {
    checkCreds() {
      const { c_email, email } = this;

      if(c_email != email){
        alert('email mismatch')
        return
      }

      this.toggleLoading();
      /* Making API call to authenticate a user */
      api
        .request("post", "users/reset/", { email })
        .then(response => {
          this.toggleLoading();
          var data = response.data;
          this.$router.push("/");
        })
        .catch(error => {
          this.toggleLoading();
        });
    },
    toggleLoading() {
      this.loading = this.loading === "" ? "loading" : "";
    },
  }
};
</script>


