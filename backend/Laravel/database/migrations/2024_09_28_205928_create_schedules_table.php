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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id')->constrained()->onDelete('cascade');
            $table->foreignId('bus_id')->constrained()->onDelete('cascade');
            $table->time('departure_time');
            $table->timestamp('arrival_time')->nullable(); // Add nullable() to make it optional
            $table->integer('available_seats'); // Tracks available seats
            $table->decimal('ticket_price', 10, 2); // Ticket price for the route
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
