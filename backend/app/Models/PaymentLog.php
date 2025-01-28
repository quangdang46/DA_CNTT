<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_id',
        'transaction_status',
        'transaction_details',
    ];

    // Quan hệ: PaymentLog thuộc về Payment
    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
