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
        <h3>Notifications (<b>5</b>)</h3>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12">
          <ul class="notifications-list">
            <li>
              <div class="col-md-1"><div class="notify-img"><img src="http://placehold.it/45x45" alt=""></div></div>
              <div class="col-md-11 pd-l0"><a href="">Ahmet</a> yorumladı. <a href="">Çicek bahçeleri...</a> <a href="" class="rIcon"><i class="fa fa-dot-circle-o"></i></a>
              <hr>
              <p class="time">5 mins ago</p><button class="mark-read">Mark as read</button>
              </div>
            </li>
            <li>
              <div class="col-md-1"><div class="notify-img"><img src="http://placehold.it/45x45" alt=""></div></div>
              <div class="col-md-11 pd-l0"><a href="">Ahmet</a> yorumladı. <a href="">Çicek bahçeleri...</a> <a href="" class="rIcon"><i class="fa fa-dot-circle-o"></i></a>
              <p>Lorem ipsum sit dolor amet consilium.</p>
              <p class="time">2 hours ago</p><button class="mark-read">Mark as read</button>
              </div>
            </li>
            <li>
              <div class="col-md-1"><div class="notify-img"><img src="http://placehold.it/45x45" alt=""></div></div>
              <div class="col-md-11 pd-l0"><a href="">Ahmet</a> yorumladı. <a href="">Çicek bahçeleri...</a> <a href="" class="rIcon"><i class="fa fa-dot-circle-o"></i></a>
              <p>Lorem ipsum sit dolor amet consilium.</p>
              <p class="time">29 september 2018</p><button class="mark-read">Mark as read</button>
              </div>
            </li>
            <li>
              <div class="col-md-1"><div class="notify-img"><img src="http://placehold.it/45x45" alt=""></div></div>
              <div class="col-md-11 pd-l0"><a href="">Ahmet</a> yorumladı. <a href="">Çicek bahçeleri...</a> <a href="" class="rIcon"><i class="fa fa-dot-circle-o"></i></a>
              <p>Lorem ipsum sit dolor amet consilium.</p>
              <p class="time">13:18</p><button class="mark-read">Mark as read</button>
              </div>
            </li>
            <li>
              <div class="col-md-1"><div class="notify-img"><img src="http://placehold.it/45x45" alt=""></div></div>
              <div class="col-md-11 pd-l0"><a href="">Ahmet</a> yorumladı. <a href="">Çicek bahçeleri...</a> <a href="" class="rIcon"><i class="fa fa-dot-circle-o"></i></a>
              <p>Lorem ipsum sit dolor amet consilium.</p>
              <p class="time">2 weeks ago</p><button class="mark-read">Mark as read</button>
              </div>
            </li>
          </ul>
      </div>
    </div>

  </section>
</div>
</template>

<script>
export default {
  created() {
  },
  mounted() {
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
.notifications-list .mark-read{
  float: right;
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
  margin: 0px 0px 8px 0px;
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
  width: 70%;
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


