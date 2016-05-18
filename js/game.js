(function () {
  if (typeof Reaction === "undefined") {
    window.Reaction = {};
  }

  var Game = Reaction.Game = function (canvas) {
    this.ctx = canvas.getContext('2d');
    this.xDim = canvas.width;
    this.yDim = canvas.height;
    this.bomber = new Reaction.Bomber({vel: [0, 0], pos: [25, 25], game: this});
    this.addBlocks();
    this.addBarriers();
    this.addEnemies();
    this.loadImgs();
    this.playing = false;
  };

  Game.prototype.loadImgs = function () {
    resources.load('sprites/items.png');
    resources.load('sprites/mars.png');
    resources.load('sprites/sailor.png');
    resources.load('sprites/bomberman.png');
    resources.load('sprites/vertflames.png');
    resources.load('sprites/pinkenemy.png');

    // resources.load('sprites/ReactionDojo.png');

    // console.log('hi');
  };

  // Game.NUM_BARRIERS = 10;
  // Game.DIM_X = window.length;
  // Game.DIM_Y = window.width;
  // Game.prototype.addBomber = function () {
  //   bomber = new Reaction.Bomber({
  //     pos: this.randomPosition(),
  //     game: this
  //   });
  // };
  Game.prototype.addEnemies = function() {
    this.enemies = [];
    var pos;
    var block;
    var enemyCount = 8;

    // barrier = new Reaction.Barrier({pos: [150,50], game: this});
    // this.barriers.push(barrier);

    barrierPositions = this.barriers.map(function(barrier){
      return barrier.pos.toString();
    });
    blockPositions = this.blocks.map(function(block){
      return block.pos.toString();
    })

    var blockLength = Reaction.Barrier.LENGTH;

    for (var x = 0; x < this.xDim; x += blockLength) {
      for (var y = 0; y < this.yDim; y += blockLength) {
        if (this.enemies.length < enemyCount && Math.random() < 0.10 && (x > 3*blockLength || y > 3*blockLength)) {
          pos = [x, y];
          if (barrierPositions.indexOf(pos.toString()) === -1 && blockPositions.indexOf(pos.toString()) === -1) {
            enemy = new Reaction.Enemy({ pos: pos, game: this });
            this.enemies.push(enemy);
          }
        }
      }
    }
  };
  Game.prototype.addBlocks = function() {
    this.blocks = [];
    var pos;
    var block;

    // barrier = new Reaction.Barrier({pos: [150,50], game: this});
    // this.barriers.push(barrier);

    var blockLength = Reaction.Barrier.LENGTH;

    for (var x = 0; x < this.xDim; x += blockLength) {
      for (var y = 0; y < this.yDim; y += blockLength) {
        if (Math.random() < 0.18 && (x > 3*blockLength || y > blockLength)) {
          pos = [x, y];
          block = new Reaction.Block({ pos: pos, game: this });
          this.blocks.push(block);

        }
        // if (x % (barrierLength * 2) === 0 && y % (barrierLength * 2) === 0) {
          // debugger;
        // }
      }
    }

  };
  Game.prototype.addBarriers = function() {
    this.barriers = [];
    var pos;
    var barrier;

    // barrier = new Reaction.Barrier({pos: [150,50], game: this});
    // this.barriers.push(barrier);

    var barrierLength = Reaction.Barrier.LENGTH;

    for (var x = barrierLength; x < this.xDim; x+=2 * barrierLength) {
      for (var y = barrierLength; y < this.yDim; y+=2 * barrierLength) {
        // if (x % (barrierLength * 2) === 0 && y % (barrierLength * 2) === 0) {
          // debugger;
          pos = [x, y];
          barrier = new Reaction.Barrier({ pos: pos, game: this });
          this.barriers.push(barrier);
        // }
      }
    }
    // this.barriers.forEach(function (barrier) {
    //   barrier.draw(this.ctx);
    // }.bind(this));
  };

  // Game.prototype.setup = function (ctx) {
  //   ctx.clearRect(0, 0, this.xDim, this.yDim);
  //
  //   this.barriers.forEach(function (barrier) {
  //     barrier.draw(ctx);
  //   });
  // };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);

    ctx.fillStyle = "rgba(205, 192, 176, 1)";

    ctx.fillRect(0, 0, this.xDim,this.yDim);

    this.blocks.forEach(function (block) {
      block.draw(ctx);
    });

    this.barriers.forEach(function (barrier) {
      barrier.draw(ctx);
    });


    this.bomber.bombs.forEach(function(bomb){
      bomb.draw(ctx);
    });

    this.enemies.forEach(function(enemy){
      enemy.draw(ctx);
    });

    this.bomber.draw(ctx);
    // this.bomber.sprite.draw(ctx);
  };
  //
  // Game.prototype.moveObjects = function () {
  //   this.asteroids.forEach(function (asteroid) {
  //     asteroid.move();
  //   });
  // };

  // Game.prototype.checkCollisions = function () {
  //   var that = this;
  //
  //   this.asteroids.forEach(function (asteroid1) {
  //     that.asteroids.forEach(function (asteroid2) {
  //       if (asteroid1 !== asteroid2) {
  //         if (asteroid1.isCollidedWith(asteroid2)) {
  //           console.log("COLLISION");
  //           asteroid1.collideWith(asteroid2);
  //         }
  //       }
  //     });
  //   });
  // };
  //
  Game.prototype.step = function () {
    this.handleInput();
    // this.moveObjects();
    // this.checkCollisions();
    // this.enemies.forEach(function(enemy){
    //   enemy.move();
    // })
  };
  Game.prototype.handleInput = function (dt) {
    var bomber = this.bomber;

    // if (player.piping || player.dying || player.noInput) return; //don't accept input

    if (input.isDown('SPACE')) {
      bomber.addBomb(this.ctx);
    } else {
      //we need this to handle the timing for how long you hold it
      // player.noJump();
    }


    if (input.isDown('LEFT')) { // 'd' or left arrow
      bomber.move([-3,  0]);
    } else if (input.isDown('RIGHT')) { // 'k' or right arrow
      bomber.move([3,  0]);
    } else if (input.isDown('UP')) { // 'k' or right arrow
      bomber.move([0,  -3]);
    } else if (input.isDown('DOWN')) { // 'k' or right arrow
      bomber.move([0,  3]);
    } else {
      bomber.move([0,  0]);
    }
  }
  //
  // Game.prototype.remove = function (asteroid) {
  //   var index = this.asteroids.indexOf(asteroid);
  //   this.asteroids.splice(index, 1);
  // };

})();
