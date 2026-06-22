<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate; // <-- Importação do Gate ajustada aqui

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Define a regra: 'manage-users' só é true se o usuário logado for coordenador
        Gate::define('manage-users', function ($user) {
            return $user->role === 'coordenador';
        });
    }
}