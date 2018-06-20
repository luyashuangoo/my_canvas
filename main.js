
var yyy = document.getElementById("canvas");
var context = yyy.getContext("2d");
var lineWidth = 5;

autoSetCanvasSize(yyy);

listenToMouse(yyy);

var eraserEnabled = false
brush.onclick = function(){
  eraserEnabled = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  brush.classList.remove('active')
}
//多种颜色的画笔

red.onclick = function(){
  context.strokeStyle = "red"
  red.classList.add('active')
  yellow.classList.remove('active')
  blue.classList.remove('active') 
}
yellow.onclick = function(){
  context.strokeStyle = "yellow"
  yellow.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active') 
}
blue.onclick = function(){
  context.strokeStyle = "blue"
  blue.classList.add('active')
  yellow.classList.remove('active')
  red.classList.remove('active') 
}

//删除
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height); 
}

//笔尖粗细
thin.onclick = function(){
  lineWidth = 4;
}
thick.onclick = function(){
  lineWidth = 7;
}

//保存笔迹
save.onclick = function(){
  var url = yyy.toDataURL("image/png")
  console.log('url')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = "My picture"
  a.target = "_black"
  a.click()

}
/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize();

  window.onresize = function() {
    setCanvasSize();
  };

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;

    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

function drawCircle(x, y, radius) {
  context.beginPath();
  context.fillStyle = "black";
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1); // 起点
  context.lineWidth = lineWidth;
  context.lineTo(x2, y2); // 终点
  context.stroke();
  context.closePath();
}

function listenToMouse(canvas) {
  var using = false;
  var lastPoint = {
    x: undefined,
    y: undefined
  };

  //特性检测
if(document.body.ontouchstart !== undefined){
  //触屏设备
  canvas.ontouchstart = function(aaa){
    var x = aaa.touches[0].clientX;
    var y = aaa.touches[0].clientY;
    using = true;
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10);
    } else {
      lastPoint = {
        x: x,
        y: y
      };
    }
  }
  canvas.ontouchmove = function(aaa){
    var x = aaa.touches[0].clientX;
    var y = aaa.touches[0].clientY;

    if (!using) {
      return;
    }

    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10);
    } else {
      var newPoint = {
        x: x,
        y: y
      };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  }
  canvas.ontouchend = function(aaa){
    using = false;
  }
  }else{
    //鼠标设备
  canvas.onmousedown = function(aaa) {
    var x = aaa.clientX;
    var y = aaa.clientY;
    using = true;
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10);
    } else {
      lastPoint = {
        x: x,
        y: y
      };
    }
  };
  canvas.onmousemove = function(aaa) {
    var x = aaa.clientX;
    var y = aaa.clientY;

    if (!using) {
      return;
    }

    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10);
    } else {
      var newPoint = {
        x: x,
        y: y
      };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  };
  canvas.onmouseup = function(aaa) {
    using = false;
  };
}
}