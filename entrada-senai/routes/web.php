<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


use App\Http\Controllers\PortariaController;

// Rotas do Cadastro
Route::get('/', [PortariaController::class, 'telaCadastro'])->name('cadastro.tela');
Route::post('/cadastrar', [PortariaController::class, 'salvarCadastro'])->name('cadastro.salvar');

// Rotas do Professor
Route::get('/professor', [PortariaController::class, 'painelProfessor'])->name('professor.painel');
Route::post('/professor/autorizar/{id}', [PortariaController::class, 'professorAutorizar'])->name('professor.autorizar');

// Rotas da Portaria
Route::get('/portaria/{id}', [PortariaController::class, 'exibirPortaria'])->name('portaria.exibir');
Route::post('/portaria/validar/{id}', [PortariaController::class, 'validarPortaria'])->name('portaria.validar');