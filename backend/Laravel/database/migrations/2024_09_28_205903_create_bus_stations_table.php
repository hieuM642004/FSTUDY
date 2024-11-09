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
        Schema::create('bus_stations', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Name of the bus station
            $table->unsignedBigInteger('garage_id'); // Add foreign key for garages
            $table->unsignedBigInteger('province_id'); // Foreign key to province
            $table->string('address')->nullable(); // Address of the bus station
            $table->timestamps();

            $table->foreign('garage_id')->references('id')->on('garages')->onDelete('cascade');
            $table->foreign('province_id')->references('id')->on('provinces')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bus_stations');
    }
};
