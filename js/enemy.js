(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Enemy = Bomberman.Enemy = function (attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.color = Enemy.COLOR;
    this.length = Enemy.LENGTH;
    this.radius = 24;
    this.location = [0, 0];
    this.sprite = new Bomberman.Sprite({img: 'sprites/pinkenemy.png', loc: [this.location], size: [26,25]})
    this.startMoving();
    this.blocked = false;
    this.locationHolder = 0;

    // Bomberman.StaticObject.call(this, attributes);
  };

  Enemy.COLOR = "pink";
  Enemy.LENGTH = 50;


  Enemy.prototype.draw = function (ctx) {
    this.sprite.draw(ctx, this.pos, this.location);
  };

  Enemy.prototype.startMoving = function (ctx) {
    this.chooseDir();

    setInterval(function(){
      this.move();
      this.animate();
    }.bind(this), 25)
  };
  Enemy.prototype.chooseDir = function (ctx) {
    var rand = Math.random();
    if (rand < .25) {
      this.vel = [1,0]
    } else if (rand < .5) {
      this.vel = [-1,0]
    } else if (rand < .75) {
      this.vel = [0,1]
    } else if (rand >= .75) {
      this.vel = [0,-1]
    }
  };
  Enemy.prototype.animate = function (ctx) {
    if(!this.exploded) {
      this.locationHolder += 1;
      if (this.locationHolder % 15 ===  0) {
        this.location[0] += 24;
      }

      if (this.locationHolder % 45 === 0) {
        this.locationHolder = 0;
        this.location[0] = 0

      }
    }
  };
  Enemy.prototype.move = function (ctx) {
    if(this.inBoard(this.vel) && this.notBlocked(this.vel)) {
      if (this.exploded || !this.game.bomber.movable) {
        this.vel = [0,0];
      }
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    } else {
      this.chooseDir();
    }
  };
  Enemy.prototype.inBoard = function (vel) {
    if (0 <= this.pos[0] + vel[0] &&
        this.pos[0] + vel[0] + this.length < this.game.xDim &&
        0 <= this.pos[1] + vel[1] &&
        this.pos[1] + vel[1] + this.length < this.game.yDim) {
      return true;
    } else {
      // debugger;
      return false;
    }
  };
  Enemy.prototype.notBlocked = function (vel) {
    this.center = [this.pos[0] + 25, this.pos[1] +25]

    this.bool = true;

    this.game.barriers.forEach(function(barrier){
      if (this.center[0] + this.radius + vel[0] > barrier.pos[0] &&
          this.center[0] - this.radius + vel[0] < barrier.pos[0] + barrier.length &&
          this.center[1] + this.radius + vel[1] > barrier.pos[1] &&
          this.center[1] - this.radius + vel[1] < barrier.pos[1] + barrier.length
        ) {
          this.bool = false;
      }
    }.bind(this))

    this.game.blocks.forEach(function(block){
      if (this.center[0] + this.radius + vel[0] > block.pos[0] &&
          this.center[0] - this.radius + vel[0] < block.pos[0] + block.length &&
          this.center[1] + this.radius + vel[1] > block.pos[1] &&
          this.center[1] - this.radius + vel[1] < block.pos[1] + block.length
        ) {
          this.bool = false;
      }
    }.bind(this))

    this.game.bomber.bombs.forEach(function(bomb){
      if (this.center[0] + this.radius + vel[0] > bomb.pos[0] - bomb.radius &&
          this.center[0] - this.radius + vel[0] < bomb.pos[0] + bomb.radius &&
          this.center[1] + this.radius + vel[1] > bomb.pos[1] - bomb.radius &&
          this.center[1] - this.radius + vel[1] < bomb.pos[1] + bomb.radius
        ) {
          this.bool = false;
      }
    }.bind(this))

    return this.bool;
  };

  Enemy.prototype.destroyEnemy = function () {
    this.location = [72, 0];
    this.exploded = true;

    setTimeout(function(){
      this.game.enemies.splice(this.game.enemies.indexOf(this), 1);
    }.bind(this), 600);
  };

  // Bomberman.Util.inherits(Bomberman.Enemy, Bomberman.StaticObject);

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
