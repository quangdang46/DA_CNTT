<?php

namespace App\Repositories\Interfaces;

interface PaymentRepositoryInterface
{

    public function createPayment(array $data);
    public function updatePayment(array $data);
    public function findPaymentByOrderId($orderId);
}
