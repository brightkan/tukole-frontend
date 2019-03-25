<template>
  <div class="row">
    <div class="auth-form container">
      <h3>Tukole</h3>
      <div v-if=response class="col-md-12 error"><p class="vertical-5p lead">{{response}}</p></div>
      <form @submit.prevent="checkCreds">
        <div class="form-group">
          <label>Workspace Name</label>
          <input class="form-control" name="wk_name" type="text" v-model="workspace">
        </div>

        <div class="form-group">
          <label>Username/Email</label>
          <input class="form-control" name="email" type="email" v-model="email">
        </div>

        <div class="form-group">
          <label>Password</label>
          <input class="form-control" name="password" type="password" v-model="password">
        </div>

        <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading" 
          :disabled="loading == 'loading'">
          {{ loading ? 'Loading...' : 'Submit' }}
        </button>
        <p>Have no account? <router-link tag="a" to="/create_workspace">Sign Up</router-link></p>
        <p><router-link tag="a" to="/forgot_password">Forgot password</router-link></p>
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
  name: "Login",
  data(router) {
    return {
      section: "Login",
      loading: "",
      email: "",
      password: "",
      workspace: "",
      response: ""
    };
  },
  methods: {
    checkCreds() {
      const { email, password, workspace } = this;

      this.toggleLoading();
      this.resetResponse();
      this.$store.commit("TOGGLE_LOADING");

      /* Making API call to authenticate a user */
      api
        .request("post", "token/", { email, password, workspace })
        .then(response => {
          this.toggleLoading();

          var data = response.data;

          /* Setting user in the state and caching record to the localStorage */
          if (data) {
            var token = "Bearer " + data.access;

            this.$store.commit("SET_TOKEN", token);

            if (window.localStorage) {
              window.localStorage.setItem("token", token);
              window.localStorage.setItem("user", JSON.stringify(data));
            }

            if(data.part_of_workspace){

              if(/* data.user_role == 'ofc' || data.user_role == 'isp' */ false){
                window.localStorage.removeItem('token');
                this.response = "Error, check your credentials";
                //this.$router.push('/');
              }else{
                window.localStorage.setItem("clientType", data.user_type)
                window.localStorage.setItem("workspace", data.workspace)
                window.localStorage.setItem("company", data.company)
                
                this.$router.push('/dash')
              }
            }else{
              this.response = "Error, check your workspace";
            }

            this.$store.commit("TOGGLE_LOADING");
          }
        })
        .catch(error => {
          this.$store.commit("TOGGLE_LOADING");

          this.response = "Error, check your login credentials";
          this.toggleLoading();
        });
    },
    toggleLoading() {
      this.loading = this.loading === "" ? "loading" : "";
    },
    resetResponse() {
      this.response = "";
    }
  }
};
</script>

<style>
/* GLOBAL STYLES
-------------------------------------------------- */
/* Padding below the footer and lighter body text */

body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}


/* CUSTOMIZE THE CAROUSEL
-------------------------------------------------- */

/* Carousel base class */
.carousel {
  height: 100vh;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

.carousel-inner {
  height: 100%;
}

.carousel-indicators li {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.carousel-indicators li.active {
  width: 30px;
  border-radius: 50px;
}

/* Declare heights because of positioning of img element */
.carousel-item {
  height: 100%;
  background-color: #777;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 100%;
}

.carousel-indicators{
  /* margin-left: 45px; */
}

.carousel-caption {
    width: fit-content;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}

.overlay-effect {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: 0.5s ease;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 1024;
}

.auth-form{
  width: 50%;
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  top: 50%;
  padding: 30px;
  border-radius: 20px;
  transform: translateY(-50%);
  background-color: white;
  font-family: "Montserrat", sans-serif;
}

.auth-form  h3{
  margin-bottom: 15px;
  font-weight: bold;
  color: #256AE1;
}

.auth-form  h4{
  font-size: 16px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #256AE1;
}

.auth-form p a{
  color: #256AE1
}

.auth-form input, .auth-form select{
  border-color: #256AE1;
  border-radius: 5px;
  background: transparent;
}

.auth-form button{
	width: 100%;
  background-color: #256AE1;
  box-shadow: 0 2px 1px 0 rgba(51,153,255,0.27);
  border-radius: 40px;
  margin: 15px 0;
  padding: 10px;
  font-size: 16px;
}

.error{
  background: #db7474;
  color: white;
}

.error p{
  font-size: 1.1em;
  text-align: center;
}

/* RESPONSIVE CSS
-------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }
}
</style>
