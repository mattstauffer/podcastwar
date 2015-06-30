<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIdFieldsToGames extends Migration
{
    public function up()
    {
        Schema::table('games', function (Blueprint $table) {
            $table->string('username')->nullable();
            $table->string('email')->nullable();
            $table->string('twitter')->nullable();
        });
    }

    public function down()
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('username');
            $table->dropColumn('email');
            $table->dropColumn('twitter');
        });
    }
}
