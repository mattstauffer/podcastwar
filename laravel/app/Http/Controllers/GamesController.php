<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\TrackGame;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;

class GamesController extends Controller
{
    public function store()
    {
        $points = Input::get('points');
        $podcast = Input::get('podcast');

        $this->dispatch(new TrackGame($points, $podcast, Request::getClientIp()));

        return Response::json([
            'success' => true
        ]);
    }
}
