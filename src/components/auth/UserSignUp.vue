<template>
  <div class="row auth">

    <div class="text-center col-sm-12">
      <div class="card container">
        <h3>Tukole</h3>
        <h4>Created Workspace: <a>{{ workspace.name }}</a></h4>

        <!-- errors -->
        <div v-if=response class="col-md-12 error"><p class="vertical-5p lead">{{response}}</p></div>

        <!-- login form -->
        <form @submit.prevent="checkCreds">
          <div class="input-group">
            <input class="form-control" name="first_name" placeholder="First Name" type="text" v-model="firstname">
          </div>
          <div class="input-group">
            <input class="form-control" name="last_name" placeholder="Last Name" type="text" v-model="lastname">
          </div>
          <div class="col-md-12 btn-wrapper">
            <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Next</button>
          </div>
          <p>Already have an account? <router-link tag="a" to="/login">Log in</router-link></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'

export default {
  name: 'SignUp',
  data(router) {
    return {
      section: 'SignUp',
      loading: '',
      firstname: '',
      lastname: '',
      response: ''
    }
  },
  computed: {
    workspace () { 
        console.log(this.$store.state.workspace); // this loses state
        if (window.localStorage) {
          return JSON.parse(window.localStorage.getItem('workspace'))
        }else{
          return null;
        }
      }
  },
  methods: {
    checkCreds() {
      const { firstname, lastname } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      this.$store.commit('SET_USER', {firstname: firstname, lastname: lastname})

      this.$router.push('/signup_confirm')
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


