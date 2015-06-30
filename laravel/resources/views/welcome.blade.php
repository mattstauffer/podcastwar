<html>
<head>
    <link rel="stylesheet" href="/dist/css/main.css">
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="/dist/js/bundle.js"></script>
</head>
<body>
    <div id="notifications" class="notifications"></div>

    <div id="pick-a-podcast" class="pick-a-podcast">
        <span class="pick-a-podcast__title">Pick a podcast to back in the great Podcast War</span>
        <div class="pick-a-podcast__buttons">
            <a href="#" class="pick-a-podcast__button pick-a-podcast__button--fmgs" data-podcast-slug="fmgs">The Five-Minute Geek Show</a>
            <a href="#" class="pick-a-podcast__button pick-a-podcast__button--mildly-alarming" data-podcast-slug="mildly-alarming">The Mildly Alarming Podcast</a>
        </div>
        <br><br><br><br><br><br><br><br><br><br>

        @inject('score', 'App\Services\Score')

        Current points:<br><br>
        Five-Minute Geek Show: {{ $score->geeky() }}<br>
        Mildly Alarming Podcast: {{ $score->alarmy() }}<br>

        <br><br><br><br><br>
        <a href="/logout">Log out</a>
    </div>

    <div class="wrapper">
        <h1>Podcast War</h1>

        <div class="instructions">
            <strong>NOTE: This is just a mirror of the under-development app. It doesn't actually work yet.</strong><br><br>
            How it works:<br><br>
            <ul>
                <li><strong>The war</strong>
                    <ul>
                        <li>Pick your podcast of choice: <a href="http://www.fiveminutegeekshow.com/">The Five-Minute Geek Show</a> or <a href="http://mildlyalarming.com/">The Mildly Alarming Podcast</a>. (@todo)</li>
                        <li>Authenticate with your social media profile (@todo). We won't post. This is just for identity.</li>
                        <li>You can play once per day, for a week. Every point you accrue goes toward your podcast. Whichever podcast has the most points at the end of the week wins.</li>
                    </ul>
                </li>
                <li><strong>How to play</strong>
                    <ul>
                        <li>The goal is to "set aside" as many points as possible. "Points" are just the sum of the die you set aside.</li>
                        <li>After every roll, you have to choose a single die to <strong>set aside</strong>. Every die with the same number showing will also be set aside with it.</li>
                        <li>After setting aside dice, you can either <strong>roll again</strong> or <strong>score out</strong>. If you score out, the sum of your set-aside dice will be tallied, and that will be your total score.</li>
                        <li>If you choose to roll again, and none of the dice roll <em>as high or higher</em> than your highest set-aside dice, you lose all of your set-aside dice and will only receive one point.</li>
                        <li>If you choose to roll again, and at least one die is greater to or equal than your highest set-aside dice, you can choose to set aside dice and score out or roll again</li>
                        <li>If you set aside all of your dice, the game is over and you automatically score out</li>
                    </ul>
                </li>
            </ul>
        </div>

        <div id="screen" class="screen">
            <p class="refresh-screen">(refresh the page to play again)</p>
        </div>

        <div class="buttons">
            <a id="roll-button" class="button">Roll</a>

            <a id="quit-and-score" class="button" style="display: none;">Score out with <span id="current-score"></span> points</a>
        </div>

        <section class="live-container container" id="live-container">
            <h2>Live</h2>
            <div class="cube-wrapper queued" id="cube-wrapper-1">
                <div class="cube" id="cube-1">
                    <figure class="front show-front">1</figure>
                    <figure class="back show-back">2</figure>
                    <figure class="right show-right">3</figure>
                    <figure class="left show-left">4</figure>
                    <figure class="top show-top">5</figure>
                    <figure class="bottom show-bottom">6</figure>
                </div>
            </div>
            <div class="cube-wrapper queued" id="cube-wrapper-2">
                <div class="cube" id="cube-2">
                    <figure class="front show-front">1</figure>
                    <figure class="back show-back">2</figure>
                    <figure class="right show-right">3</figure>
                    <figure class="left show-left">4</figure>
                    <figure class="top show-top">5</figure>
                    <figure class="bottom show-bottom">6</figure>
                </div>
            </div>
            <div class="cube-wrapper queued" id="cube-wrapper-3">
                <div class="cube" id="cube-3">
                    <figure class="front show-front">1</figure>
                    <figure class="back show-back">2</figure>
                    <figure class="right show-right">3</figure>
                    <figure class="left show-left">4</figure>
                    <figure class="top show-top">5</figure>
                    <figure class="bottom show-bottom">6</figure>
                </div>
            </div>
            <div class="cube-wrapper queued" id="cube-wrapper-4">
                <div class="cube" id="cube-4">
                    <figure class="front show-front">1</figure>
                    <figure class="back show-back">2</figure>
                    <figure class="right show-right">3</figure>
                    <figure class="left show-left">4</figure>
                    <figure class="top show-top">5</figure>
                    <figure class="bottom show-bottom">6</figure>
                </div>
            </div>
            <div class="cube-wrapper queued" id="cube-wrapper-5">
                <div class="cube" id="cube-5">
                    <figure class="front show-front">1</figure>
                    <figure class="back show-back">2</figure>
                    <figure class="right show-right">3</figure>
                    <figure class="left show-left">4</figure>
                    <figure class="top show-top">5</figure>
                    <figure class="bottom show-bottom">6</figure>
                </div>
            </div>
        </section>
        <section class="pool-container container">
            <h2>Set Aside</h2>
            <div id="match-container">
            </div>
        </section>

        <footer>
            Source code available on Github: <a href="https://github.com/mattstauffer/podcastwar">mattstauffer/podcastwar</a>
        </footer>
    </div>
</body>
</html>
