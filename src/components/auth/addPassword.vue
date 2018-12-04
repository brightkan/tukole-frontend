<template>
  <div class="row">
    <div class="col-md-4">
      <div class="auth-form container">
        <h3>Tukole</h3>
        <form @submit.prevent="checkCreds">
          <div class="form-group">
            <label>Password</label>
            <input class="form-control" name="password" type="password" v-model="password">
          </div>

          <div class="form-group">
            <label>Confirm Password</label>
            <input class="form-control" name="password" type="password" v-model="c_password">
          </div>

          <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading" 
            :disabled="loading == 'loading'">
            {{ loading ? 'Loading...' : 'Submit' }}
          </button>
        </form>
      </div>
    </div>

    <div id="myCarousel" class="col-md-8 carousel slide" data-ride="carousel">
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
  name: "addPassword",
  data(router) {
    return {
      token: this.$route.params.id,
      loading: false,
      password: "",
      c_password: ""
    };
  },
  methods: {
    checkCreds() {
      const { c_password, password, token } = this;

      if(c_password != password){
        alert('Password mismatch')
        return
      }

      this.toggleLoading();
      /* Making API call to authenticate a user */
      api
        .request("post", "users/accept/", { password, token })
        .then(response => {
          this.toggleLoading();
          var data = response.data;
          this.$router.push("/");
          console.log(data);
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


