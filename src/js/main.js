/* References:
http://www.trollmystic.com/pub/2012/06/03/javascript-animated-d6-dice-roller-code-released-to-public-domain/
http://eposic.org/samples/dice/part3.php
http://codepen.io/SpeauDetcR/pen/nxbCz
http://codepen.io/tameraydin/pen/CADvB
*/

var DiceUi = {
    rollToNumber: function(num) {
        console.log(num);

        var translate = {
                1: 'show-back',
                2: 'show-right',
                3: 'show-left',
                4: 'show-top',
                5: 'show-bottom',
                6: 'show-front'
            },
            $cube = $('#cube');

        $cube.addClass(translate[num]);
        $cube.removeClass($cube.data('previous-class'));
        $cube.data('previous-class', translate[num]);
    }
};

var DiceGame = {
    init: function() {
        var that = this;

        that.$container = $('#container');
        that.$throwButton = $('#throwButton');

        that.$throwButton.on('click', function() {
            that.throw();
        });
    },
    throw: function() {
        DiceUi.rollToNumber(this.getRandomNumber());
    },
    previousRandomNumber: 0,
    live: [],
    pool: [],
    getRandomNumber: function() {
        var num = Math.round(Math.random() * 5) + 1;

        if (num == this.previousRandomNumber) {
            num = this.getRandomNumber();
        }

        this.previousRandomNumber = num;

        return num;
    },

};

$(function() {
    DiceGame.init();
});


$(document).ready(function(){
    $("a").click(function () {
        DiceGame.throw();
    });
});

