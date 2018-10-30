<template>
  <div class="row auth">

    <div class="text-center col-sm-12">

      <div class="card container">
        <h3>Tukole</h3>
        <h4>select Workspace</h4>

        <!-- login form -->
        <form @submit.prevent="checkCreds">
          <div class="input-group">
              <select class="form-control" name="workspace" v-model="workspace">
                  <option></option>
                  <option v-for="workspace in workspaces" v-bind:value="workspace.id" :key="workspace.id">
                    {{ workspace.name }}
                  </option>
              </select>
          </div>

          <div class="col-md-12 btn-wrapper">
            <button type="submit" class="btn btn-primary btn-lg">
              Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "workSpaces",
  data(router) {
    return {
      workspace: '',
    };
  },
  mounted() {
    this.$store.dispatch("loadUserWorkSpaces");
  },
  computed: {
    ...mapState(['workspaces'])
  },
  methods: {
    checkCreds() {
      const { workspace } = this;
      window.localStorage.setItem("workspace", workspace)
      window.location.href = "/dash";
    }
  }
};
</script>

<style>
</style>
