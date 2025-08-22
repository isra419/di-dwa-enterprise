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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('rating', 2, 1);
            $table->string('product_image', 1000);
            $table->foreignIdFor(\App\Models\ProductCategory::class)->constrained()->cascadeOnDelete();
            $table->string('price')->default(0);
            $table->unsignedTinyInteger('discount');
            $table->integer('qty_in_stock')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
