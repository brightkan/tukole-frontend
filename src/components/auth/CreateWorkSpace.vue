<template>
  <div class="row">
    <div class="col-md-4">
      <div class="auth-form container">
        <h3>Tukole</h3>
        <h4>Create Workspace</h4>
        <form @submit.prevent="checkCreds">
          <div class="form-group">
            <label>Workspace Name</label>
            <input class="form-control" name="workspace" type="text" v-model="workspace">
          </div>

          <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading" 
            :disabled="loading == 'loading'">
            {{ loading ? 'Loading...' : 'Next' }}
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
          <img class="first-slide" src="http://www.ledcor.com/getmedia/bdd91491-a49d-4a61-9c6c-e8ecd7dddf6a/uufoci_8_5_2.jpg.aspx?width=960&height=600&ext=.jpg&maxsidesize=960" alt="First slide">
          <div class="overlay-effect h-100 w-100">
            <div class="container">
            <div class="carousel-caption text-left">
              <h1>Example headline.</h1>
            </div>
          </div>
          </div>
        </div>
        <div class="carousel-item">
          <img class="second-slide" src="http://nnimgt-a.akamaihd.net/transform/v1/resize/frm/storypad-qtXAEZC67LbMeemRuC2bYX/c329a32b-fa17-4aef-b127-4e2ea7ec7802.jpg/w1200_h678_fmax.jpg" alt="Second slide">
          <div class="overlay-effect h-100 w-100">
            <div class="container">
            <div class="carousel-caption text-left">
              <h1>Another example headline.</h1>
            </div>
          </div>
          </div>
        </div>
        <div class="carousel-item">
          <img class="third-slide" src="http://www.chinacablesbuy.com/wp-content/uploads/2016/08/underground-fiber-installation.jpg" alt="Third slide">
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
  name: 'Workspace',
  data(router) {
    return {
      section: 'Workspace',
      loading: '',
      workspace: '',
      response: ''
    }
  },
  methods: {
    checkCreds() {
      const { workspace } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      if(workspace == ''){
        this.response = 'Workspace cannot be empty'
        return;
      }

      /* Making API call to authenticate a user */
      api
        .request('post', 'workspaces/', { name: workspace })
        .then(response => {
          this.toggleLoading()

          var data = response.data

          console.log(data);

          /* Setting user in the state and caching record to the localStorage */
          if (data) {
            var token = 'Bearer ' + data.token

            this.$store.commit('SET_WORKSPACE', {id: data.id, name: data.name})

            if (window.localStorage) {
              window.localStorage.setItem('workspace', JSON.stringify(data))
            }

            this.$router.push(data.redirect ? data.redirect : '/signup')
          }
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)

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
html{
  background-color: #f5f5f5;
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
