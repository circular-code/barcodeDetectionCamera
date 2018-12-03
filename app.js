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
    var video = document.querySelector('video');
    getBarcode(video);
};

function getBarcode(video) {
    var barcodeDetector = new BarcodeDetector();
    barcodeDetector.detect(video)
    .then(barcodes => {
        if (barcodes.length > 0) {
            console.log(barcodes);
            barcodes.forEach(barcode => document.getElementById('result').textContent = (barcode.rawValue));
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