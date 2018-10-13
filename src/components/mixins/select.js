export const select = {
  data() {
    return {};
  },
  created: function() {
    this.initailise();
  },
  mounted: function() {
    this.initailise();
  },
  methods: {
    addStyle: function(elem, prop, val, vendors) {
      var i, ii, property, value;
      if (!this.isElem(elem)) {
        elem = document.getElementById(elem);
      }
      if (!this.isArray(prop)) {
        prop = [prop];
        val = [val];
      }
      for (i = 0; i < prop.length; i += 1) {
        var thisProp = String(prop[i]),
          thisVal = String(val[i]);
        if (typeof vendors !== "undefined") {
          if (!this.isArray(vendors)) {
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
      var child = this.getTrg(event);
      child.setAttribute("media", "all");
    },
    cancel: function(event) {
      this.prevent(event);
      this.stop(event);
    },
    prevent: function(event) {
      event = event || window.event;
      event.preventDefault();
    },
    stop: function(event) {
      event = event || window.event;
      event.stopPropagation();
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
      return this.isNode(elem) && elem.nodeType == 1;
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
    },

    register: function() {
      //console.clear(); // just cuz codepen

      var child,
        children = document.getElementsByClassName("field"),
        i;
      for (i = 0; i < children.length; i += 1) {
        child = children[i];

        this.addStyle(child, "Opacity", 1);
        console.log(child);
      }
      children = document.getElementsByClassName("psuedo_select");
      for (i = 0; i < children.length; i += 1) {
        child = children[i];
        child.addEventListener("click", this.toggle);
        //console.log(child);
      }
    },
    unregister: function() {
      //just here as a formallity
      //call this to stop all ongoing timeouts are ready the page for some sort of json re-route
    },

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
        if (this.isElem(child)) {
          if (child.classList.contains("deselect")) {
            child.parentNode.removeChild(child);
          } else if (child.tagName == "SPAN") {
            if (!field.dataset.value) {
              this.addStyle(child, ["FontSize", "Top"], ["16px", "32px"]);
            }
          } else if (child.classList.contains("psuedo_select")) {
            nested_children = child.childNodes;
            for (ii = 0; ii < nested_children.length; ii += 1) {
              nested_child = nested_children[ii];
              if (this.isElem(nested_child)) {
                if (nested_child.tagName == "SPAN") {
                  if (!field.dataset.value) {
                    this.addStyle(
                      nested_child,
                      ["Opacity", "Transform"],
                      [0, "translateY(24px)"]
                    );
                  }
                } else if (nested_child.tagName == "UL") {
                  this.addStyle(nested_child, ["Height", "Opacity"], [0, 0]);
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
        this.isElem(child) && child.classList.contains("deselect")
          ? (bool = true)
          : null;
      }
      if (!bool) {
        child = document.createElement("div");
        child.className = "deselect";
        child.addEventListener("click", this.toggle);
        field.insertBefore(child, children[0]);
      }
      for (i = 0; i < children.length; i += 1) {
        child = children[i];
        if (this.isElem(child) && child.classList.contains("psuedo_select")) {
          nested_children = child.childNodes;
          for (ii = 0; ii < nested_children.length; ii += 1) {
            nested_child = nested_children[ii];
            if (this.isElem(nested_child) && nested_child.tagName == "UL") {
              size = 0;
              nested_nested_children = nested_child.childNodes;
              for (iii = 0; iii < nested_nested_children.length; iii += 1) {
                nested_nested_child = nested_nested_children[iii];
                if (
                  this.isElem(nested_nested_child) &&
                  nested_nested_child.tagName == "LI"
                ) {
                  size += this.getSize(nested_nested_child, "height");
                }
              }
              this.addStyle(
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
      if (this.isElem(child) && this.isElem(parent)) {
        parent.dataset.value = child.dataset.value;
        value = child.innerHTML;
      }
      for (i = 0; i < children.length; i += 1) {
        child = children[i];
        if (this.isElem(child)) {
          if (child.classList.contains("psuedo_select")) {
            nested_children = child.childNodes;
            for (ii = 0; ii < nested_children.length; ii += 1) {
              nested_child = nested_children[ii];
              if (
                this.isElem(nested_child) &&
                nested_child.classList.contains("selected")
              ) {
                if (nested_child.innerHTML) {
                  time = 1e2;
                  this.addStyle(
                    nested_child,
                    ["Opacity", "Transform"],
                    [0, "translateY(24px)"],
                    "all"
                  );
                }
                var _self = this;
                setTimeout(
                  function(c, v) {
                    c.innerHTML = v;
                    _self.addStyle(
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
            this.addStyle(child, ["FontSize", "Top"], ["12px", "0px"]);
          }
        }
      }
    },
    toggle: function(event) {
      this.stop(event);
      var child = this.getTrg(event),
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
          this.selection(child, parent);
          break;
      }
      parent.classList.contains("focused")
        ? this.blur(parent)
        : this.focus(parent);
    },

    initailise: function() {
      this.register();
    }
  }
};
