<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-2">
        <h3>Fleet</h3>
      </div>

      <div class="comp-title col-md-4">
        <label id="img_category_label" class="field" for="img_category" data-value="">
          <span>Status</span>
          <div id="img_category" class="psuedo_select" name="img_category">
            <span class="selected"></span>
            <ul id="img_category_options" class="options">
              <li class="option" data-value="opt_1">Avialable</li>
              <li class="option" data-value="opt_2">Broken Down</li>
              <li class="option" data-value="opt_2">ASsigned</li>
            </ul>
          </div>
        </label>
      </div>

      <div class="comp-title col-md-6">
        <form method="get" action="/search" class="fleet_search">
          <input name="q" type="text" size="40" placeholder="Search..." />
        </form>
      </div>
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-3">
        <div class="summary-card row">
          <h3 class="col-md-6">3000</h3>
          <p class="col-md-6">Total Number of vehicles</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row">
          <h3 class="col-md-6">200</h3>
          <p class="col-md-6">Available vehicles</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row">
          <h3 class="col-md-6 text-danger">357</h3>
          <p class="col-md-6">Broken down vehicles</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <td><span class="dot"></span></td>
              <td>Vehicle</td>
              <td>Serial Number</td>
              <td>Type</td>
              <td>status</td>
              <td>Creation Date</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>Catapiller Multrix</td>
              <td>TUK-CAT-1002</td>
              <td>Grader</td>
              <td><span class="green">Available</span></td>
              <td>12. 08. 2018</td>
            </tr>
            <tr>
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>Catapiller Multrix</td>
              <td>TUK-CAT-1002</td>
              <td>Grader</td>
              <td><span class="red">Broken Down</span></td>
              <td>12. 08. 2018</td>
            </tr>
            <tr>
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>Catapiller Multrix</td>
              <td>TUK-CAT-1002</td>
              <td>Grader</td>
              <td><span class="orange">ASsigned</span></td>
              <td>12. 08. 2018</td>
            </tr>
            <tr>
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>Catapiller Multrix</td>
              <td>TUK-CAT-1002</td>
              <td>Grader</td>
              <td><span class="red">Broken Down</span></td>
              <td>12. 08. 2018</td>
            </tr>
            <tr>
              <td><span class="dot"></span></td>
              <td><span class="oval"></span>Catapiller Multrix</td>
              <td>TUK-CAT-1002</td>
              <td>Grader</td>
              <td><span class="green">Available</span></td>
              <td>12. 08. 2018</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>



  </section>
</template>

