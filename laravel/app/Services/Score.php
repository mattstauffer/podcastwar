<?php

namespace App\Services;

use App\Game;

class Score
{
    public function geeky()
    {
        return Game::where('podcast', 'fmgs')
            ->sum('points');
    }

    public function alarmy()
    {
        return Game::where('podcast', 'mildly-alarming')
            ->sum('points');
    }
}
