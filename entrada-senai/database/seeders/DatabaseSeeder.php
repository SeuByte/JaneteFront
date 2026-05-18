<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\FluxoEscolar; // Importando o modelo que criamos
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Cria o responsável pelo aluno (Usando a estrutura padrão do Laravel)
        $responsavel = User::factory()->create([
            'name' => 'Carlos Silva (Pai)',
            'email' => 'carlos@email.com',
        ]);

        // 2. Cria a simulação de um fluxo escolar pendente para testarmos na portaria
        FluxoEscolar::create([
            'user_id' => $responsavel->id,
            'nome_aluno' => 'Pedro Silva',
            'tipo' => 'saida',
            'autorizado_responsavel' => true,
            'autorizado_professor' => true,
            'status' => 'pendente',
        ]);
    }
}