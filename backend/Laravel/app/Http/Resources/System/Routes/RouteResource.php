<?php

namespace App\Http\Resources\System\Routes;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RouteResource extends JsonResource
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
            'departure_station_id' => $this->departure_station_id,
            'arrival_station_id' => $this->arrival_station_id,
            'garage_id' => $this->garage_id,
            'departure_time' => $this->departure_time,
            'arrival_time' => $this->arrival_time,
            'ticket_price' => $this->ticket_price,
            'bus_id' => $this->bus_id,
            'driver_id' => $this->driver_id,
            'created_at' => $this->created_at->toISOString(), // Đảm bảo đây là đối tượng Carbon
            'updated_at' => $this->updated_at->toISOString(), // Đảm bảo đây là đối tượng Carbon
        ];
    }
}
