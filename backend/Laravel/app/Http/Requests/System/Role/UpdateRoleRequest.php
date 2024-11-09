<?php

namespace App\Http\Requests\System\Role;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Cho phép thực hiện request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $roleId = $this->route('id'); // Get the role ID from the route

        return [
            'name' => 'required|string|max:255|unique:roles,name,' . $roleId, // Ignore current role ID for uniqueness
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
            'name.required' => 'Tên vai trò là bắt buộc.',
            'name.unique' => 'Tên vai trò đã tồn tại.',
            'name.string' => 'Tên vai trò phải là một chuỗi.',
            'name.max' => 'Tên vai trò không được vượt quá 255 ký tự.',
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