<script>
////////////////////////////////////
// prerequisite utility functions //
// the real stuff starts below    //
////////////////////////////////////
var util = {
    f: {
      addStyle: function(elem, prop, val, vendors) {
        var i, ii, property, value;
        if (!util.f.isElem(elem)) {
          elem = document.getElementById(elem);
        }
        if (!util.f.isArray(prop)) {
          prop = [prop];
          val = [val];
        }
        for (i = 0; i < prop.length; i += 1) {
          var thisProp = String(prop[i]),
            thisVal = String(val[i]);
          if (typeof vendors !== "undefined") {
            if (!util.f.isArray(vendors)) {
              vendors.toLowerCase() == "all"
                ? (vendors = ["webkit", "moz", "ms", "o"])
                : (vendors = [vendors]);
            }
            for (ii = 0; ii < vendors.length; ii += 1) {
              elem.style[vendors[i] + thisProp] = thisVal;
            }
          }
          thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1);
          elem.style[thisProp] = thisVal;
        }
      },
      cssLoaded: function(event) {
        var child = util.f.getTrg(event);
        child.setAttribute("media", "all");
      },
      events: {
        cancel: function(event) {
          util.f.events.prevent(event);
          util.f.events.stop(event);
        },
        prevent: function(event) {
          event = event || window.event;
          event.preventDefault();
        },
        stop: function(event) {
          event = event || window.event;
          event.stopPropagation();
        }
      },
      getSize: function(elem, prop) {
        return parseInt(elem.getBoundingClientRect()[prop], 10);
      },
      getTrg: function(event) {
        event = event || window.event;
        if (event.srcElement) {
          return event.srcElement;
        } else {
          return event.target;
        }
      },
      isElem: function(elem) {
        return util.f.isNode(elem) && elem.nodeType == 1;
      },
      isArray: function(v) {
        return v.constructor === Array;
      },
      isNode: function(elem) {
        return typeof Node === "object"
          ? elem instanceof Node
          : elem &&
              typeof elem === "object" &&
              typeof elem.nodeType === "number" &&
              typeof elem.nodeName === "string" &&
              elem.nodeType !== 3;
      },
      isObj: function(v) {
        return typeof v == "object";
      },
      replaceAt: function(str, index, char) {
        return str.substr(0, index) + char + str.substr(index + char.length);
      }
    }
  },
  //////////////////////////////////////
  // ok that's all the utilities      //
  // onto the select box / form stuff //
  //////////////////////////////////////
  form = {
    f: {
      init: {
        register: function() {
          console.clear(); // just cuz codepen
          var child,
            children = document.getElementsByClassName("field"),
            i;
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            util.f.addStyle(child, "Opacity", 1);
          }
          children = document.getElementsByClassName("psuedo_select");
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            child.addEventListener("click", form.f.select.toggle);
          }
        },
        unregister: function() {
          //just here as a formallity
          //call this to stop all ongoing timeouts are ready the page for some sort of json re-route
        }
      },
      select: {
        blur: function(field) {
          field.classList.remove("focused");
          var child,
            children = field.childNodes,
            i,
            ii,
            nested_child,
            nested_children;
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            if (util.f.isElem(child)) {
              if (child.classList.contains("deselect")) {
                child.parentNode.removeChild(child);
              } else if (child.tagName == "SPAN") {
                if (!field.dataset.value) {
                  util.f.addStyle(child, ["FontSize", "Top"], ["16px", "32px"]);
                }
              } else if (child.classList.contains("psuedo_select")) {
                nested_children = child.childNodes;
                for (ii = 0; ii < nested_children.length; ii += 1) {
                  nested_child = nested_children[ii];
                  if (util.f.isElem(nested_child)) {
                    if (nested_child.tagName == "SPAN") {
                      if (!field.dataset.value) {
                        util.f.addStyle(
                          nested_child,
                          ["Opacity", "Transform"],
                          [0, "translateY(24px)"]
                        );
                      }
                    } else if (nested_child.tagName == "UL") {
                      util.f.addStyle(
                        nested_child,
                        ["Height", "Opacity"],
                        [0, 0]
                      );
                    }
                  }
                }
              }
            }
          }
        },
        focus: function(field) {
          field.classList.add("focused");
          var bool = false,
            child,
            children = field.childNodes,
            i,
            ii,
            iii,
            nested_child,
            nested_children,
            nested_nested_child,
            nested_nested_children,
            size = 0;
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            util.f.isElem(child) && child.classList.contains("deselect")
              ? (bool = true)
              : null;
          }
          if (!bool) {
            child = document.createElement("div");
            child.className = "deselect";
            child.addEventListener("click", form.f.select.toggle);
            field.insertBefore(child, children[0]);
          }
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            if (
              util.f.isElem(child) &&
              child.classList.contains("psuedo_select")
            ) {
              nested_children = child.childNodes;
              for (ii = 0; ii < nested_children.length; ii += 1) {
                nested_child = nested_children[ii];
                if (
                  util.f.isElem(nested_child) &&
                  nested_child.tagName == "UL"
                ) {
                  size = 0;
                  nested_nested_children = nested_child.childNodes;
                  for (iii = 0; iii < nested_nested_children.length; iii += 1) {
                    nested_nested_child = nested_nested_children[iii];
                    if (
                      util.f.isElem(nested_nested_child) &&
                      nested_nested_child.tagName == "LI"
                    ) {
                      size += util.f.getSize(nested_nested_child, "height");
                      console.log("size: " + size);
                    }
                  }
                  util.f.addStyle(
                    nested_child,
                    ["Height", "Opacity"],
                    [size + "px", 1]
                  );
                }
              }
            }
          }
        },
        selection: function(child, parent) {
          var children = parent.childNodes,
            i,
            ii,
            nested_child,
            nested_children,
            time = 0,
            value;
          if (util.f.isElem(child) && util.f.isElem(parent)) {
            parent.dataset.value = child.dataset.value;
            value = child.innerHTML;
          }
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            if (util.f.isElem(child)) {
              if (child.classList.contains("psuedo_select")) {
                nested_children = child.childNodes;
                for (ii = 0; ii < nested_children.length; ii += 1) {
                  nested_child = nested_children[ii];
                  if (
                    util.f.isElem(nested_child) &&
                    nested_child.classList.contains("selected")
                  ) {
                    if (nested_child.innerHTML) {
                      time = 1e2;
                      util.f.addStyle(
                        nested_child,
                        ["Opacity", "Transform"],
                        [0, "translateY(24px)"],
                        "all"
                      );
                    }
                    setTimeout(
                      function(c, v) {
                        c.innerHTML = v;
                        util.f.addStyle(
                          c,
                          ["Opacity", "Transform", "TransitionDuration"],
                          [1, "translateY(0px)", ".1s"],
                          "all"
                        );
                      },
                      time,
                      nested_child,
                      value
                    );
                  }
                }
              } else if (child.tagName == "SPAN") {
                util.f.addStyle(child, ["FontSize", "Top"], ["12px", "0px"]);
              }
            }
          }
        },
        toggle: function(event) {
          util.f.events.stop(event);
          var child = util.f.getTrg(event),
            children,
            i,
            parent;
          switch (true) {
            case child.classList.contains("psuedo_select"):
            case child.classList.contains("deselect"):
              parent = child.parentNode;
              break;
            case child.classList.contains("options"):
              parent = child.parentNode.parentNode;
              break;
            case child.classList.contains("option"):
              parent = child.parentNode.parentNode.parentNode;
              form.f.select.selection(child, parent);
              break;
          }
          parent.classList.contains("focused")
            ? form.f.select.blur(parent)
            : form.f.select.focus(parent);
        }
      }
    }
  };

