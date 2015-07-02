<?php namespace App\Http\Controllers;

use App\GuardsAgainstMultiplePlays;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;

class WelcomeController extends Controller
{
    use GuardsAgainstMultiplePlays;

    public function index()
    {
        if (! Session::has('username')) {
            return redirect('login');
        }

        if ($this->userHasPlayedToday()) {
            // @todo: This should be middleware
            // return redirect('daily-limit');
        }

        return view('welcome');
    }
}
