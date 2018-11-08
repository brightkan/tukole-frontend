<template>
  <div class="row">
    <div class="col-md-4">
      <div class="auth-form container" style="margin-top: 15px">
        <h3 style="margin-bottom: 0">Tukole</h3>
        <h4>Created Workspace: <a>{{ workspace.name }}</a></h4>

        <form @submit.prevent="checkCreds">
          <div class="form-group">
            <label>First Name</label>
            <input class="form-control" name="first_name" type="text" v-model="user.first_name">
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input class="form-control" name="last_name" type="text" v-model="user.last_name">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="user.email"/>
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="number" class="form-control" v-model="user.phone_number"/>
          </div>
          <div class="form-group">
            <label>User type</label>
            <select placeholder="Type" class="form-control"  v-model="user.type">
              <option value="" disabled selected>Select type</option>
              <option v-bind:value="'admin'">admin</option>
              <option v-bind:value="'super_admin'">Super admin</option>
              <option v-bind:value="'employee'">Employee</option>
              <option v-bind:value="'client'">Client</option>
            </select>
          </div>
          <div class="form-group">
            <label>Contract type</label>
            <select placeholder="Contract type" class="form-control" v-model="user.contract_type">
              <option value="" disabled selected>Select Contract type</option>
              <option v-bind:value="'permanent'">Permament</option>
              <option v-bind:value="'temporary'">Temporary</option>
            </select>
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
  name: 'SignUp',
  data(router) {
    return {
      section: 'SignUp',
      loading: '',
      user: {
        first_name: '',
        last_name: '',
        email: '',
        type: '',
        contract_type: '',
        phone_number:  ''
      }
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
      const { user } = this

      this.toggleLoading()
      this.$store.commit('TOGGLE_LOADING')

      this.$store.commit('SET_USER', user)

      this.$router.push('/signup_confirm')
    },
    toggleLoading() {
      this.loading = this.loading === '' ? 'loading' : ''
    }
  }
}
</script>

<style>
.auth .card h4 a{
  color: #5a89da;
}
option[value=""][disabled] {
  display: none;
}
option {
  color: #999;
}
</style>


