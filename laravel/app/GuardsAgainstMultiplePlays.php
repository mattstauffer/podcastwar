<?php

namespace App;

use App\Game;
use Carbon\Carbon;
use Illuminate\Support\Facades\Session;

trait GuardsAgainstMultiplePlays
{
    public function userHasPlayedToday()
    {
        $count = Game::where('username', Session::get('username'))
            ->whereBetween('created_at', [
                Carbon::now()->startOfDay(),
                Carbon::now()->endOfDay()
            ])
            ->count();

        return $count > 0;
    }
}
