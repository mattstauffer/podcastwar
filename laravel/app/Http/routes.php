<?php

Route::get('/', 'WelcomeController@index');
Route::get('login/facebook', 'AuthController@loginFacebook');
Route::get('login/twitter', 'AuthController@loginTwitter');
Route::get('logout', 'AuthController@logout');

Route::get('oauth/facebook/callback', 'AuthController@callbackFacebook');
Route::get('oauth/twitter/callback', 'AuthController@callbackTwitter');

Route::group(['prefix' => 'api'], function() {
    Route::post('games', 'GamesController@store');
});
