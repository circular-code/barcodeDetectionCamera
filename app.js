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
    var barcodeDetector = new BarcodeDetector();
    var video = document.querySelector('video');

    getBarcode(barcodeDetector, video);
};

function getBarcode(barcodeDetector, video) {
    barcodeDetector.detect(video)
    .then(barcodes => {
        if (barcodes.length > 0) {
            console.log(barcodes);
            barcodes.forEach(barcode => document.getElementById('result').textContent = (barcode.rawValue));
        }
    })
    .finally(() => {
        setTimeout(() => {
            getBarcode(barcodeDetector, video);
        }, 100);
    })
    .catch(() => {
        //console.error("BarcodeDetection failed: " + e);
    });
}