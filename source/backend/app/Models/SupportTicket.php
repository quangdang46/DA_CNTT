<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'issue_type',
        'status',
        'created_at',
        'updated_at',
    ];

    // Quan hệ: SupportTicket thuộc về User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
