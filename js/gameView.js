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
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function(){
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  };





})();
