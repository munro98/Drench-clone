

//<body onresize="tick()">
var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");
var cells = new Array();
var cells2 = new Array();


var mouseDown = false;

var zoom = 40;
var width = 14;

var colors = new Array();
colors.push("rgb(255, 0, 0)");
colors.push("rgb(0, 255, 0)");
colors.push("rgb(0, 0, 255)");
colors.push("rgb(255, 255, 0)");
colors.push("rgb(255, 0, 255)");


for (var i = 0; i < width; i++) {
    cells.push(new Array());
    for (var j = 0; j < width; j++) {
      cells[i].push(false);
    }
    
}

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

for (var i = 0; i < width; i++) {
  for (var j = 0; j < width; j++) {

      var random = parseInt(Math.random() * colors.length);
      cells[i][j] = random;
      ctx.fillStyle = colors[random];

      ctx.fillRect(40 + i*zoom, 40+j*zoom,zoom,zoom);
    } 
}


function updateCells(i, j) {
  //Top

  if (j - 1 >= 0) {
    if (cells[i][j - 1] === cells2[i][j]) {
        cells[i][j - 1] = cells[i][j];
        updateCells(i, j -1);
    }
  }

  //Left Cell
  if (i - 1 >= 0) {
      if (cells[i - 1][j] === cells2[i][j]) {
        cells[i - 1][j] = cells[i][j];
        updateCells(i - 1, j);
      }
  }

  //Right Cell
  if (i + 1 < width) {
    if (cells[i + 1][j] === cells2[i][j]) {
        cells[i + 1][j] = cells[i][j];
        updateCells(i + 1, j);
    }
  }
  
  //Bottom
  if (j + 1 < width) {
    if (cells[i][j + 1] === cells2[i][j]) {
        cells[i][j + 1] = cells[i][j];
        updateCells(i, j + 1);
    }
  }
}


function update(colorIndex) {

  if (cells[0][0] == colorIndex) {
    return;
  }

  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  

  cells2 = new Array();
  for (var i = 0; i < width; i++) {
    cells2.push(new Array());
    for (var j = 0; j < width; j++) {
      cells2[i].push(cells[i][j]);
    }
  }


  cells[0][0] = colorIndex;
  updateCells(0, 0);


  for (var i = 0; i < width; i++) {
    for (var j = 0; j < width; j++) {
      ctx.fillStyle = colors[cells[i][j]];
      ctx.fillRect(40 + i*zoom, 40+j*zoom,zoom,zoom);
      } 
  }
}

function setRed() {
  update(0);
}

function setGreen() {
  update(1);
}

function setBlue() {
  update(2);
}

function setYellow() {
  update(3);
}

function setPurple() {
  update(4);
}
