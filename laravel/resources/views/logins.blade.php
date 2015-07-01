@extends('layouts.messaging')

@section('content')
    <p>To play Podcast War, you need to identify yourself so we can limit the number of games to one per day per social media account.</p>

    <p>Log in with:</p>

    <a href="/login/facebook" class="social-button social-button--facebook">Facebook</a>
    <a href="/login/twitter" class="social-button social-button--twitter">Twitter</a>

    <p class="disclaimer">We swear, we're not doing anything bad with your information. We won't post as you or steal your information and sell it to the IRS. You can see the entire code base here to show that we aren't doing anything with it: <a href="http://github.com/mattstauffer/podcastwar">github.com/mattstauffer/podcastwar</a></p
@endsection
