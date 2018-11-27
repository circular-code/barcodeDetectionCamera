// jshint -W119
'use strict';

var video = document.querySelector('video');
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