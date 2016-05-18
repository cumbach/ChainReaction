(function () {
  if (typeof Bomberman === "undefined") {
    window.Bomberman = {};
  }

  var Bomber = Bomberman.Bomber = function(attributes) {
    this.game = attributes.game,
    this.pos = attributes.pos,
    this.radius = Bomber.RADIUS,
    this.length = 50,
    this.color = Bomber.COLOR,
    this.bombs = [],
    this.alive = true,
    this.ctx = attributes.game.ctx,
    this.location = [228, 3],
    this.movable = true,
    this.count = 0;
    this.sprite = new Bomberman.Sprite({img: 'sprites/bomberman.png', loc: [this.location], size: [26,33], area: [50,46]})
  };

  Bomber.COLOR = "white";
  Bomber.RADIUS = 23;
  var locationHolder = 0;
  var movingDir = "down";

  Bomber.prototype.draw = function (ctx) {
    // mario sprite
    // ctx.drawImage(resources.get(this.sprite.img), 80, 32, 16,16, this.pos[0]-23, this.pos[1]-23, 50, 50);
    newPos = this.pos.slice(0);
    newPos[0] -= 23;
    newPos[1] -= 23;
    // this.location[0] = [73 + (this.location[0] % 300)];
    // this.location = [113, 125];
    this.sprite.draw(ctx, newPos, this.location);
    // Bomber.LOCATION[0] += 25;
    // Bomber.LOCATION[1] += 25;


    // this is the code for the old circle bomber
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();

  };
  Bomber.prototype.destroyBomber = function () {
    this.location = [351, 40];
    this.movable = false;

    if (this.count === 0) {
      var gameover = document.createElement('h2');
      gameover.innerHTML = 'GAME OVER press shift to play again';
      var instructions = document.getElementsByClassName('instructions')[0];
      instructions.appendChild(gameover);
      this.count += 1;
    }


    setTimeout(function(){
      this.alive = false;
    }.bind(this), 1000);

  };

  Bomber.prototype.move = function(vel) {
    var inBarrier = false;

    // forces sliding when bumping into barriers
    this.game.barriers.forEach(function(barrier){
      if (this.pos[0] + this.radius + vel[0] > barrier.pos[0] &&
          this.pos[0] - this.radius + vel[0] < barrier.pos[0] + barrier.length &&
          this.pos[1] + this.radius + vel[1] > barrier.pos[1] &&
          this.pos[1] - this.radius + vel[1] < barrier.pos[1] + barrier.length
        ) {
          if (vel[0] > 0 || vel[0] < 0) {
            if (this.pos[1] < barrier.pos[1] + barrier.length/2) {
              vel = [0,-3];
            } else {
              vel = [0,3];
            }
          } else if (vel[1] > 0 || vel[1] < 0) {
            if (this.pos[0] < barrier.pos[0] + barrier.length/2) {
              vel = [-3,0];
            } else {
              vel = [3,0];
            }
          }
      }
    }.bind(this))

    var blocked = false;
    this.game.blocks.forEach(function(block){
      if (this.pos[0] + this.radius + vel[0] > block.pos[0] &&
          this.pos[0] - this.radius + vel[0] < block.pos[0] + block.length &&
          this.pos[1] + this.radius + vel[1] > block.pos[1] &&
          this.pos[1] - this.radius + vel[1] < block.pos[1] + block.length) {
        blocked = true;
      }
    }.bind(this))

    this.game.bomber.bombs.forEach(function(bomb){
      if (this.pos[0] + this.radius + vel[0] > bomb.pos[0] - bomb.radius &&
          this.pos[0] - this.radius + vel[0] < bomb.pos[0] + bomb.radius &&
          this.pos[1] + this.radius + vel[1] > bomb.pos[1] - bomb.radius &&
          this.pos[1] - this.radius + vel[1] < bomb.pos[1] + bomb.radius) {
        if (this.pos[0] + this.radius > bomb.pos[0] - bomb.radius &&
            this.pos[0] - this.radius < bomb.pos[0] + bomb.radius &&
            this.pos[1] + this.radius > bomb.pos[1] - bomb.radius &&
            this.pos[1] - this.radius < bomb.pos[1] + bomb.radius) {
          // blocked = false;
        } else {
          blocked = true;
        }
      }
    }.bind(this))

    this.game.enemies.forEach(function(enemy){
      if (this.pos[0] + this.radius + vel[0] > enemy.pos[0] + 10 &&
          this.pos[0] - this.radius + vel[0] < enemy.pos[0] + enemy.length - 10 &&
          this.pos[1] + this.radius + vel[1] > enemy.pos[1] + 10 &&
          this.pos[1] - this.radius + vel[1] < enemy.pos[1] + enemy.length - 10) {
        this.destroyBomber();
      }
    }.bind(this))

    // animate bomber
    if (this.movable) {
      if (vel[1] > 0) {
        this.moveAvatarDown();
      } else if (vel[1] < 0){
        this.moveAvatarUp();
      } else if (vel[0] < 0) {
        this.moveAvatarLeft();
      } else if (vel[0] > 0) {
        this.moveAvatarRight();
      } else {
        // this.location = [228, 3];
      }
    }

    if (this.inBoard(vel) && !blocked && this.movable) {
      this.pos[0] += vel[0];
      this.pos[1] += vel[1];
    }

  };
  Bomber.prototype.moveAvatarLeft = function () {

    if (movingDir != "left") {
      this.location[0] = 396;
      movingDir = "left";
    }

    locationHolder += 1;
    if (locationHolder % 15 ===  0) {
      this.location[0] += 25;
    }
    if (locationHolder === 45) {
      this.location[0] = 396;
      locationHolder = 15;
    }
  };
  Bomber.prototype.moveAvatarRight = function () {
    if (movingDir != "right") {
      movingDir = "right";
      this.location[0] = 467;
      locationHolder = 15;
    }

    locationHolder += 1;
    if (locationHolder % 15 ===  0) {
      this.location[0] += 25;
    }
    if (locationHolder === 45) {
      this.location[0] = 467;
      locationHolder = 15;
    }
  };
  Bomber.prototype.moveAvatarUp = function () {
    if (movingDir != "up") {
      this.location[0] = 325;
      movingDir = "up";
    }

    locationHolder += 1;
    if (locationHolder % 15 ===  0) {
      this.location[0] += 25;
    }
    if (locationHolder === 45) {
      this.location[0] = 325;
      locationHolder = 15;
    }
  };
  Bomber.prototype.moveAvatarDown = function () {
    if (movingDir != "down") {
      movingDir = "down";
      this.location[0] = 228;
    }

    locationHolder += 1;
    if (locationHolder % 15 ===  0) {
      this.location[0] += 25;
    }
    if (locationHolder === 45) {
      this.location[0] = 251;
      locationHolder = 15;
    }
  };
  Bomber.prototype.inBoard = function (vel) {
    if (0 + Bomber.RADIUS < this.pos[0] + vel[0] &&
        this.pos[0] + vel[0] + Bomber.RADIUS < this.game.xDim &&
        0 + Bomber.RADIUS < this.pos[1] + vel[1] &&
        this.pos[1] + vel[1] + Bomber.RADIUS < this.game.yDim) {
      return true;
    } else {
      return false;
    }
  };
  Bomber.prototype.addBomb = function (ctx) {
    var bomber = this;
    var isTouching = false;

    // checks to make sure multiple bombs arent laid at same location
    this.bombs.forEach(function(bomb){
      var distance = Bomberman.Util.distance(bomber, bomb);
      var radiusSum = bomber.radius + bomb.radius;
      if (radiusSum > distance) {
        isTouching = true;
      }
    })

    // decouples from bomber position and places in correct slots
    var barrierLength = this.game.barriers[0].length
    var newPos = this.pos.slice(0);
    newPos[0] = Math.floor(newPos[0]/barrierLength) * barrierLength + barrierLength/2;
    newPos[1] = Math.floor(newPos[1]/barrierLength) * barrierLength + barrierLength/2;

    if (!isTouching) {
      var bomb = new Bomberman.Bomb({pos: newPos, game: this.game})
      this.bombs.push(bomb);
      // this.sprite.something();

      setTimeout(function(){
        bomb.explode(this.ctx);
      }.bind(this), 2200);

      setTimeout(function(){
        this.bombs.shift();
      }.bind(this), 2700);


    }
  };

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
