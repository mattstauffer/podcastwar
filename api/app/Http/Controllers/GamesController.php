<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;

class GamesController extends Controller
{
    public function store()
    {
        // get because jsonp wtf
        $points = Input::json('points');
        $podcast = Input::json('podcast');

        $this->dispatch(new TrackGame($points, $podcast, Request::getClientIp()));

        return Response::json([
                'succes' => true
            ])
            ->setCallback(Input::get('callback'));
    }
}
