<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('asset_tag')->unique(); // Código do patrimônio (Ex: PAT-1234)
            $table->string('name'); // Ex: Computador Dell, Projetor
            $table->text('description')->nullable();
            $table->string('status')->default('disponivel');
            // Sala onde o objeto está localizado
            $table->foreignId('room_id')->constrained('rooms')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};