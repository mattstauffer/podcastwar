<?php

namespace App\Jobs;

use App\Game;
use App\Jobs\Job;
use Illuminate\Contracts\Bus\SelfHandling;

class TrackGame extends Job implements SelfHandling
{
    public function __construct()
    {
        //
    }

    public function handle($points, $podcast, $ip_address)
    {
        Game::create([
            'points' => $points,
            'podcast' => $podcast,
            'ip_address' => $ip_address
        ]);
    }
}
