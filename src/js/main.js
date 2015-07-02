/*
@todo:
- Use pips instead of numbers
- See if there's a good way to extract $el off of the domain object so it's totally UI-free
 */
// http://davidwalsh.name/pubsub-javascript
var events = (function() {
    var topics = {},
        hOP = topics.hasOwnProperty;

    return {
        subscribe: function(topic, listener) {
            // Create the topic's object if not yet created
            if (! hOP.call(topics, topic)) {
                topics[topic] = [];
            }

            // Add the listener to queue
            var index = topics[topic].push(listener) -1;

            // Provide handle back for removal of topic
            return {
                remove: function() {
                    delete topics[topic][index];
                }
            };
        },
        publish: function(topic, info) {
            // If the topic doesn't exist, or there's no listeners in queue, just leave
            if (! hOP.call(topics, topic)) {
                return;
            }

            // Cycle through topics queue, fire!
            topics[topic].forEach(function (item) {
               item(info !== undefined ? info : {});
            });
        }
    };
})();

var DiceGame = (function() {
    var numDice = 5,
        scoreFromPreviousRounds = 0,
        devMode = true,
        rolled = false,
        chosen = false,
        live = [],
        pool = [],
        highestMatch = 0,
        animLength = 500,
        currentScore = 0,
        $liveContainer, $matchContainer, $currentScore, $rollButton, $maxDie,
        pickedPodcast,
        translate = {
            1: 'show-front',
            2: 'show-back',
            3: 'show-right',
            4: 'show-left',
            5: 'show-top',
            6: 'show-bottom'
        },
        podcastTranslate = {
            'fmgs': 'The Five-Minute Geek Show',
            'mildly-alarming': 'The Mildly Alarming Podcast'
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

            if (this.value < highestMatch) {
                notify("You can't choose dice with a value lower than your match.");
                return;
            }

            if (this.value > highestMatch) {
                highestMatch = this.value;
                $maxDie.text(highestMatch);
            }

            var that = this;

            sameValueDice = live.filter(function (die) {
                return die.value == that.value;
            });

            for (var num in sameValueDice) {
                sameValueDice[num].moveToPool();
            }

            events.publish('die.chosen', this);
        },
        removeFromLive: function() {
            var that = this;

            live = live.filter(function (die) {
                return die.id != that.id;
            });
        },
        moveToPool: function() {
            this.removeFromLive();

            pool.push(this);

            events.publish('die.movedToPool', this);
        },
        removeFromPool: function() {
            var that = this;

            pool = pool.filter(function (die) {
                return die.id != that.id
            });
        },
        moveToLive: function() {
            this.removeFromPool();

            live.push(this);

            events.publish('die.movedToLive', this);
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

            this.value = num;

            events.publish('die.rolled', this);
        }
    };

    var registerListeners = function() {
        events.subscribe('dice.rolling', function (obj) {
            // handle farkle-y rolling after getting all 5
            if (! liveContainsDice()) {
                scoreFromPreviousRounds = scoring.getPoolScore();

                while (pool.length > 0) {
                    pool[0].moveToLive();
                }
            }
        });

        events.subscribe('dice.rolled', function (obj) {
            $('.cube-wrapper').removeClass('queued');
        });

        events.subscribe('dice.rolled', function (obj) {
            // @todo: State machines?
            rolled = true;
            chosen = false;
        });

        events.subscribe('dice.rolled', function (obj) {
            validate.liveAllowsFutureChoosing();
        });

        events.subscribe('die.chosen', function (obj) {
            $('#quit-and-score').css('display', 'inline-block');
        });

        events.subscribe('die.chosen', function (obj) {
            chosen = true;
            rolled = false;

            scoring.updateScore();
        });

        events.subscribe('die.movedToPool', function (die) {
            die.$el.closest('.cube-wrapper').detach().appendTo($matchContainer);
        });

        events.subscribe('die.movedToLive', function (die) {
            die.$el.closest('.cube-wrapper').detach().appendTo($liveContainer);
        });

        events.subscribe('die.rolled', function (die) {
            die.$el[0].className = 'cube ' + translate[die.value];
        });

        events.subscribe('score.changed', function () {
            $currentScore.text(currentScore);
        });

        events.subscribe('play.scoredOut', function () {
            notify('You got ' + currentScore + ' point(s) for ' + podcastTranslate[pickedPodcast]);

            $.ajax({
                method: 'POST',
                url: '/api/games',
                data: {
                    'points': currentScore,
                    'podcast': pickedPodcast
                },
                success: function (data) {
                    devLog(data);
                },
            });

            $('#screen').css('display', 'block');
        });
    };

    var init = function() {
        for (i = 1; i <= numDice; i++) {
            live.push(new Die(i));
        }

        $liveContainer = $('#live-container');
        $matchContainer = $('#match-container');
        $currentScore = $('#current-score');
        $rollButton = $('#roll-button');
        $maxDie = $('#max-die');

        $rollButton.on('click', function() {
            throwDice();
        });

        $('#quit-and-score').on('click', function() {
            devLog('Quitting because quit and score button pressed.');
            scoring.quitAndScore();
        });

        $('.pick-a-podcast__button').on('click', function() {
            pickPodcast($(this).data('podcast-slug'));
            $('.pick-a-podcast').hide();
            $('.wrapper').show();

            // @todo: Cookie?
        });

        $('#how-it-works-button').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            $('#how-it-works-container').show();

            $('body').on('click.hiw-esecape', function() {
                $('#how-it-works-container').hide();

                $('body').off('click.hiwescape');
            });
        });

        registerListeners();
    };

    var pickPodcast = function(podcastSlug) {
        pickedPodcast = podcastSlug;
    };

    var throwDice = function() {
        if (rolled) {
            notify("You can't roll again until you choose.");
            return;
        }

        events.publish('dice.rolling');

        for (var cubeNum in live) {
            live[cubeNum].roll();
        }

        events.publish('dice.rolled');
    };

    var getRandomNumber = function() {
        return Math.round(Math.random() * 5) + 1;
    };

    var delayPastAnim = function(func) {
        setTimeout(func, animLength);
    };

    var liveContainsDice = function () {
        return live.length !== 0;
    };

    var validate = {
        liveAllowsFutureChoosing: function() {
           for (var cubeNum in live) {
                if (live[cubeNum].value >= highestMatch) {
                    return;
                }
            }

            delayPastAnim(function () {
                notify('Fail roll!');

                scoring.failRoll();
            });
        }
    };

    var notify = function(str) {
        var $alert = $('<div class="alert">').text(str);

        $('#notifications').append($alert);

        setTimeout(function() {
            $alert.slideUp();
        }, 3000);
    };

    var devLog = function(str) {
        if (devMode) {
            console.log(str);
        }
    };

    var scoring = {
        failRoll: function() {
            currentScore = 1;

            events.publish('score.changed');

            events.publish('play.scoredOut');
        },
        getPoolScore: function() {
            var score = 0;

            for (var die in pool) {
                score += pool[die].value;
            }

            return score;
        },
        updateScore: function() {
            currentScore = this.getPoolScore() + scoreFromPreviousRounds;

            events.publish('score.changed');
        },
        quitAndScore: function() {
            this.updateScore();

            events.publish('play.scoredOut');
        }
    };

    return {
        init: init
    };
})();

$(function() {
    DiceGame.init();
});
