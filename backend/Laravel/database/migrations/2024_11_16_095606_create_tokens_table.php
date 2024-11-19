<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('tokens', function (Blueprint $table) {
        $table->id();
        $table->text('access_token')->nullable();
        $table->text('refresh_token');
        $table->timestamp('expires_at')->nullable(); // Thời gian hết hạn của access_token
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tokens');
    }
};
