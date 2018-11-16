<template>
<div>
  <section class="content-header">
    <div class="toolbar">
      
    </div>
  </section>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>Notifications (<b>{{  notifications.length }}</b>)</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
          <ul class="notifications-list">
            <li class="row" v-for="notification in notifications" :key="notification.id">
              <div class="col-md-1"><div class="notify-img"><img src="http://placehold.it/45x45" alt=""></div></div>
              <div class="col-md-11">
                <!-- <a href="">Ahmet</a> yorumladı. <a href="">Çicek bahçeleri...</a> <a href="" class="rIcon"><i class="fa fa-dot-circle-o"></i></a> -->
                <p>{{ notification.notification }}</p>
                <p class="time">{{ notification.created | moment("dddd, MMMM Do YYYY") }}</p>
                <button v-if="!notification.read" class="mark-read" v-on:click="editNotification(notification)">Mark as read</button>
              </div>
            </li>
            <li class="row" v-if="notifications.length <= 0">
              <p>you have no notifications</p>
            </li>
          </ul>
      </div>
    </div>

  </section>
</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data(router) {
    return {
      editMode: false,
      notification: {
        user: "",
        notification: "",
        read: false,
        created: ""
      }
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("notifications/loadNotifications", (JSON.parse(window.localStorage.getItem('user'))).user_id);
  },
  computed: {
    ...mapState({
      notifications: state => state.notifications.notifications
    }),
    ...mapGetters('notifications', ['getReadNotifications', 'getUnReadNotifications'])
  },
  methods: {
    editNotification(notification){
      notification.read = true;
      this.$store.dispatch("notifications/updateNotification", notification);
    },
    resetMaterial(){
      this.editMode = false;
      this.material = {
        user: "",
        notification: "",
        read: false,
        created: ""
      }
    }
  }
};
</script>

<style>


/* Notification Ui*/
.notifications-list a{
  color: #256ae1;
}

.notifications-list {
  list-style: none;
  padding: 0;
}
.notifications-list  > .row{
  margin-bottom: 5px;
}
.notifications-list .mark-read{
  float: right;
  box-shadow: none;
  border: 1px solid #666;
  border-radius: 5px;
}
.notifications-list::-webkit-scrollbar-track
{
  background-color: #F5F5F5;
}

.notifications-list::-webkit-scrollbar
{
  width: 8px;
  background-color: #F5F5F5;
}

.notifications-list::-webkit-scrollbar-thumb
{
  background-color: #ccc;
}
.notifications-list .drop-content > li {
  border-bottom: 1px solid #e2e2e2;
  padding: 10px 0px 5px 0px;
}
.notifications-list > li:nth-child(2n+0) {
  background-color: #fafafa;
}
.notifications-list > li:after {
  content: "";
  clear: both;
  display: block;
}
.notifications-list > li:hover {
  background-color: #fcfcfc;
}
.notifications-list > li:last-child {
  border-bottom: none;
}
.notifications-list > li .notify-img {
  float: left;
  display: inline-block;
  width: 45px;
  height: 45px;
  margin: 10px;
}
.notifications-list > li a {
  font-size: 12px;
  font-weight: normal;
}
.notifications-list > li {
  font-weight: bold;
  font-size: 11px;
}
.notifications-list > li hr {
  margin: 5px 0;
  width: 100%;
  border-color: #e2e2e2;
}
.notifications-list .pd-l0 {
  padding-left: 0;
}
.notifications-list > li p {
  font-size: 11px;
  color: #666;
  font-weight: normal;
  margin: 3px 0;
}
.notifications-list > li p.time {
  font-size: 10px;
  font-weight: 600;
  top: -6px;
  margin: 8px 0px 0px 0px;
  padding: 0px 3px;
  border: 1px solid #e2e2e2;
  position: relative;
  background-image: linear-gradient(#fff,#f2f2f2);
  display: inline-block;
  border-radius: 2px;
  color: #B97745;
}

</style>


