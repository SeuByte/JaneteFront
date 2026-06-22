<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\UserController; // <-- Importamos o novo controlador aqui
use Illuminate\Support\Facades\Route;


// Tela Inicial Padrão
Route::get('/', function () {
    return view('welcome');
});

// Dashboard Principal (Protegido por Login)
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Todas as rotas abaixo exigem que o usuário esteja logado (Autenticado)
Route::middleware('auth')->group(function () {
    
    // Perfil do Usuário (Breeze padrão)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile::edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile::update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile::destroy');

    // --- ROTAS DO SISTEMA DE PATRIMÔNIO ---

    // Rotas de Salas
    Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
    Route::get('/rooms/create', [RoomController::class, 'create'])->name('rooms.create');
    Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');

    // Rotas de Patrimônios
    Route::get('/assets', [AssetController::class, 'index'])->name('assets.index');
    Route::get('/assets/create', [AssetController::class, 'create'])->name('assets.create');
    Route::post('/assets', [AssetController::class, 'store'])->name('assets.store');
    
    // Rota Especial para REALOCAR o objeto de sala e salvar histórico
    Route::post('/assets/{asset}/relocate', [AssetController::class, 'relocate'])->name('assets.relocate');
    
    // Rota para visualizar o Histórico de movimentações
    Route::get('/assets/history', [AssetController::class, 'history'])->name('assets.history');

    // --- RECURSO ADICIONADO: GERENCIAMENTO DE USUÁRIOS ---
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    
});

require __DIR__.'/auth.php';