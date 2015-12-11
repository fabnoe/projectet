/**
 * Created by Fabian Nöthe
 * me@fabiannoethe.com
 * www.fabiannoethe.com
 */

var request = require('request');

function NasaImageService() {

    // Get your API Key here https://api.nasa.gov/

    var api_key = "YOUR API KEY";

    function requestImage(failure, success) {
        console.log('Requesting new image from NASA');


        request(getRandomImageUrl(), function (error, response, body) {
            //Check for error
            if (error) {
                failure('Error:', error);
            }

            //Check for right status code
            if (response.statusCode !== 200) {
                failure('Invalid Status Code Returned:', response.statusCode);
            }

            var json = JSON.parse(body);

            // Detect images only
            if (json.url.indexOf(".jpg") > -1 || json.url.indexOf(".png") > -1) {
                success(json.url);
            } else {
                console.log("SKIP: No .jpg or .png file found: " + json.url);
                requestImage(failure, success);
            }


        });
    }

    /**
     * Private functions
     */

    function getRandomImageUrl() {
        var new_time = randomTime(new Date("1-1-1997"), new Date("12-10-2015"));
        new_time = formatDate(new_time);
        return 'https://api.nasa.gov/planetary/apod?concept_tags=True&date=' + new_time + '&api_key=' + api_key;
    }

    function randomTime(start, end) {
        var diff = end.getTime() - start.getTime();
        var new_diff = diff * Math.random();
        var date = new Date(start.getTime() + new_diff);
        return date;
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    return {
        requestImage: requestImage
    }
}

module.exports = NasaImageService