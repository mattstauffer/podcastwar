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
    private $username;
    private $email;
    private $twitter;

    // @todo: OK, this list is too long.
    public function __construct($points, $podcast, $ip_address, $username, $email = null, $twitter = null)
    {
        $this->points = $points;
        $this->podcast = $podcast;
        $this->ip_address = $ip_address;
        $this->username = $username;
        $this->email = $email;
        $this->twitter = $twitter;
    }

    public function handle()
    {
        Game::create([
            'points' => $this->points,
            'podcast' => $this->podcast,
            'ip_address' => $this->ip_address,
            'username' => $this->username,
            'email' => $this->email,
            'twitter' => $this->twitter
        ]);
    }
}
