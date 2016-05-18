(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Block = Bomberman.Block = function (attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.color = Block.COLOR;
    this.length = Block.LENGTH;
    this.location = [279, 102];
    this.sprite = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [this.location], size: [23,22]})

    // Bomberman.StaticObject.call(this, attributes);
  };

  Block.COLOR = "pink";
  Block.LENGTH = 50;

  Block.prototype.draw = function (ctx) {
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

  Block.prototype.destroyBlock = function () {
    this.location = [303, 106];

    setTimeout(function(){
      this.location = [327, 106];
    }.bind(this), 300);

    setTimeout(function(){
      this.game.blocks.splice(this.game.blocks.indexOf(this),1)
    }.bind(this), 600);
  };





  // Bomberman.Util.inherits(Bomberman.Block, Bomberman.StaticObject);

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
