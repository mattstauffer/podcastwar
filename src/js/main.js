/* References:
http://www.trollmystic.com/pub/2012/06/03/javascript-animated-d6-dice-roller-code-released-to-public-domain/
http://eposic.org/samples/dice/part3.php
http://codepen.io/SpeauDetcR/pen/nxbCz
http://codepen.io/tameraydin/pen/CADvB
*/

/*
@todo:
- Add the concept of setting aside. Apparently if you're matching on 3s, you can
  set aside any dice that are 4, 5, or 6, but *only* 3s can be added to the match.
  Therefore, we need a third container (and according logic) for setting aside
- Add scoring
- Add user accounts
- Add usage limitations
- Add failure if all come up lower than current match
-
 */

var DiceGame = (function(){
    var numDice = 5,
        rolled = false,
        chosen = false,
        live = [],
        pool = [],
        matchValue = null,
        animLength = 500,
        $throwButton, $liveContainer, $matchContainer, $discardContainer,
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
            if (chosen) {
                notify('You cannot choose a die until you roll again.');
                return;
            }

            if (! rolled) {
                notify('You cannot choose a die until you have rolled.');
                return;
            }

            var that = this,
                sameValueDice = live.filter(function (die) {
                    return die.value == that.value;
                });

            if (matchValue === null) {
                // If this is our first match, just set it
                matchValue = this.value;

                for (num in sameValueDice) {
                    sameValueDice[num].moveToPool();
                }
            } else {
                // If this is nor our first match, check our logic
                if (matchValue == this.value) {
                    for (num in sameValueDice) {
                        sameValueDice[num].moveToPool();
                    }
                }

                if (matchValue < this.value) {
                    for (num in sameValueDice) {
                        sameValueDice[num].moveToDiscard();
                    }
                }

                if (matchValue > this.value) {
                    notify("You can't choose dice with a value lower than your match.");
                    return;
                }
            }

            chosen = true;
        },
        moveToPool: function() {
            this.removeFromLive();

            pool.push(this);

            this.$el.closest('.cube-wrapper').detach().appendTo($matchContainer);
        },
        moveToDiscard: function() {
            // @todo: Make this better
            this.removeFromLive();

            this.$el.closest('.cube-wrapper').detach().appendTo($discardContainer);
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
        $matchContainer = $('#match-container');
        $discardContainer = $('#discard-container');
        $throwButton = $('#roll-button');

        $throwButton.on('click', function() {
            throwDice();
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
            if (live[cubeNum].value >= matchValue) {
                return;
            }
        }

        delayPastAnim(function () {
            notify('Fail roll!');

            quitAndScore();
        });
    };

    var getRandomNumber = function() {
        return Math.round(Math.random() * 5) + 1;
    };

    var delayPastAnim = function(func) {
        setTimeout(func, animLength);
    };

    var notify = function(str) {
        alert(str);
    };

    var quitAndScore = function() {
        alert('todo score');
    };

    return {
        init: init
    }
})();

$(function() {
    DiceGame.init();
});
