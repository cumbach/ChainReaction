(function() {
  if (typeof Reaction === "undefined") {
    window.Reaction = {};
  }

  var GameView = Reaction.GameView = function (canvas) {
    this.game = new Reaction.Game (canvas);
    this.ctx = canvas.getContext('2d');
    this.xDim = canvas.width;
    this.yDim = canvas.height;
  };
  GameView.prototype.newGame = function (canvas) {
    this.game = new Reaction.Game (canvas);
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.start = function (canvas) {
    var img = document.createElement('IMG');
    img.src = "assets/bomberintro.png";
    var welcome = document.getElementsByClassName('welcome')[0];
    welcome.appendChild(img);

    requestAnimationFrame(this.animate.bind(this));
  };
  GameView.prototype.animate = function(){

    if (this.game.bomber.alive && this.game.playing){
      this.game.step();
      if (resources.isReady()) {
        this.game.draw(this.ctx);
      }
      requestAnimationFrame(this.animate.bind(this));

    } else if (!this.game.bomber.alive && this.game.playing){
      var canvasEl = document.getElementsByTagName("canvas")[0];
      this.newGame(canvasEl);

    } else {
      this.ctx.fillStyle = "rgba(205, 192, 176, 1)";
      this.ctx.fillRect(0, 0, this.xDim,this.yDim);

      if (input.isDown('SHIFT')) {
        this.game.playing = true;
        var instructions = document.getElementsByClassName('instructions')[0];
        var welcome = document.getElementsByClassName('welcome')[0];
        if (instructions.hasChildNodes()) {
          var gameover = document.getElementsByTagName('h2')[0];
          instructions.removeChild(gameover);
        }
        if (welcome.hasChildNodes()) {
          var image = document.getElementsByTagName('img')[0];
          welcome.removeChild(image);
        }
      }
      requestAnimationFrame(this.animate.bind(this));
    }
  };





})();
