<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');
            $table->string('points');
            $table->string('podcast');
            $table->string('ip_address', 60);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('games');
    }
}
