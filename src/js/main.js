/* References:
http://www.trollmystic.com/pub/2012/06/03/javascript-animated-d6-dice-roller-code-released-to-public-domain/
http://eposic.org/samples/dice/part3.php
http://codepen.io/SpeauDetcR/pen/nxbCz
http://codepen.io/tameraydin/pen/CADvB
*/

var DiceGame = (function(){
    var numDice = 6,
        live = [],
        pool = [],
        $throwButton,
        translate = {
            1: 'show-back',
            2: 'show-right',
            3: 'show-left',
            4: 'show-top',
            5: 'show-bottom',
            6: 'show-front'
        };

    var init = function() {
        for (i = 1; i <= numDice; i++) {
            live.push($('#cube-' + i));
        }

        $throwButton = $('#roll-button');

        $throwButton.on('click', function() {
            throwDice();
        });
    };

    var throwDice = function() {
        for (cubeNum in live) {
            roll(live[cubeNum]);
        }
    };

    var roll = function($cube) {
        $cube[0].className = 'cube ' + translate[getRandomNumber()];
    };

    var getRandomNumber = function() {
        return Math.round(Math.random() * 5) + 1;
    };

    return {
        init: init
    }
})();

$(function() {
    DiceGame.init();
});
