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
      <div class="boq-list">
        <h3>Bill of Quanties</h3>

        <table class="table">
          <thead>
            <tr>
              <td>Item</td>
              <td>Description</td>
              <td>Type</td>
              <td>Quantity</td>
              <td>Unit Cost</td>
              <td>Total Cost</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span>1.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
            <tr>
              <td><span>2.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
            <tr>
              <td><span>3.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
            <tr>
              <td><span>4.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
            <tr>
              <td><span>5.</span> Fibre Casing</td>
              <td>Grade 3 polythene</td>
              <td>Material</td>
              <td>100</td>
              <td>200</td>
              <td>20,000</td>
            </tr>
          </tbody>
        </table>

        <p>
          Total Project cost
          
          <span>
            USD 100,0000
          </span>
        </p>
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
.boq-list {
  padding: 36px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
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
  color: #333;
  font-size: 9px;
  line-height: 11px;
  padding: 0;
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
</style>


