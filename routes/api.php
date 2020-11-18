<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\EducationalLevelController;
use \App\Http\Controllers\QuizController;
use \App\Http\Controllers\QuestionController;
use \App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);


Route::get('/educational-levels', [EducationalLevelController::class, '__invoke']);
Route::get('quizzes', [QuizController::class, 'index']);
Route::post('/quiz', [QuizController::class, 'store']);
Route::get('/quiz/take', [QuizController::class, 'takeQuiz']);
Route::get('/subjects', [QuizController::class, 'getSubjects']);
Route::post('/questions', [QuestionController::class, 'store']);
Route::post('/questions/answer', [QuestionController::class, 'validateAnswer'])->middleware('auth:api');


