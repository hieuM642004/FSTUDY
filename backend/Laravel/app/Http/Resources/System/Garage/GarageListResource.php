<?php

namespace App\Http\Resources\System\Garage;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GarageListResource extends JsonResource
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
            'name' =>$this->name , // Garage name must be unique in the garages table
            'tax_code' => $this->tax_code, // Optional tax code
            'address' => $this->address, // Optional address
            'phone' => $this->phone,
           'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),

        ];
    }
}
