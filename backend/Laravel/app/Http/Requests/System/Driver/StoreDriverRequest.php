<?php

namespace App\Http\Requests\System\Driver;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreDriverRequest extends FormRequest
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
            'name' => 'required|string|max:255', // Validate the name field
            'phone' => 'nullable|string|max:15', // Validate the phone field (nullable)
            'email' => 'nullable|email|unique:drivers,email', // Email must be unique in drivers table
            'role' => 'required|in:driver,assistant,attendant', // Ensure role is one of the allowed values
            'garage_id' => 'required|exists:garages,id', // Ensure the garage_id exists in the garages table
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
            'name.required' => 'Tên tài xế là bắt buộc.',
            'name.string' => 'Tên tài xế phải là một chuỗi.',
            'name.max' => 'Tên tài xế không được vượt quá 255 ký tự.',
            'phone.string' => 'Số điện thoại phải là một chuỗi.',
            'phone.max' => 'Số điện thoại không được vượt quá 15 ký tự.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email đã tồn tại.',
            'role.required' => 'Vai trò là bắt buộc.',
            'role.in' => 'Vai trò phải là driver, assistant hoặc attendant.',
            'garage_id.required' => 'Garage là bắt buộc.',
            'garage_id.exists' => 'Garage không tồn tại.',
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
            'message' => 'Đã xảy ra lỗi khi gửi yêu cầu.',
            'errors' => $errors
        ], 422));
    }
}
