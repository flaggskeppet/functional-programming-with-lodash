// A container just holds a value
function Container(val) {
    this._value = val;
    this.init(val);
}
Container.prototype.init = _.identity;

// The HoleMixin has one method, setValue.
// This method uses methods from my other mixins
const HoleMixin = {
    setValue: function(newValue) {
        var oldVal = this._value;
        this.validate(newValue);
        this._value = newValue;
        this.notify(oldVal, newValue);
        return this._value;
    }
};

var Hole = function(val) {
  // With call(), an object can use a method belonging to another object.
  Container.call(this, val);
}

var ObserverMixin = (function() {
    var _watchers = [];
    return {
        watch: function(fun) {
            _watchers.push(fun);
            return _.size(_watchers);
        },
        notify: function(oldVal, newVal) {
            _.each(_watchers, function(watcher) {
                watcher.call(this, oldVal, newVal);
            });
          return _.size(_watchers);
        }
    };
}());

var ValidateMixin = {
    addValidator: function(fun) {
        this._validator = fun;
    },
    init: function(val) {
        this.validate(val);
    },
    validate: function(val) {
        if (this._validator && !this._validator(val))
            throw("Attempted to set invalid value " + val);
    }
};

// Extend Hole with the mixins
_.extend(Hole.prototype, HoleMixin, ValidateMixin, ObserverMixin); // Same as _.assignIn()

// Create an instance of Hole and use all the mixins
var h = new Hole(42);
h.addValidator((num) => num < 1000);
h.setValue(9);
h.watch(function(old, nu) { console.log(["Changing", old, "to", nu].join(' ')); });
h.setValue(42);

