<template>
    <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="comp-title col-md-12">
        <h3>Kampala Renovation project</h3>
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
          <h3 class="col-md-6"><small>USD 3000</small></h3>
          <p class="col-md-6">Estimated Budget</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row">
          <h3 class="col-md-6 text-danger">20</h3>
          <p class="col-md-6">Employees on project</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="summary-card row">
          <h3 class="col-md-6 text-danger"><small>76 hours</small></h3>
          <p class="col-md-6">Delays</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="timeline-box">
          <h3>Progress Timeline</h3>

          <div id="stages">
            <ul>
              <li>Stage 1</li>
              <li>Stage 2</li>
              <li class="active">Stage 3</li>
              <li>Stage 4</li>
              <li>Stage 5</li>
            </ul>
          </div>

          <h3 class="timeline-activites-label">Activities</h3>
          
          <div class="row timeline-content">
            <div class="col-md-2">
              24th July 2018
            </div>
            <div class="col-md-1">
              Stage 1
            </div>
            <div class="col-md-9">
              Delayed for 2 days due to terrential rains
            </div>
          </div>

          <div class="row timeline-content">
            <div class="col-md-2">
              26th July 2018
            </div>
            <div class="col-md-1">
              Stage 1
            </div>
            <div class="col-md-9">
              Work continued with 500 meters of escavation from Old kampala along buckeley road. 2000 meters of
fiber cable was laid.
            </div>
          </div>

          <div class="row timeline-content">
            <div class="col-md-2">
              26th July 2018
            </div>
            <div class="col-md-1">
              Stage 2
            </div>
            <div class="col-md-9">
              Work continued with 500 meters of escavation from Old kampala along buckeley road. 2000 meters of
fiber cable was laid.
            </div>
          </div>

          <div class="row timeline-content">
            <div class="col-md-2">
              27th July 2018
            </div>
            <div class="col-md-1">
              Stage 3
            </div>
            <div class="col-md-9">
              Work continued with 500 meters of escavation from Old kampala along buckeley road. 2000 meters of
fiber cable was laid.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row _projects">
      <div class="col-md-12">
        <div class="project-roles-box">
          <h3>Roject Roles

            <select>
              <option>Add Role</option>
            </select>
          </h3>

          <div class="row roles-list">
            <div class="col-md-2">
              Project Manager
            </div>
            <div class="col-md-9">
              <ul>
                <li><span class="oval"></span>Katuula Joel<span class="close" aria-hidden="true">&times;</span></li>
              </ul>
            </div>
            <div class="col-md-1">
              <button>
                <span class="fa fa-plus"></span>
                Add
              </button>
            </div>
          </div>

          <div class="row roles-list">
            <div class="col-md-2">
              Surveyor
            </div>
            <div class="col-md-9">
              <ul>
                <li><span class="oval"></span>Katuula Joel<span class="close" aria-hidden="true">&times;</span></li>
                <li><span class="oval"></span>Katuula Joel<span class="close" aria-hidden="true">&times;</span></li>
              </ul>
            </div>
            <div class="col-md-1">
              <button>
                <span class="fa fa-plus"></span>
                Add
              </button>
            </div>
          </div>

          <div class="row roles-list">
            <div class="col-md-2">
              OFC
            </div>
            <div class="col-md-9">
              <ul>
                <li><span class="oval"></span>Katuula Joel<span class="close" aria-hidden="true">&times;</span></li>
                <li><span class="oval"></span>Katuula Joel<span class="close" aria-hidden="true">&times;</span></li>
              </ul>
            </div>
            <div class="col-md-1">
              <button>
                <span class="fa fa-plus"></span>
                Add
              </button>
            </div>
          </div>

          <div class="row roles-list">
            <div class="col-md-2">
              ISP
            </div>
            <div class="col-md-9">
              <ul>
                <li><span class="oval"></span>Katuula Joel<span class="close" aria-hidden="true">&times;</span></li>
                <li><span class="oval"></span>Katuula Joel<span class="close" aria-hidden="true">&times;</span></li>
              </ul>
            </div>
            <div class="col-md-1">
              <button>
                <span class="fa fa-plus"></span>
                Add
              </button>
            </div>
          </div>

          <div class="row roles-list">
            <div class="col-md-2">
              Drivers 
            </div>
            <div class="col-md-9">
              <ul>
                <li><span class="oval"></span>Katuula Joel<span class="close" aria-hidden="true">&times;</span></li>
              </ul>
            </div>
            <div class="col-md-1">
              <button>
                <span class="fa fa-plus"></span>
                Add
              </button>
            </div>
          </div>
        </div>
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
.timeline-box {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  padding: 27px 38px;
}

.timeline-box h3,
.project-roles-box h3 {
  margin: 0;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
}

.timeline-activites-label {
  padding-top: 40px;
  padding-bottom: 10px;
}

#stages {
  width: 100%;
  margin: auto;
  height: 30px;
  margin-top: 50px;
}
#stages ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
#stages li {
  float: left;
  width: 20%;
  text-align: center;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
}
#stages ul > li:first-child::before {
  text-align: left;
  width: 50%;
  margin-left: 50%;
}
#stages ul > li:last-child::before {
  text-align: right;
  width: 50%;
  margin-right: 50%;
}
#stages ul > li:before {
  content: "\B7";
  font-size: 80px;
  line-height: 1px;
  display: block;
  color: #000;
  border-bottom: 1px solid #ededed;
  margin: 0 0 10px 0;
  font-family: serif;
}

#stages ul > li.active:before {
  color: #256ae1;
  text-shadow: 0px 0px 10px #256ae1;
}

#stages ul > li.active {
  font-weight: 700;
}
.timeline-content {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
}
.timeline-content div {
  padding-top: 15px;
  padding-bottom: 15px;
}
._projects {
  margin-top: 28px;
}
.project-roles-box {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  padding: 27px 38px;
}
.project-roles-box h3 select {
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  margin-left: 39px;
  padding: 5px 10px;
  border-radius: 5px;
  min-width: 150px;
}
.project-roles-box h3 select::placeholder,
.project-roles-box h3 select option {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  line-height: 12px;
}
.project-roles-box h3 {
  margin-bottom: 45px;
}
.roles-list {
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 15px;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
}
.roles-list div:nth-child(1) {
  line-height: 2em;
}
.roles-list ul {
  list-style: none;
  padding: 0;
}
.roles-list ul li {
  float: left;
  background-color: #f2f2f2;
  border-radius: 15px;
  margin-right: 15px;
  padding: 5px 10px;
}
.roles-list ul li .oval {
  background-color: #256ae1;
  border-radius: 50%;
  padding: 1px 8px;
  margin-right: 10px;
}
.roles-list ul li .close {
  font-size: 14px;
  padding-left: 10px;
}
.roles-list button {
  background-color: #256ae1;
  color: white;
  padding: 5px;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  border-radius: 20px;
  border: none;
}
</style>


