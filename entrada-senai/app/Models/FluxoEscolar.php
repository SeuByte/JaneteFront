<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FluxoEscolar extends Model
{
    protected $table = 'fluxos_escolares';
    
    protected $fillable = [
        'user_id', 
        'nome_aluno', 
        'nome_professor',
        'nome_responsavel',
        'email_responsavel',
        'tipo', 
        'autorizado_responsavel', 
        'autorizado_professor', 
        'status', 
        'data_hora_validacao'
    ];

    protected $casts = [
        'data_hora_validacao' => 'datetime',
    ];

    public function responsavel(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}