// 길 모양 도형을 그리는 클래스

function Boundary(x, y, w, h, a) {
  var options = {
    friction: 0,
    restitution: 0,
    angle: a,
    isStatic: true,
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(0, 0, this.w, this.h);
    pop();
  };
}
