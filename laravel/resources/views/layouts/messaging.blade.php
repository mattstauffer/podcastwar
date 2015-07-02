<html>
<head>
    <style>
        html {
            box-sizing: border-box;
            line-height: 1.3;
        }

        *, *:before, *:after {
            box-sizing: inherit;
        }

        body {
            background: #eee;
            font-family: arial;
        }

        .wrapper {
            background: #fff;
            border-radius: 0.75rem;
            box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
            margin: 2rem auto;
            max-width: 40rem;
            padding: 1.5rem;
        }

        .logo {
            display: block;
            margin: 0 auto 1em;
            max-width: 225px;
        }

        h1 {
            margin-top: 0;
        }

        .social-button {
            background: #eee;
            border-radius: 0.25rem;
            color: #fff;
            float: left;
            margin-bottom: 2rem;
            margin-right: 2.5%;
            padding: 0.5rem;
            text-align: center;
            text-decoration: none;
            width: 47.5%;
        }

            .social-button + .social-button {
                margin-left: 2.5%;
                margin-right: 0;
            }

            .social-button--facebook {
                background: #3b5998;
            }

            .social-button--twitter {
                background: #00aced;
            }

        .disclaimer {
            color: #555;
            font-size: 0.8rem;
            margin-bottom: 0;
        }
    </style>
</head>
<body>
<div class="wrapper">
    <h1><img src="/podcast-war-logo.png" alt="Podcast War" class="logo"></h1>

    @yield('content')
</div>
</body>
</html>
