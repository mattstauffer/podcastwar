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
        this.$container.text(this.getRandomNumber());
    },
    live: [],
    pool: [],
    getRandomNumber: function() {
        return Math.round(Math.random() * 5) + 1;
    }
};

$(function() {
    DiceGame.init();
});
