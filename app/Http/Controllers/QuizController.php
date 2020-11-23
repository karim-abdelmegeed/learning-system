<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuizModelResource;
use App\Models\Quiz;
use App\Models\QuizModel;
use App\Models\Role;
use App\Models\Subject;
use App\Models\UserQuiz;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class QuizController extends Controller
{
    public function index()
    {
        if (auth()->user()->role_id == Role::ADMIN) {
            $quizzes = Quiz::with('quizModels')->get();
        } else {
            $quizzes = Quiz::get()->map(function($quiz){
                $quiz->quiz_models=[];
                return $quiz;
            });
        }
        return response()->json($quizzes, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'models' => 'required|numeric',
            'time' => 'nullable',
            'end_date' => 'required',
            'result_date' => 'required',
            'educational_level_id' => 'required|exists:educational_levels,id',
            'subject_id' => 'required|exists:subjects,id'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $quiz = new Quiz();
        $quiz->title = $request->name;
        $quiz->token = uniqid();
        $quiz->models = $request->models;
        $quiz->time = Carbon::parse($request->time)->format('H:i');
        $quiz->end_date = Carbon::parse($request->end_date);
        $quiz->result_date = Carbon::parse($request->result_date);
        $quiz->educational_level_id = $request->educational_level_id;
        $quiz->subject_id = $request->subject_id;
        $quiz->save();
        $quiz_models = [];
        $model_name = 'A';
        for ($i = 0; $i < $request->models; $i++) {
            array_push($quiz_models, ['name' => 'Model ' . $model_name, 'quiz_id' => $quiz->id]);
            $model_name++;
        }
        QuizModel::insert($quiz_models);
        return response()->json(200);
    }

    public function getSubjects()
    {
        $subjects = Subject::all();
        return response()->json($subjects, 200);
    }

    public function takeQuiz(Request $request)
    {
        $quiz_model = QuizModel::find($request->model_id);
        return new QuizModelResource($quiz_model);
    }
    public function initStudentQuiz(Request $request)
    {
        $quiz_id = $request->quiz_id;

        if (UserQuiz::where('user_id', Auth::id())->where('quiz_id', $quiz_id)->first()) {
            return response()->json("you can not take quiz", 422);
        }
        DB::table('user_quizzes')
            ->insert(['user_id' => Auth::id(), 'quiz_id' => $quiz_id, 'score' => 0]);
        $models = Quiz::find($request->quiz_id)->quizModels->pluck('id')->toArray();
        $random_model_id = array_rand($models);
        return $models[$random_model_id];
    }
}
