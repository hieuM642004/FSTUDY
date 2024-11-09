<?php

namespace App\Http\Resources\System\BusStation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BusStationResource extends JsonResource
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
            'garage' => $this->garage_id,
            'address' => $this->address,
            'province' => [
                'province_id' => $this->province_id,
                'name' => $this->province->name,
            ],
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
