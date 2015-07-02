<?php

namespace App\Http\Controllers;

use App\GuardsAgainstMultiplePlays;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    use GuardsAgainstMultiplePlays;

    public function logins()
    {
        return view('logins');
    }

    public function loginFacebook()
    {
        return Socialite::with('facebook')->redirect();
    }

    public function loginTwitter()
    {
        return Socialite::with('twitter')->redirect();
    }

    public function callbackFacebook()
    {
        $user = Socialite::with('facebook')->user();
        Session::put('username', 'facebook-' . $user->user['id']);
        Session::put('email', $user->user['email']);

        return $this->returnGuardedLogin();
    }

    public function callbackTwitter()
    {
        $user = Socialite::with('twitter')->user();
        Session::put('username', 'twitter-' . $user->id);
        Session::put('twitter', $user->nickname);

        return $this->returnGuardedLogin();
    }

    public function returnGuardedLogin()
    {
        if ($this->userHasPlayedToday()) {
            // return redirect('daily-limit');
        }

        return redirect('/');
    }

    public function logout()
    {
        Session::forget('username');
        Session::forget('email');

        return redirect('/');
    }

    public function dailyLimit()
    {
        return view('daily-limit');
    }
}
