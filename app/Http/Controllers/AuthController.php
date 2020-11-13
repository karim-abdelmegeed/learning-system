<?php

namespace App\Http\Controllers;

use App\Helper\ResponseApi;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    private $response;

    public function __construct(ResponseApi $response)
    {
        $this->response = $response;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required',
            'password' => 'required|min:6',
            'phone' => 'required',
            'educational_level' => 'required|exists:educational_levels,id',
            'subject' => 'required|exists:subjects,id',
        ]);
        if ($validator->fails()) {
            return $this->response->setError($validator->errors())->returnJSON(422);
        }
        $user = new User();
        $user->name = $request->full_name;
        $user->phone = $request->phone;
        $user->password = bcrypt($request->password);
        $user->educational_level_id = $request->educational_level;
        $user->subject_id = $request->subject;
        $user->save();
        return $this->response->setData($user)->setSuccess("user Saved Successfully")->returnJSON(200);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('phone', 'password');
        if (Auth::attempt($credentials)) {
            $tokenResult = auth()->user()->createToken('Personal Access Token');
            $token = $tokenResult->token;
            $token->save();
            $response_data = [
                'access_token' => $tokenResult->accessToken,
                'user' => auth()->user()
            ];
            return $this->response->setSuccess("you logged in successfully")->setData($response_data)->returnJSON(200);
        }
        return $this->response->setError("Invalid Phone or password")->setData()->returnJSON(401);

    }

    public function logout()
    {
        $userToken = Auth::user()->token();
        $userToken->revoke();
        return response()->json("logout successfully", 200);
    }
}
