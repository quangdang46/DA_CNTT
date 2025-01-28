<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'message',
        'message_type',
        'status',
    ];

    // Quan hệ: Chat có sender là User
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Quan hệ: Chat có receiver là User
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
