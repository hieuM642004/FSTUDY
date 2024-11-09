<?php

namespace App\Http\Resources\System\Driver;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DriverListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'role' => $this->role,
            'garage' => $this->Garage ? [ // Check if the relationship exists
                'id' => $this->Garage->id,
                'name' => $this->Garage->name,
                'tax_code' => $this->Garage->tax_code,
                'address' => $this->Garage->address,
                'phone' => $this->Garage->phone,
            ] : null,
           'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),

        ];
    }
}
