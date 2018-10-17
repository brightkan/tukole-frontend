<template>
  <div class="row auth">

    <div class="text-center col-sm-12">

      <div class="card container">
        <h3>Tukole</h3>

        <!-- errors -->
        <div v-if=response class="col-md-12 error"><p class="vertical-5p lead">{{response}}</p></div>
        <!-- login form -->
        <form @submit.prevent="checkCreds">
          <div class="input-group">
            <input class="form-control" name="username" placeholder="Username" type="text" v-model="username">
          </div>

          <div class="input-group">
            <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
          </div>

          <div class="col-md-12 btn-wrapper">
            <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
          </div>
          <p>Have no account? <router-link tag="a" to="/create_workspace">Sign Up</router-link></p>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'

export default {
  name: 'Login',
  data(router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds() {
      const { username, password } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      api
        .request('post', 'token/', { username, password })
        .then(response => {
          this.toggleLoading()

          var data = response.data
    

          /* Setting user in the state and caching record to the localStorage */
          if (data) {
            var token = 'JWT ' + data.access

            this.$store.commit('SET_TOKEN', token)

            if (window.localStorage) {
              window.localStorage.setItem('token', token)
            }

            // this.$router.push(data.redirect ? data.redirect : '/dash')
            window.location.href = '/dash';
          }
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)

          this.response = 'Server appears to be offline'
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

</style>
