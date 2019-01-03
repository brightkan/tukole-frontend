<template>
  <div class="row">
    <div class="col-md-4">
      <div class="auth-form container">
        <h3>Tukole</h3>
        <h4>Created Workspace: <a>{{ workspace.name }}</a></h4>

        <div v-if=response class="col-md-12 error"><p class="vertical-5p lead">{{response}}</p></div>

        <form @submit.prevent="checkCreds">
          <div class="form-group">
            <label>Password</label>
            <input class="form-control" name="password" type="password" v-model="password">
          </div>

          <div class="form-group">
            <label>Confirm Password</label>
            <input class="form-control" name="password" type="password" v-model="confirm_password">
          </div>

          <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading" 
            :disabled="loading == 'loading'">
            {{ loading ? 'Loading...' : 'Submit' }}
          </button>
          <p>Already have an account? <router-link tag="a" to="/">Log in</router-link></p>
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
import api from '../../api'

export default {
  name: 'SignUpConfirm',
  data(router) {
    return {
      section: 'SignUpConfirm',
      loading: '',
      email: '',
      password: '',
      confirm_password: '',
      response: ''
    }
  },
  computed: {
    workspace () { 
        if (window.localStorage) {
          return JSON.parse(window.localStorage.getItem('workspace'))
        }else{
          return null;
        }
      }
  },
  methods: {
    checkCreds() {
      const { email, password, confirm_password } = this

      if(password != confirm_password){
        return;
      }

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      let reqObj = {
        first_name: this.$store.state.user.first_name,
        last_name: this.$store.state.user.last_name,
        email: this.$store.state.user.email,
        type: this.$store.state.user.type,
        contract_type: this.$store.state.user.contract_type,
        role: this.$store.state.user.role,
        phone_number:  this.$store.state.user.phone_number,
        workspace: (JSON.parse(window.localStorage.getItem('workspace'))).id,
        password: password
      };
      api
        .request('post', 'users/', reqObj)
        .then(response => {
          this.toggleLoading()
          var data = response.data
          
          /* Setting user in the state and caching record to the localStorage */
          if (data) {
            this.$router.push(data.redirect ? data.redirect : '/')
          }
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')

          // this.response = 'Server appears to be offline'
          this.$router.push('/')
          this.toggleLoading()
        })
    },
    toggleLoading() {
      this.loading = this.loading === '' ? 'loading' : ''
    },
    resetResponse() {
      this.response = ''
    }
  }
}
</script>

<style>
.auth .card h4 a{
  color: #5a89da;
}
</style>


