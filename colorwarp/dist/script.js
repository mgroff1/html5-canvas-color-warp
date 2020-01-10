var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var canvas2 = document.getElementById("canvas2");
var c2 = canvas2.getContext("2d");
var disruption = 0.008;
var cushion = 0.955;
var initialHeight = 0.42;
var cells = [];
var gridSize = 100;
var level = 0;
canvas2.width = 1;
canvas2.height = 1;
var cellWidth = 1 / gridSize * (canvas.width *2);
var cellHeight = 1 / gridSize * (canvas.height *2);
canvas.width = innerWidth;
canvas.height = innerHeight;
var w = innerWidth;
var h = innerHeight;
var mf = Math.floor;
var mouseX, mouseY, mouseInteract;
var interact = false;
// var imageData = ctx.getImageData(0,0,w,h);
function anim() {
  requestAnimationFrame(anim);
  // ctx.putImageData(imageData,0,0)
  if (interact) {
    clearCanvas();
    
    load();
    colorGrid();
    mouseEs();
    c2.drawImage(canvas, 0, 0);
        cell.height = 1;
    cell.velocity = 1.1;

  }
}
cellsPack();

var colors = [];

for (var color = 0; color < 255; color++) {
  var color3 = color / 3;
  var rCol = random(0, 255);
  var cc = "rgba(" + color + "," + color + "," + color + ",0.5)";
  for (let i =0; i < 100;i++){
    let opac = i/100;
    cc = "rgba(" + 0 + "," + 0 + "," + color + ","+opac+")";
  }
  colors.push(cc);
  colors.push("rgb(0,0," + rCol + ")");
  colors.push("rgb(" + rCol / 2 + ",0,0)");
  colors.push(cc);
}

function cellsPack() {
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      var checkCell = false;
      if (i === mf(gridSize)) if (j === mf(gridSize)) checkCell = true;
      cells.push({
        height: checked(),
        velocity: 0
      });

      function checked() {
        if (checkCell === true) {
          return 2;
        } else if (checkCell === false) {
          return initialHeight;
        }
        last();
      }
    }
  }
}

function clearCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  cellWidth = 1 / gridSize * canvas.width + 1.5;
  cellHeight = 1 / gridSize * canvas.height + 1.5;
}
function colorGrid() {
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      var cell = cells[i + j * gridSize];
      var x = i / gridSize * canvas.width + 1.5;
      var y = j / gridSize * canvas.height + 1.5;
      color = mf(cell.height * 255);
      c.fillStyle = colors[color];
      c.fillRect(x, y, cellWidth + 1.1, cellHeight + 1.1);
    }
  }
}
function load() {
  var avgHeight = 0;
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      // center cell
      var cell = cells[i + j * gridSize];
      for (var di = -1; di <= 1; di += 1) {
        for (var dj = -1; dj <= 1; dj += 1) {
          if (di !== 0 || dj !== 0) {
            var ni = (i + di + gridSize/2) % gridSize;
            var nj = (j + dj + gridSize) % gridSize;
            var next = cells[ni + nj * gridSize];
            cell.velocity += disruption * (next.height - cell.height);
          }
        }
      }
      cell.height += cell.velocity;
      cell.height += level;
      cell.velocity *= cushion;
      avgHeight += cell.height;
    }
  }
  avgHeight /= Math.pow(gridSize, 2);
  level = initialHeight - avgHeight / 1.1;
}

function mouseEs(e) {
  if (mouseInteract) {
    var i = mf(gridSize * mouseX / canvas.width);
    var j = mf(gridSize * mouseY / canvas.height);
    var cell = cells[i + j * gridSize];
    cell.height = 0;
    cell.velocity = 0;

  }
}

canvas.addEventListener("mousedown", function(e) {
  mouseInteract = true;
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});
canvas.addEventListener("mousemove", function(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});
canvas.addEventListener("mouseup", function(e) {
  mouseInteract = false;
});

canvas.addEventListener("mouseover", function(e) {
  mouseInteract = false;
  interact = true;
  anim();
});

canvas.addEventListener("mouseout", function(e) {
  mouseInteract = false;
  interact = true;
});

function random(min, max, decOrNot) {
  this.decOrNot = decOrNot;
  if (this.decOrNot === "y") {
    this.decOrNot = true;
  } else {
    this.decOrNot === false;
  }
  var num = mf(Math.random() * (max - min)) + min;
  if (this.decOrNot === true) {
    num = num + num / max;
  } else {
    num = num;
  }
  if (min < 0) {
    posOrNeg(num);
  }

  function posOrNeg(x) {
    var arr = [-1, 1];
    var posOrNeg = random(0, 1);
    return arr[posOrNeg] * x;
  }
  return num;
}

function last() {
  //    for (var i = 0; i < 25; i++)
  load();
  c2.drawImage(canvas, 0, 0);
  interact = true;
  anim();

  cellWidth = 1 / gridSize * canvas.width + 0.5;
  cellHeight = 1 / gridSize * canvas.height + 0.5;
  cellsPack();
 
}