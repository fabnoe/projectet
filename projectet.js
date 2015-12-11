/**
 * Created by Fabian Nöthe
 * me@fabiannoethe.com
 * www.fabiannoethe.com
 */

function FindET() {

    var walked = false
    var imageService = require('./NasaImageService.js')();
    var iteration = 1;

    function start() {
        imageService.requestImage(onImageFailure, onImageSuccess);
    }

    function restart() {
        iteration++;
        console.log("-- Iteration " + iteration + " ---")
        start();
    }

    function onImageFailure(err) {
        if (err) throw err
    }

    function onImageSuccess(url) {
        var detectionService = require('./OxfordDetectionService.js')();
        detectionService.detect(url, onDetectionFailure, onDetectionSuccess);
    }

    function onDetectionFailure(err) {
        console.log('E.T. NOT found');
        console.log('Ouuuuch! Try again');
        restart();
    }

    function onDetectionSuccess(response) {
        console.log('E.T. found!');
        console.log(response);
    }

    return {
        start: start
    }
}

module.exports = FindET


var findET = FindET()
findET.start()