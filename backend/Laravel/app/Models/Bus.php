<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\BusModel; // Ensure this line is included in Bus.php

class Bus extends Model
{
    use HasFactory;

    protected $fillable = [
        'garage_id',      // Garage owner
        'bus_number',   // Unique bus number
        'model_id',     // Foreign key to BusModel
    ];

    // A bus belongs to a garage (user)
    public function Garage(): BelongsTo
    {
        return $this->belongsTo(Garage::class , 'garage_id');
    }

    // A bus belongs to a bus model
    public function busModel(): BelongsTo
    {
        return $this->belongsTo(BusModel::class, 'model_id'); // Foreign key: model_id
    }

    // A bus has many schedules
    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }
}