export default {
  created() {
    console.log("yoy created the select box");

    window.onload = form.f.init.register;
  },
  mounted() {
    this.$emit("customEventForValChange", this.$route.path);
  }
};
</script>

<style>
.content > .row:nth-child(1) {
  padding: 20px 72px 10px;
  border-bottom: 1px solid #e0e0e0;
}

.content > .row:nth-child(2) {
  padding-top: 30px;
}

.content > .row:nth-child(3) {
  padding-top: 40px;
}

.comp-title {
  border: none;
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.comp-title > h3 {
  display: inline-block;
  margin: 0;
  line-height: 2.2em;
}

label.field {
  border-radius: 2px;
  color: #666;
  width: 100%;
  opacity: 0;
  position: relative;
  transition-property: opacity;
  z-index: 1;
  margin-bottom: 0;
}

label.field > span {
  color: #bdbdbd !important;
  font-family: "Montserrat", sans-serif;
  font-size: 14px !important;
  font-weight: 300;
}

label.field span {
  color: inherit;
  display: block;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  left: 9px;
  pointer-events: none;
  position: absolute;
  -webkit-transform: scale(1) translateY(0);
  transform: scale(1) translateY(0);
  transition-property: color, font-size, top;
  z-index: 2;
  margin: 8px 0 8px 10px;
}
label.field span.required::after {
  color: inherit;
  content: "*";
  display: block;
  height: 20px;
  left: -20px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  top: 0;
  width: 20px;
}
.error label.field span {
  color: #f02318;
}
label.field .psuedo_select {
  background: rgba(255, 255, 255, 0);
  position: relative;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 20px;
  height: 0;
  line-height: 24px;
  margin: 0;
  min-width: 250px;
  padding-top: 35px;
  outline: 0;
  z-index: 1;
  background-color: white;
  border-radius: 5px;
}
label.field .psuedo_select::after {
  background: url("data:image/svg+xml;utf8,<svg fill='#256ae1' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'> <path d='M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z'/> <path d='M0-.75h24v24H0z' fill='none'/> </svg>"),
    no-repeat;
  content: "";
  height: 24px;
  width: 24px;
  position: absolute;
  top: 7px;
  right: 10px;
  transition-property: background;
}
label.field .psuedo_select .selected {
  left: 1px;
  line-height: initial;
  opacity: 0;
  position: absolute;
  top: 0;
  margin-left: 95px;
  color: #256ae1;
  -webkit-transform: translateY(24px);
  transform: translateY(24px);
  transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
  transition-property: opacity, transform, -webkit-transform;
  will-change: transform;
}
label.field .psuedo_select ul {
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  display: block;
  height: 0;
  list-style: none;
  margin-top: 2px;
  opacity: 0;
  overflow: hidden;
  padding: 0 1px;
  pointer-events: none;
  transition-property: height, opacity;
  width: 100%;
  z-index: 2;
  position: absolute;
}
label.field .psuedo_select ul li {
  font-size: 18px;
  font-weight: 300;
  padding: 8px 10px;
}
label.field .deselect {
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: -1;
}
label.field.focused {
  color: #007bed;
}
label.field.focused .psuedo_select {
  border-color: #007bed;
}
label.field.focused .psuedo_select::after {
  background: url("data:image/svg+xml;utf8,<svg fill='#007BED' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'> <path d='M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z'/> <path d='M0-.75h24v24H0z' fill='none'/> </svg>"),
    no-repeat;
}
label.field.focused .psuedo_select ul {
  opacity: 1;
  pointer-events: all;
}
.comp-title .fleet_search {
  padding: 0;
}
.comp-title .fleet_search input {
  background: url(../../../static/img/search-white.png) no-repeat 10px 10px;
  background-color: #fff;
  border: 0 none;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
  color: #666;
  width: 100%;
  padding: 10px 15px 10px 35px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}
.summary-card {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
  border-radius: 5px;
  margin: 0;
}
.summary-card h3 {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  padding: 20px 37px 26px;
  padding-right: 5px;
  margin: 0;
}
.summary-card h3 small {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
}

.summary-card p {
  color: #4f4f4f;
  font-family: "Montserrat", sans-serif;
  font-size: 11px;
  line-height: 13px;
  padding-top: 24px;
  padding-right: 30px;
}

.table thead .dot {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.table .dot {
  box-sizing: border-box;
  padding: 0 6px;
  margin-left: 7px;
  background-color: #fff;
  border: 1px solid #e4e9fd;
  border-radius: 3px;
}

.table .oval {
  background-color: #393939;
  border-radius: 50%;
  padding: 5px 10px;
  margin-right: 10px;
}

.table thead tr td {
  color: #256ae1;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
}

.table tbody tr {
  background-color: #fff;
  border-top: 5px solid;
  border-bottom: 5px solid;
  border-color: #ebf0f5;
}

.table tbody tr td {
  color: #142235;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.table tbody tr td span {
  color: #fff;
  font-size: 9px;
  line-height: 11px;
  padding: 3px 15px;
  border-radius: 20px;
}
.table tbody tr td span.green {
  background-color: #2dae3e;
}
.table tbody tr td span.red {
  background-color: #ff5f58;
}
.table tbody tr td span.orange {
  background-color: #fa9917;
}
.table tbody tr td i {
  color: #c8c8c8;
  font-size: 14px;
}
.table tbody tr i:nth-child(2) {
  margin-right: 50px;
}
.table tbody tr i:nth-child(1) {
  margin-right: 20px;
}
</style>


