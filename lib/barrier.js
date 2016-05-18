(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Barrier = Bomberman.Barrier = function (attributes) {
    attributes.color = Barrier.COLOR;
    attributes.length = Barrier.LENGTH;

    Bomberman.StaticObject.call(this, attributes);
  };

  Barrier.COLOR = "black";
  Barrier.LENGTH = 50;

  Bomberman.Util.inherits(Bomberman.Barrier, Bomberman.StaticObject);

})();
