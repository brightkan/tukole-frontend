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
          <p>Already have an account? <router-link tag="a" to="/login">Log in</router-link></p>
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

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      api
        .request('post', '/ws_user', { email, password })
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

            this.$store.commit('SET_EMAIL', data.first_name)

            if (window.localStorage) {
              window.localStorage.setItem('email', JSON.stringify(data.email))
            }

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


<style scoped>
.auth .card h4 a{
  color: #5a89da;
}

html{
  background-color: #f5f5f5;
  background-image: url('http://laoblogger.com/images/fiber-background-clipart-2.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
body{
  background: transparent
}
.auth .card{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 25%;
  margin-top: 15%;
  font-family: "Montserrat", sans-serif;
  background-color: #ffffff;
}

.auth .card h3{
  font-weight: bold;
  color: #256ae1;
  margin-bottom: 0
}

.auth .card h4{
  font-weight: 500;
  margin-bottom: 30px;
  margin-top: 5px;
}

.auth .card .input-group{
  width: 100%;
  margin-top: 15px;
}

.auth .card .input-group input{
  padding: 0 0 15px;
  border: none;
  border-bottom: 1px solid #e4e9fd;
}

.auth .card button{
  float: right;
  font-size: 14px;
  padding: 5px 30px;
  background-color: #256ae1;
}
.auth .card .btn-wrapper{
  margin-top: 15px;
  display: relative;
  padding: 0;
  margin-bottom: 15px;
}
.auth .card p{
  font-weight: 500;
  margin-bottom: 30px;
}
.auth .card p a{
  color: #5a89da;
}
.auth .card .error {
  margin-bottom: 30px;
  background-color: #e6bfbf;
  padding: 5px;
}
.auth .card .error p {
	margin: 0;
	font-weight: normal;
	font-size: 14px;
  color: #6f0202;
}
</style>

