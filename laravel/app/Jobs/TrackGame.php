<?php

namespace App\Jobs;

use App\Game;
use App\Jobs\Job;
use Illuminate\Contracts\Bus\SelfHandling;

class TrackGame extends Job implements SelfHandling
{
    private $points;
    private $podcasts;
    private $ip_address;

    public function __construct($points, $podcast, $ip_address)
    {
        $this->points = $points;
        $this->podcast = $podcast;
        $this->ip_address = $ip_address;
    }

    public function handle()
    {
        Game::create([
            'points' => $this->points,
            'podcast' => $this->podcast,
            'ip_address' => $this->ip_address
        ]);
    }
}
