/* References:
http://www.trollmystic.com/pub/2012/06/03/javascript-animated-d6-dice-roller-code-released-to-public-domain/
http://eposic.org/samples/dice/part3.php
http://codepen.io/SpeauDetcR/pen/nxbCz
http://codepen.io/tameraydin/pen/CADvB
*/

/*
@todo:
- Add user accounts
- Add usage limitations
- Use pips instead of numbers
 */

var DiceGame = (function() {
    var numDice = 5,
        devMode = true,
        rolled = false,
        chosen = false,
        live = [],
        pool = [],
        highestMatch = 0,
        animLength = 500,
        $throwButton, $liveContainer, $matchContainer,
        translate = {
            1: 'show-front',
            2: 'show-back',
            3: 'show-right',
            4: 'show-left',
            5: 'show-top',
            6: 'show-bottom'
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
            if (! this.isLive()) {
                devLog('Not live, no choos-y');
                return;
            }

            if (chosen) {
                notify('You cannot choose a die until you roll again.');
                return;
            }

            if (! rolled) {
                notify('You cannot choose a die until you have rolled.');
                return;
            }

            $('#quit-and-score').css('display', 'block');

            var that = this,
                sameValueDice = live.filter(function (die) {
                    return die.value == that.value;
                });

            if (this.value < highestMatch) {
                notify("You can't choose dice with a value lower than your match.");
                return;
            }

            if (this.value > highestMatch) {
                highestMatch = this.value;
            }

            for (num in sameValueDice) {
                sameValueDice[num].moveToPool();
            }

            chosen = true;

            if (live.length == 0) {
                devLog('Quitting because live length is 0');
                quitAndScore();
            }
        },
        moveToPool: function() {
            this.removeFromLive();

            pool.push(this);

            this.$el.closest('.cube-wrapper').detach().appendTo($matchContainer);
        },
        isLive: function() {
            var that = this,
                matches = live.filter(function(die) {
                    return die.id == that.id;
                });

            return matches.length > 0;
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
        $matchContainer = $('#match-container');
        $throwButton = $('#roll-button');
        $quitAndScoreButton = $('#quit-and-score');

        $throwButton.on('click', function() {
            throwDice();
        });

        $quitAndScoreButton.on('click', function() {
            devLog('Quitting because quit and score button pressed.');
            quitAndScore();
        });
    };

    var throwDice = function() {
        $('.cube-wrapper').removeClass('queued');
        rolled = true;

        for (cubeNum in live) {
            live[cubeNum].roll();
        }

        chosen = false;

        // Validate that roll can even go forward
        for (cubeNum in live) {
            if (live[cubeNum].value >= highestMatch) {
                return;
            }
        }

        delayPastAnim(function () {
            notify('Fail roll!');

            quitFailRoll();
        });
    };

    var getRandomNumber = function() {
        return Math.round(Math.random() * 5) + 1;
    };

    var delayPastAnim = function(func) {
        setTimeout(func, animLength);
    };

    var notify = function(str) {
        var $alert = $('<div class="alert">').text(str);

        $('#notifications').append($alert);

        setTimeout(function() {
            $alert.slideUp();
        }, 3000);
    };

    var quitFailRoll = function () {
        quitWithScore(1);
    };

    var quitAndScore = function() {
        var score = 0;

        for (die in pool) {
            score += pool[die].value;
        }

        quitWithScore(score);
    };

    var quitWithScore = function(score) {
        notify('You got ' + score + ' soldiery points for your podcast of choice');
    };

    var devLog = function(str) {
        if (devMode) {
            console.log(str);
        }
    };

    return {
        init: init
    }
})();

$(function() {
    DiceGame.init();
});
