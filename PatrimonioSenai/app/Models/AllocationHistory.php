<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllocationHistory extends Model
{
    use HasFactory;

    protected $fillable = ['asset_id', 'origin_room_id', 'destination_room_id', 'moved_by_user_id'];

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function originRoom()
    {
        return $this->belongsTo(Room::class, 'origin_room_id');
    }

    public function destinationRoom()
    {
        return $this->belongsTo(Room::class, 'destination_room_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'moved_by_user_id');
    }
}