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
            <input class="form-control" name="first_name" placeholder="First Name" type="text" v-model="user.first_name">
          </div>
          <div class="input-group">
            <input class="form-control" name="last_name" placeholder="Last Name" type="text" v-model="user.last_name">
          </div>
          <div class="input-group">
            <input placeholder="email" type="email" class="form-control" v-model="user.email"/>
          </div>
          <div class="input-group">
            <input placeholder="Phone Number" type="number" class="form-control" v-model="user.phone_number"/>
          </div>
          <div class="input-group">
            <select placeholder="Type" class="form-control"  v-model="user.type">
              <option value="" disabled selected>Select type</option>
              <option v-bind:value="'admin'">admin</option>
              <option v-bind:value="'super_admin'">Super admin</option>
              <option v-bind:value="'employee'">Employee</option>
              <option v-bind:value="'client'">Client</option>
            </select>
          </div>
          <div class="input-group">
            <select placeholder="Contract type" class="form-control" v-model="user.contract_type">
              <option value="" disabled selected>Select Contract type</option>
              <option v-bind:value="'permanent'">Permament</option>
              <option v-bind:value="'temporary'">Temporary</option>
            </select>
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


