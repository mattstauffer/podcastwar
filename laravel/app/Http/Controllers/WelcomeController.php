<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        return view('welcome');
    }
}
