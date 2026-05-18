<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


use App\Http\Controllers\PortariaController;

Route::get('/portaria/validar/{id}', [PortariaController::class, 'validar']);