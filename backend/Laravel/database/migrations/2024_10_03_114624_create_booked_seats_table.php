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
        Schema::create('booked_seats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('route_id');
            $table->integer('seat_number');
            $table->date('date');
            $table->timestamps();

            $table->foreign('route_id')->references('id')->on('routes')->onDelete('cascade');
            $table->unique(['route_id', 'seat_number', 'date']); // Prevent duplicate bookings for the same seat on the same day
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booked_seats');
    }
};
