(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Barrier = Bomberman.Barrier = function (attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.color = Barrier.COLOR;
    this.length = Barrier.LENGTH;
    this.location = [254, 101];
    this.sprite = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [this.location], size: [23,22]})

    // Bomberman.StaticObject.call(this, attributes);
  };

  Barrier.COLOR = "black";
  Barrier.LENGTH = 50;

  Barrier.prototype.draw = function (ctx) {

    this.sprite.draw(ctx, this.pos, this.location);
    // ctx.fillStyle = this.color;
    //
    // ctx.fillRect(
    //   this.pos[0],
    //   this.pos[1],
    //   this.length,
    //   this.length
    // );

  };

  // Bomberman.Util.inherits(Bomberman.Barrier, Bomberman.StaticObject);

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
