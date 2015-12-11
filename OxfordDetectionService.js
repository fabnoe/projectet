/**
 * Created by Fabian Nöthe
 * me@fabiannoethe.com
 * www.fabiannoethe.com
 */

// Get your API Key here https://www.projectoxford.ai/

var oxford = require('project-oxford'),
    client = new oxford.Client('YOUR API KEY');

function OxfordDetectionService() {

    function detect(url, failure, success) {
        console.log('E.T. are you here? ' + url);

        client.face.detect({
            url: url,
            analyzesAge: true,
            analyzesGender: true
        }).then(function (response) {

            if (response.length > 0) {
                success(response);
            } else {
                failure()
            }

        });

    }

    return {
        detect: detect
    }
}

module.exports = OxfordDetectionService