var canvas = document.querySelector("canvas");
var angleSlider = document.getElementById("angleSlider");
var depthSlider = document.getElementById("depthSlider");
var resetButton = document.getElementById("resetButton");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
console.log(canvas);

var angle = 45;
var length = canvas.height / 4;
var depth = 9;
let PI = Math.PI;
let rainbow = [
  "#FFFFFF", // BROWN
  "#FFFFFF", // BROWN
  "#FFFFFF", // BROWN
  "#FFFFFF", // G
  "#FFFFFF", // B
  "#FFFFFF", // I
  "#FFFFFF" // V
];
var origin = { x: canvas.width / 2 - length / 2, y: 4 * length };

var root = {
  p0: { x: origin.x, y: origin.y - length },
  p1: { x: origin.x + length, y: origin.y - length },
  p2: { x: origin.x + length, y: origin.y },
  p3: { x: origin.x, y: origin.y }
};

function drawTree(root, length, depth, a, b, colorPicker) {
  if (depth == 0) {
    return;
  }

  var t = (a / 180) * PI;
  var tc = (b / 180) * PI;

  var lengthA = length * Math.cos((angle / 180) * PI);
  var lengthB = length * Math.cos(((90 - angle) / 180) * PI);

  var left = {
    p0: {
      x: root.p0.x - lengthA * Math.cos(tc),
      y: root.p0.y - lengthA * Math.sin(tc)
    },

    p1: {
      x: root.p0.x + lengthA * Math.cos(t) - lengthA * Math.sin(t),
      y: root.p0.y - lengthA * Math.sin(t) - lengthA * Math.cos(t)
    },

    p2: {
      x: root.p0.x + lengthA * Math.cos(t),
      y: root.p0.y - lengthA * Math.sin(t)
    },

    p3: { x: root.p0.x, y: root.p0.y }
  };

  var right = {
    p3: {
      x: root.p1.x - lengthB * Math.cos(tc),
      y: root.p1.y - lengthB * Math.sin(tc)
    },

    p2: { x: root.p1.x, y: root.p1.y },

    p1: {
      x: root.p1.x + lengthB * Math.cos(t),
      y: root.p1.y - lengthB * Math.sin(t)
    },

    p0: {
      x: root.p1.x - lengthB * Math.cos(tc) + lengthB * Math.sin(tc),
      y: root.p1.y - lengthB * Math.sin(tc) - lengthB * Math.cos(tc)
    }
  };

  c.beginPath();
  c.moveTo(root.p0.x, root.p0.y);
  c.lineTo(root.p1.x, root.p1.y);
  c.lineTo(root.p2.x, root.p2.y);
  c.lineTo(root.p3.x, root.p3.y);
  c.lineTo(root.p0.x, root.p0.y);
  c.strokeStyle = rainbow[colorPicker];
  c.stroke();

  c.beginPath();
  c.moveTo(left.p0.x, left.p0.y);
  c.lineTo(left.p1.x, left.p1.y);
  c.lineTo(left.p2.x, left.p2.y);
  c.lineTo(left.p3.x, left.p3.y);
  c.lineTo(left.p0.x, left.p0.y);
  c.strokeStyle = rainbow[colorPicker];
  c.stroke();

  c.beginPath();
  c.moveTo(right.p0.x, right.p0.y);
  c.lineTo(right.p1.x, right.p1.y);
  c.lineTo(right.p2.x, right.p2.y);
  c.lineTo(right.p3.x, right.p3.y);
  c.lineTo(right.p0.x, right.p0.y);
  c.strokeStyle = rainbow[colorPicker];
  c.stroke();

  drawTree(left, lengthA, depth - 1, a + angle, b - angle, colorPicker + 1);
  drawTree(
    right,
    lengthB,
    depth - 1,
    angle - b,
    b + (90 - angle),
    colorPicker + 1
  );
}

angleSlider.oninput = function() {
  angle = Number(this.value);
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawTree(root, length, depth, angle, 90 - angle, 0);
};

depthSlider.oninput = function() {
  depth = this.value;
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawTree(root, length, depth, angle, 90 - angle, 0);
};

resetButton.onclick = function() {
  angle = 45;
  depth = 9;
  angleSlider.value = 45;
  depthSlider.value = 9;
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawTree(root, length, depth, angle, 90 - angle, 0);
};

resetButton.onmousedown = function() {
  resetButton.style.color = "#878787";
};

resetButton.onmouseup = function() {
  resetButton.style.color = "#FFFFFF";
};

drawTree(root, length, depth, angle, 90 - angle, 0);
