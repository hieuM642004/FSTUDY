<?php

namespace App\Http\Requests\System\Garage;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateGarageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow request execution
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $garageId = $this->route('id'); // Get the garage ID from the route

        return [
            'name' => 'required|string|max:255|unique:garages,name,' . $garageId, // Ignore current garage ID for uniqueness
            'tax_code' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:15|regex:/^[0-9]+$/',
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
            'name.required' => 'Tên gara là bắt buộc.',
            'name.unique' => 'Tên gara đã tồn tại.',
            'name.string' => 'Tên gara phải là một chuỗi.',
            'name.max' => 'Tên gara không được vượt quá 255 ký tự.',
            'tax_code.string' => 'Mã số thuế phải là một chuỗi.',
            'tax_code.max' => 'Mã số thuế không được vượt quá 50 ký tự.',
            'address.string' => 'Địa chỉ phải là một chuỗi.',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
            'phone.string' => 'Số điện thoại phải là một chuỗi.',
            'phone.max' => 'Số điện thoại không được vượt quá 15 ký tự.',
            'phone.regex' => 'Số điện thoại chỉ được chứa chữ số.',
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
