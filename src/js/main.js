/* References:
http://www.trollmystic.com/pub/2012/06/03/javascript-animated-d6-dice-roller-code-released-to-public-domain/
http://eposic.org/samples/dice/part3.php
http://codepen.io/SpeauDetcR/pen/nxbCz
http://codepen.io/tameraydin/pen/CADvB
*/

var DiceGame = (function(){
    var numDice = 6,
        rolled = false,
        live = [],
        pool = [],
        $throwButton, $liveContainer, $poolContainer,
        translate = {
            1: 'show-back',
            2: 'show-right',
            3: 'show-left',
            4: 'show-top',
            5: 'show-bottom',
            6: 'show-front'
        };

    function Die(num) {
        this.num = num;
        this.id = 'cube-' + num;
        this.$el = $('#' + this.id);

        var that = this;

        this.$el.on('click', function() {
            that.moveToPool();
            // moveCubeToPool($(this));
        });

        if (this.$el.length === 0) {
            throw "Die number " + num + " does not exist";
        }
    }

    Die.prototype = {
        removeFromLive: function() {
            var that = this;

            live = live.filter(function (el) {
                return el.id != that.id;
            });
        },
        moveToPool: function() {
            this.removeFromLive();

            pool.push(this);

            this.$el.closest('.cube-wrapper').detach().appendTo($poolContainer);
        },
        isInPool: function() {

        },
        isLive: function() {

        }
    };

    var init = function() {
        for (i = 1; i <= numDice; i++) {
            live.push(new Die(i));
        }

        $liveContainer = $('#live-container');
        $poolContainer = $('#pool-container');
        $throwButton = $('#roll-button');

        $throwButton.on('click', function() {
            throwDice();
        });
    };

    var throwDice = function() {
        $('.cube-wrapper').removeClass('queued');

        for (cubeNum in live) {
            roll(live[cubeNum]);
        }
    };

    var roll = function($cube) {
        $cube.$el[0].className = 'cube ' + translate[getRandomNumber()];
    };

    var getRandomNumber = function() {
        return Math.round(Math.random() * 5) + 1;
    };

    // var moveCubeToPool = function($cube) {
    //     var removeFromLive = function($cube) {
    //         live = live.filter(function (el) {
    //                 return el.id != $cube.$el[0].id;
    //             });
    //     };

    //     removeFromLive($cube);

    //     pool.push($cube);

    //     $cube.$el.closest('.cube-wrapper').detach().appendTo($poolContainer);
    // };

    return {
        init: init
    }
})();

$(function() {
    DiceGame.init();
});
