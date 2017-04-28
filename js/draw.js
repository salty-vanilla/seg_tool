var oldX = 0;
var oldY = 0;
var drawFlag = false;
var brushSize = 1;
var brushSizeMin = 1;
var brushSizeMax = 100;
var colorList = {
    "black"   : "rgba(0,0,0,1)",
    "blue"    : "rgba(0,0,255,1)",
    "red"     : "rgba(255,0,0,1)",
    "magenta" : "rgba(255,0,255,1)",
    "green"   : "rgba(0,255,0,1)",
    "cyan"    : "rgba(0,255,255,1)",
    "yellow"  : "rgba(255,255,0,1)",
    "white"   : "rgba(255,255,255,1)"
}
var penColor = "rgba(255,0,0,1)";
window.addEventListener("load", function(){
    var can = document.getElementById("fgCanvas");
    can.addEventListener("mousemove", draw, true);
    can.addEventListener("mousedown", function(e){
        drawFlag = true;
        var rect = e.target.getBoundingClientRect();
        oldX = e.clientX - rect.left;
        oldY = e.clientY - rect.top;
    }, true);
    can.addEventListener("mouseup", function(){   
        drawFlag = false;
    }, true);
	// ------------------------------------------------------------
	// ホイールを操作すると実行されるイベント
	// ------------------------------------------------------------
	document.addEventListener("mousewheel" , function (e){
		brushSize -= e.deltaY / 100;
        console.log(brushSize)
        if(brushSize < brushSizeMin){
            brushSize = brushSizeMin;
        } 
        else if(brushSize > brushSizeMax){
            brushSize = brushSizeMax;
        }
	});
    // コンテキストメニューを表示するイベント時のコールバック
    can.addEventListener("contextmenu", function(e){
        // デフォルトイベントをキャンセル
        // これを書くことでコンテキストメニューが表示されなくなります
        e.preventDefault();
    }, false);
}, true);
// 描画処理
function draw(e){
    if (!drawFlag) return;

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    console.log(x, y, oldX, oldY)
    var can = document.getElementById("fgCanvas")
    var context = can.getContext("2d");
    context.strokeStyle = penColor;
    context.lineWidth = brushSize;
    context.lineJoin= "round";  // 連結部分を丸にする
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(oldX, oldY);
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
    oldX = x;
    oldY = y;
}
// 保存処理　(Canvas2Image)
//　http://www.nihilogic.dk/labs/canvas2image/
function saveData(){
    var can = document.getElementById("fgCanvas");
    Canvas2Image.saveAsPNG(can);    // PNG形式で保存
}
function init() {
    // キャンバスを取り出す
    var bgCanvas = document.getElementById('bgCanvas');
    // 2Dのコンテキストを取り出す
    var bgContext = bgCanvas.getContext('2d');

    var img = new Image();
    img.src = "./lenna.png";
    img.onload = function() {
      bgContext.drawImage(img, 0, 0);
    }
}