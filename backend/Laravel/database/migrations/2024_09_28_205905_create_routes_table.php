<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('departure_station_id');
            $table->unsignedBigInteger('arrival_station_id');
            $table->unsignedBigInteger('garage_id'); // Add foreign key for garages
            $table->time('departure_time');
            $table->time('arrival_time');
            $table->decimal('ticket_price', 10, 2);
            $table->unsignedBigInteger('bus_id');
            $table->unsignedBigInteger('driver_id');
            // Foreign key
            $table->foreign('garage_id')->references('id')->on('garages')->onDelete('cascade');
            $table->foreign('departure_station_id')->references('id')->on('bus_stations')->onDelete('cascade');
            $table->foreign('arrival_station_id')->references('id')->on('bus_stations')->onDelete('cascade');
            $table->foreign('bus_id')->references('id')->on('buses')->onDelete('cascade');
            $table->foreign('driver_id')->references('id')->on('drivers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('routes');
    }
};
