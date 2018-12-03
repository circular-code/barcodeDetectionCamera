// jshint -W119
'use strict';

var video = document.querySelector('video');
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var constraints = { audio: false, video: { facingMode: { exact: "environment" } } };

function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

window.onload = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    getBarcode(video);
};

function getBarcode(video) {
    var barcodeDetector = new BarcodeDetector();
    barcodeDetector.detect(video)
    .then(barcodes => {
        if (barcodes.length > 0) {
            drawBoard();
            console.log(barcodes);
            barcodes.forEach(barcode => document.getElementById('result').textContent = (barcode.rawValue));
            ctx.clearRect(0,0,canvas.width, canvas.height);
            var detectedBarcode = barcodes[0];
            var cornerPoints = detectedBarcode.cornerPoints;
            ctx.beginPath();
            ctx.moveTo(cornerPoints[0].x,cornerPoints[0].y);
            ctx.lineTo(cornerPoints[1].x,cornerPoints[1].y);
            ctx.lineTo(cornerPoints[2].x,cornerPoints[2].y);
            ctx.lineTo(cornerPoints[3].x,cornerPoints[3].y);
            ctx.lineTo(cornerPoints[0].x,cornerPoints[0].y);
            ctx.strokeStyle="#0000ff";
            ctx.stroke();
            // ctx.rect(20, 20, 150, 100);
            // ctx.stroke();
        }
    })
    .finally(() => {
        setTimeout(() => {
            getBarcode(video);
        }, 100);
    })
    .catch(() => {
        //console.error("BarcodeDetection failed: " + e);
    });
}

function drawBoard () {
    //grid width and height
    var bw = 400;
    var bh = 400;

    ctx.globalAlpha=0.2;

    for (var x = 0; x <= bw; x += 40) {
        ctx.moveTo(0.5 + x, 0);
        ctx.lineTo(0.5 + x, bh + 0);
    }

    for (var y = 0; y <= bh; y += 40) {
        ctx.moveTo(0, 0.5 + y);
        ctx.lineTo(bw, 0.5 + y );
    }

    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.globalAlpha=1;
}

