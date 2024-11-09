<?php

namespace App\Http\Requests\System\Bus;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateBusRequest extends FormRequest
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
        $busId = $this->route('id'); // Get bus ID from route

        return [

            'model_id' => 'required|exists:bus_models,id',
            'bus_number' => 'required|string|max:255|unique:buses,bus_number,' . $busId,
//            'garage_id' => 'required|exists:garages,id',

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
            'model_id.required' => 'Bus model ID is required.',
            'model_id.exists' => 'The specified bus model does not exist.',
            'bus_number.required' => 'Bus number is required.',
            'bus_number.unique' => 'This bus number has already been taken by another bus.',
//            'garage_id.required' => 'Garage is required.',
//            'garage_id.exists' => 'The specified garage does not exist.',

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
