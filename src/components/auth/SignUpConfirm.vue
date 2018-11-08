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
            <input type="email" class="form-control" name="email" placeholder="Email" v-model="email">
          </div>
          <div class="input-group">
            <input type="password" class="form-control" name="password" placeholder="Password" v-model="password">
          </div>
          <div class="input-group">
            <input type="password" class="form-control" name="cofirm_password" placeholder="Confirm Password" v-model="confirm_password">
          </div>
          <div class="col-md-12 btn-wrapper">
            <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Next</button>
          </div>
          <p>Already have an account? <router-link tag="a" to="/">Log in</router-link></p>
        </form>
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
        first_name: this.$store.state.user.firstname,
        last_name: this.$store.state.user.lastname,
        email: this.$store.state.user.email,
        type: this.$store.state.user.type,
        contract_type: this.$store.state.user.contract_type,
        phone_number:  this.$store.state.user.phone_number,
        workspace: (JSON.parse(window.localStorage.getItem('workspace'))).id,
        password: password
      };
      api
        .request('post', '/users/', reqObj)
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
          console.log(error)

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


