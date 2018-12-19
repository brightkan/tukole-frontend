<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-6">
        <h3>{{ site.site_name }}</h3>
      </div>
      <div class="text-right col-md-6">
        <p>Project Documentation</p>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="boq-list">

      <div class="comp-title col-md-2">
        <button type="button" data-toggle="modal" data-target="#addDocument" v-on:click="reset()">
          Add Document
        </button>
      </div>

      <hr>

      <div class="row">
        <div class="col-md-3" v-for="document in documents" :key="document.id">
          <a class="text-center text-black" v-bind:href="document.file" target="_blank">
            <p style="font-size: 40px">
               <i v-html="getFileType(document.file)"></i>
            </p>
            <p>{{ document.title }}</p>
          </a>
        </div>
      </div>
        

      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addDocument" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add documents</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
              <div class="row">
                <div class="col-md-12">
                  <div class="dropbox">
                    <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                      accept="*" class="input-file">
                      <p v-if="isInitial">
                        Drag your file(s) here to begin<br> or click to browse
                      </p>
                      <p v-if="isSaving">
                        Uploading {{ fileCount }} files...
                        <br> {{ fileNames }}
                      </p>
                  </div>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" v-model="document.title"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="saveDocument" data-dismiss="modal">
              Add Document
            </button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  data(router) {
    return {
      document: {
        title: ''
      },
      //this is for the upload
      fileCount: 0,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos'.mapState,
      formData: new FormData(),
      fileNames: []
    };
  },
  created() {},
  mounted() {
    // ...
  },
  computed: {
    ...mapState({
      site: state => state.sites.site,
      documents: state => state.sites.documents,
    }),

    //this is for the upload
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  mounted() {
    this.$store.dispatch("sites/getSiteDocuments", window.localStorage.getItem("selectsite"));

    //this is for the upload
    this.reset();
  },
  methods: {
    saveDocument() {
      const { document } = this;

      this.formData.append('title', document.title)
      this.formData.append('site', window.localStorage.getItem("selectsite"))

      this.$store.dispatch("sites/addDocument", this.formData);
    },
    //this is for the upload
    reset() {
      // reset form to initial state
      this.formData = new FormData(),
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
      this.fileNames = [];
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          this.formData.append('file', fileList[x], fileList[x].name);
          this.fileNames.push(fileList[x].name)
        });
      this.currentStatus = STATUS_SAVING;
    },
    getFileType(file){
      var patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
      var m3 = (file).match(patt1);

      switch(m3[1]){
        case "png":
          return "<i class=\"fas fa-image\"></i>"
        case "jpg": 
          return "<i class=\"fas fa-image\"></i>"
        case "pdf": 
          return "<i class=\"fas fa-file-pdf\"></i>"
        default: 
          return "<i class=\"fas fa-file\"></i>"
      }
    }
  }
};
</script>

<style>
.boq-list {
  padding: 36px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  width: 100%;
}
.boq-list h3 {
  margin-top: 0;
}
.boq-list table tr {
  border-bottom: 1px solid #e0e0e0;
  border-top: none;
}
.boq-list thead tr td {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 15px 0;
}
.boq-list tbody tr td {
  color: #333;
  font-family: "Montserrat", sans-serif;
  padding: 15px 0;
  font-size: 12px;
  line-height: 15px;
}
.table tbody tr td span {
  /* color: #333; */
  font-size: 9px;
  line-height: 11px;
  /* padding: 0; */
  margin-right: 15px;
}
.boq-list > p {
  text-align: right;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin-top: 89px;
}
.boq-list > p span {
  background-color: #fff;
  border: 1px solid #256ae1;
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  padding: 8px 13px;
  border-radius: 5px;
  margin-left: 15px;
}
.boq-list table tbody td span {
  color: #333;
  padding: 0;
  margin: 0;
  font-size: 12px;
  display: inline-block;
  min-width: 5%;
}
.text-danger td{
  color: red !important;
}
</style>


