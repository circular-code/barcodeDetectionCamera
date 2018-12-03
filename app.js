// jshint -W119
'use strict';

var video = document.querySelector('video');
var canvas = document.getElementById("myCanvas");
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
    canvas.height = window.innerHeight - 40;
    getBarcode(video);
};

function getBarcode(video) {
    var barcodeDetector = new BarcodeDetector();
    barcodeDetector.detect(video)
    .then(barcodes => {
        if (barcodes.length > 0) {
            console.log(barcodes);
            barcodes.forEach(barcode => document.getElementById('result').textContent = (barcode.rawValue));
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.clearRect(0,0,c.width, c.height);
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