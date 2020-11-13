<?php

namespace App\Exceptions;

use App\Helper\ResponseApi;
use Exception;
use Throwable;

class CustomValidationException extends Exception
{
    private $errors, $responseApi;

    public function __construct($errors, ResponseApi $responseApi, $message = "Validation Error", $code = 0, Throwable $previous = null)
    {
        $this->errors = $errors;
        $this->responseApi = $responseApi;
        parent::__construct($message, $code, $previous);
    }

    public function errors()
    {
        return $this->errors;
    }

    public function render($request)
    {
        return $this->responseApi->setError($this->message)->setData($this->errors)->returnJSON(422);
    }
}
