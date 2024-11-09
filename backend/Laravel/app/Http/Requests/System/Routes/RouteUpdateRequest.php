<?php

namespace App\Http\Requests\System\Routes;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RouteUpdateRequest extends FormRequest
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
            'departure_station_id' => 'required|exists:bus_stations,id',
            'arrival_station_id' => 'required|exists:bus_stations,id',
            'departure_time' => 'required|date_format:H:i',
            'arrival_time' => 'required|date_format:H:i|after:departure_time',
            'ticket_price' => 'required|numeric|min:0',
            'bus_id' => 'required|exists:buses,id',
            'driver_id' => 'required|exists:drivers,id', // Thêm driver_id vào đây nếu cần
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
            'departure_station_id.required' => 'Trạm xuất phát là bắt buộc.',
            'departure_station_id.exists' => 'Trạm xuất phát không tồn tại.',
            'arrival_station_id.required' => 'Trạm đến là bắt buộc.',
            'arrival_station_id.exists' => 'Trạm đến không tồn tại.',
            'departure_time.required' => 'Thời gian khởi hành là bắt buộc.',
            'departure_time.date_format' => 'Thời gian khởi hành phải ở định dạng HH:MM.',
            'arrival_time.required' => 'Thời gian đến là bắt buộc.',
            'arrival_time.date_format' => 'Thời gian đến phải ở định dạng HH:MM.',
            'arrival_time.after' => 'Thời gian đến phải sau thời gian khởi hành.',
            'ticket_price.required' => 'Giá vé là bắt buộc.',
            'ticket_price.numeric' => 'Giá vé phải là một số.',
            'ticket_price.min' => 'Giá vé phải lớn hơn hoặc bằng 0.',
            'bus_id.required' => 'ID xe là bắt buộc.',
            'bus_id.exists' => 'Xe không tồn tại.',
            'driver_id.required' => 'ID tài xế là bắt buộc.',
            'driver_id.exists' => 'Tài xế không tồn tại.',
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
