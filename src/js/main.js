/* References:
http://www.trollmystic.com/pub/2012/06/03/javascript-animated-d6-dice-roller-code-released-to-public-domain/
http://eposic.org/samples/dice/part3.php
http://codepen.io/SpeauDetcR/pen/nxbCz
http://codepen.io/tameraydin/pen/CADvB
*/

var DiceGame = (function(){
    var numDice = 6,
        rolled = false,
        chosen = false,
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
        this.value = 1;

        var that = this;

        this.$el.on('click', function() {
            that.choose();
        });

        if (this.$el.length === 0) {
            throw "Die number " + num + " does not exist";
        }
    }

    Die.prototype = {
        removeFromLive: function() {
            var that = this;

            live = live.filter(function (die) {
                return die.id != that.id;
            });
        },
        choose: function() {
            if (chosen) {
                return;
            }

            // @todo: get an array of all dice with this same value, and then move them to pool, and then do some logic accordingly
            var that = this,
                sameValueDice = live.filter(function (die) {
                    return die.value == that.value;
                });

            for (num in sameValueDice) {
                sameValueDice[num].moveToPool();
            }

            chosen = true;
        },
        moveToPool: function() {
            this.removeFromLive();

            pool.push(this);

            this.$el.closest('.cube-wrapper').detach().appendTo($poolContainer);
        },
        isInPool: function() {

        },
        isLive: function() {

        },
        roll: function() {
            var num = getRandomNumber();

            this.$el[0].className = 'cube ' + translate[num];

            this.value = num;
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
            live[cubeNum].roll();
        }

        chosen = false;
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
