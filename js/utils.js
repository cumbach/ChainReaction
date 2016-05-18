(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  Bomberman.Util = {};

  Bomberman.Util.inherits = function (childClass, parentClass) {
    function Surrogate () {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  };

  Bomberman.Util.distance = function(object1, object2) {
    var x1 = object1.pos[0];
    var y1 = object1.pos[1];
    var x2 = object2.pos[0];
    var y2 = object2.pos[1];
    return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
  };
})();
