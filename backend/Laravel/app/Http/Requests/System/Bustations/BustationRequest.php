<?php

namespace App\Http\Requests\System\Bustations;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class BustationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow the request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'address' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'province_id' => 'required|exists:provinces,id', // Ensure province_id exists in provinces table
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
{
    return [
        'address.required' => 'Địa chỉ là bắt buộc.',
        'address.string' => 'Địa chỉ phải là chuỗi ký tự.',
        'name.required' => 'Tên là bắt buộc.',
        'name.string' => 'Tên phải là chuỗi ký tự.',
        'province_id.required' => 'Tỉnh/thành phố là bắt buộc.',
    ];
}

    /**
     * Handle a failed validation attempt.
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();

        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation error occurred.',
            'errors' => $errors
        ], 422));
    }
}
