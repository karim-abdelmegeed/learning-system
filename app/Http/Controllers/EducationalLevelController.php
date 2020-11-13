<?php

namespace App\Http\Controllers;

use App\Models\EducationalLevel;

class EducationalLevelController extends Controller
{
    public function __invoke()
    {
        return response()->json(EducationalLevel::all(), 200);
    }
}
