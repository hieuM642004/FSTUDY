<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketSeatsTable extends Migration
{
    public function up(): void
    {
        Schema::create('ticket_seats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ticket_id'); // Mã vé
            $table->integer('seat_number'); // Số ghế
            $table->timestamps();
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticket_seats');
    }
}
