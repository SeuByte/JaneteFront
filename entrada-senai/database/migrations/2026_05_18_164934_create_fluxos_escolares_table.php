<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
{
    Schema::create('fluxos_escolares', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // Adicionado o nullable para evitar bloqueios ao recriar
        $table->string('nome_aluno');
        $table->string('nome_professor');
        $table->string('nome_responsavel');
        $table->string('email_responsavel');
        $table->enum('tipo', ['entrada', 'saida'])->default('saida');
        $table->boolean('autorizado_responsavel')->default(true);
        $table->boolean('autorizado_professor')->default(false);
        $table->enum('status', ['pendente', 'concluido'])->default('pendente');
        $table->timestamp('data_hora_validacao')->nullable();
        $table->timestamps();
    });
}
    public function down(): void
    {
        Schema::dropIfExists('fluxos_escolares');
    }
};