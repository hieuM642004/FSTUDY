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
        Schema::create('buses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('model_id');
            $table->string('bus_number')->unique(); // Unique bus number
            $table->foreign('model_id')->references('id')->on('bus_models')->onDelete('cascade');
            $table->unsignedBigInteger('garage_id'); // Add foreign key for garages
            $table->foreign('garage_id')->references('id')->on('garages')->onDelete('cascade');
            $table->timestamps();
            // Foreign key for user
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buses');
    }
};
