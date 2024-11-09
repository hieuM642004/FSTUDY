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
        Schema::create('garages', function (Blueprint $table) {
            $table->id(); // Auto-incremented primary key
            $table->string('name', 255)->unique(); // Garage name
            $table->string('tax_code')->nullable(); // Optional tax code
            $table->text('address')->nullable(); // Garage address
            $table->string('phone', 15)->nullable(); // Contact phone number
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('garages');
    }
};
