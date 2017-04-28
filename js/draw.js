var oldX = 0;
var oldY = 0;
var drawFlag = false;
var brushSize = 1;
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
    // カラーパレット初期化
    $("#colorPalet div").click(function(e){
        penColor = colorList[this.id];
    });
    // ブラシサイズの設定を行うスライダー
    $("#slider").slider({
        min: 0,
        max: 100, // ブラシの最大サイズ
        value : 1,  // 最初のブラシサイズ
        slide : function(evt, ui){
            brushSize = ui.value; // ブラシサイズを設定
        }
    });
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

    // キャンバスを取り出す
    var fgCanvas = document.getElementById('fgCanvas');
    // 2Dのコンテキストを取り出す
    var fgContext = fgCanvas.getContext('2d');
    // 指定の色で範囲内を塗りつぶす
    fgContext.fillStyle = "rgba(0, 0, 0, 0)";
    fgContext.fillRect(0, 0, 640, 480);
    fgCanvas.opacity = 0.5;
    // fgContext.globalCompositeOperation = 'source-out';
}
