<template>
  <div class="row auth">

    <div class="text-center col-sm-12">
      <div class="card container">
        <h3>Tukole</h3>
        <h4>Created Workspace: <a>some-ws</a></h4>

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
  methods: {
    checkCreds() {
      const { firstname, lastname } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      api
        .request('post', '/ws_user', { firstname, lastname })
        .then(response => {
          this.toggleLoading()

          var data = response.data
          /* Checking if error object was returned from the server */
          if (data.error) {
            var errorName = data.error.name
            if (errorName) {
              this.response =
                errorName === 'InvalidCredentialsError'
                  ? 'Username/Password incorrect. Please try again.'
                  : errorName
            } else {
              this.response = data.error
            }

            return
          }

          /* Setting user in the state and caching record to the localStorage */
          if (data.user) {
            var token = 'Bearer ' + data.token

            this.$store.commit('SET_FIRST_NAME', data.first_name)
            this.$store.commit('SET_LAST_NAME', data.last_name)

            if (window.localStorage) {
              window.localStorage.setItem('first_name', JSON.stringify(data.first_name))
              window.localStorage.setItem('last_name', JSON.stringify(data.last_name))
            }

            this.$router.push(data.redirect ? data.redirect : '/')
          }
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)

          // this.response = 'Server appears to be offline'
          this.$router.push('/signup_confirm')
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
