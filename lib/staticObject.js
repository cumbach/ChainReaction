(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var StaticObject = Bomberman.StaticObject = function(attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.length = attributes.length,
    this.color = attributes.color
  };

  StaticObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(
      this.pos[0],
      this.pos[1],
      this.length,
      this.length
    );

  };

  //
  // StaticObject.prototype.isCollidedWith = function (otherObject) {
  //   var distance = Bomberman.Util.distance(this, otherObject);
  //   var radiusSum = this.radius + otherObject.radius;
  //   return radiusSum > distance;
  // };
  //
  // StaticObject.prototype.collideWith = function (otherObject) {
  //   this.game.remove(this);
  //   otherObject.game.remove(otherObject);
  // };

})();
