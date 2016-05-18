(function() {
  if (typeof Bomberman === 'undefined')
    window.Bomberman = {};

  var Sprite = Bomberman.Sprite = function(attributes) {
    this.pos = attributes.pos;
    this.size = attributes.size;
    // this.speed = speed;
    // this._index = 0;
    this.img = attributes.img;
    // this.once = once;
    // this.frames = frames;
  }

  Sprite.prototype.draw = function (ctx) {
    debugger;
    ctx.drawImage(resources.get(this.img), this.pos[0], this.pos[1], this.size[0],this.size[1]);
    // ctx.drawImage(resources.get(this.img), x + (1/3),y + (1/3), this.size[0] - (2/3), this.size[1] - (2/3), Math.round(this.pos[0]), Math.round(this.pos[y]), this.size[0],this.size[1]);
  };

  Sprite.prototype.something = function () {
    console.log(this.pos);
    console.log(this.size);
    // console.log(this.speed);
    // console.log(this._index);
    console.log(this.img);
    // console.log(this.once);
    // console.log(this.frames);
  };

  // Sprite.prototype.update = function(dt, gameTime) {
  //   if (gameTime && gameTime == this.lastUpdated) return;
  //   this._index += this.speed*dt;
  //   if (gameTime) this.lastUpdated = gameTime;
  // }
  //
  // Sprite.prototype.setFrame = function(frame) {
  //   this._index = frame;
  // }
  //
  // Sprite.prototype.render = function(ctx, posx, posy, vX, vY) {
  //   var frame;
  //
  //   if (this.speed > 0) {
  //     var max = this.frames.length;
  //     var idx = Math.floor(this._index);
  //     frame = this.frames[idx % max];
  //
  //     if (this.once && idx >= max) {
  //       this.done = true;
  //       return;
  //     }
  //   } else {
  //     frame = 0;
  //   }
  //
  //   var x = this.pos[0];
  //   var y = this.pos[1];
  //
  //   x += frame*this.size[0];
  //   ctx.drawImage(resources.get(this.img), x + (1/3),y + (1/3), this.size[0] - (2/3), this.size[1] - (2/3), Math.round(posx - vX), Math.round(posy - vY), this.size[0],this.size[1]);
  // }
})();
