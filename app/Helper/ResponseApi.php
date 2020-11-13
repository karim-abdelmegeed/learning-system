<?php


namespace App\Helper;


use Illuminate\Http\JsonResponse;
use Illuminate\Routing\ResponseFactory;

class ResponseApi
{
    protected $request;

    /**
     * @var ResponseFactory
     */
    protected $response,$response_code;

    /**
     * @var array
     */
    protected $body;

    public function __construct(ResponseFactory $response)
    {
        $this->response = $response;
    }

    /**
     * Set response data.
     *
     * @param $data
     * @return $this
     */
    public function setData($data = null): object
    {
        $this->body['data'] = $data;
        return $this;
    }

    public function setError($error): object
    {
        $this->body['status'] = false;
        $this->body['message'] = $error;
        return $this;
    }

    public function setSuccess($message): object
    {
        $this->body['status'] = true;
        $this->body['message'] = $message;
        return $this;
    }

    public function returnJSON($response_code): JsonResponse
    {
        return $this->response->json($this->body,$response_code, [], JSON_NUMERIC_CHECK);
    }

}
