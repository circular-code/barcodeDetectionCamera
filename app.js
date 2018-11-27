'use strict';

var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

var button = document.querySelector('button');
button.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
};

var constraints = { audio: false, video: { facingMode: { exact: "environment" } } };

function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

// jshint -W119
window.onload = () => {
    video.addEventListener('click', function(e) {

        var barcodeDetector = new BarcodeDetector();
        barcodeDetector.detect(e.target)
            .then(barcodes => {
                barcodes.forEach(barcode => document.getElementById('result').textContent = (barcode.rawValue));
            })
            .catch((e) => {
                console.error("BarcodeDetection failed: " + e);
            });
    });
};