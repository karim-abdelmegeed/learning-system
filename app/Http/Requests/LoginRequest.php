<?php

namespace App\Http\Requests;

use App\Exceptions\CustomValidationException;
use App\Helper\ResponseApi;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public $responseApi;

    public function __construct(ResponseApi $responseApi, array $query = [], array $request = [], array $attributes = [], array $cookies = [], array $files = [], array $server = [], $content = null)
    {
        $this->responseApi = $responseApi;
        parent::__construct($query, $request, $attributes, $cookies, $files, $server, $content);
    }

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'phone' => 'required|numeric',
            'password' => 'required|min:6'
        ];
    }

    /**
     * @param Validator $validator
     * @throws CustomValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new CustomValidationException($validator->errors(),$this->responseApi);
    }


}
