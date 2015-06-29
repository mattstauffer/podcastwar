<?php namespace App\Http\Middleware;

use Closure;

class Cors
{
    public function handle($request, Closure $next)
    {
        // Handle on passed down request
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin' , '*', true);
        $response->headers->set('Access-Control-Allow-Methods', 'PATCH, POST, GET, OPTIONS, PUT, DELETE', true);
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With', true);

        return $response;
    }
}
