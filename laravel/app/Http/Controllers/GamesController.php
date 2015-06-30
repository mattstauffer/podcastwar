<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\TrackGame;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Session;

class GamesController extends Controller
{
    public function store()
    {
        $this->dispatch(new TrackGame(
            Input::get('points'),
            Input::get('podcast'),
            Request::getClientIp(),
            Session::get('username'),
            Session::get('email'),
            Session::get('twitter')
        ));

        return Response::json([
            'success' => true
        ]);
    }
}
