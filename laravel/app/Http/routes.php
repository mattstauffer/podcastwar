<?php

Route::get('/', 'WelcomeController@index');
Route::group(['prefix' => 'api'], function() {
    Route::post('games', 'GamesController@store');
});
