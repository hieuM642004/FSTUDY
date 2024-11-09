<?php

namespace App\Http\Requests\System\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'route_id' => 'required|exists:routes,id',
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'email' => 'required|email|max:255',
            'pickup_point' => 'required|string|max:255',
            'dropoff_point' => 'required|string|max:255',
            'seat_number' => 'required|array',
            'seat_number.*' => 'integer',
        ];
    }
}
