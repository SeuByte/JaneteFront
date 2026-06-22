<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = ['asset_tag', 'name', 'description', 'status', 'room_id'];

    // Retorna a sala onde o patrimônio está alocado
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    // Retorna o histórico de movimentações deste item
    public function histories()
    {
        return $this->hasMany(AllocationHistory::class);
    }
}