(function() {
  if (typeof Reaction === 'undefined')
    window.Reaction = {};

  var Sprite = Reaction.Sprite = function(attributes) {
    this.loc = attributes.loc;
    this.size = attributes.size;
    // this.speed = speed;
    // this._index = 0;
    this.img = attributes.img;
    attributes.area ? this.area = attributes.area : this.area = [50,50]
    // this.once = once;
    // this.frames = frames;
  }

  Sprite.prototype.draw = function (ctx, pos, location) {
    debugger;
    if (typeof location === 'undefined') {
      ctx.drawImage(resources.get(this.img), this.loc[0], this.loc[1], this.size[0],this.size[1], pos[0], pos[1], this.area[0], this.area[1]);
    } else {
      ctx.drawImage(resources.get(this.img), location[0], location[1], this.size[0],this.size[1], pos[0], pos[1], this.area[0], this.area[1]);
    }
  };

  // Sprite.prototype.drawFlames = function (ctx, pos, location, area) {
  //   ctx.drawImage(resources.get(this.img), location[0], location[1], this.size[0],this.size[1], pos[0], pos[1], area[0], area[1]);
  // };

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
