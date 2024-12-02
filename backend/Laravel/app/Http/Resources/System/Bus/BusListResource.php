<?php

namespace App\Http\Resources\System\Bus;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BusListResource extends JsonResource
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
            'bus_number' => $this->bus_number,
            'model' => $this->busModel ? [ // Check if the relationship exists
                'id' => $this->busModel->id,
                'name' => $this->busModel->name,
                'capacity' => $this->busModel->capacity,
            ] : null, // Return null if there's no associated model
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
