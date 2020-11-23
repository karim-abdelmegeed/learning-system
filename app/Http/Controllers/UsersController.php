<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getStudents()
    {
        return User::where('role_id', Role::STUDENT)->get();
    }
}
