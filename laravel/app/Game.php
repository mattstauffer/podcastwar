<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $table = 'games';
    protected $fillable = ['points', 'podcast', 'ip_address', 'username', 'email', 'twitter'];
}
