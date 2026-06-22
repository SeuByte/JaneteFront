<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'user_id'];

    // Retorna o professor responsável por esta sala
    public function teacher()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Retorna os patrimônios que estão nesta sala
    public function assets()
    {
        return $this->hasMany(Asset::class);
    }
}