<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuizModelResource;
use App\Models\Quiz;
use App\Models\QuizModel;
use App\Models\Subject;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuizController extends Controller
{
    public function index()
    {
        $quizzes = Quiz::with('quizModels')->get();
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
        $models = Quiz::find($request->quiz_id)->quizModels->pluck('id')->toArray();
        $random_model_id = array_rand($models);
        $quiz_model = QuizModel::find($models[$random_model_id]);
        return new QuizModelResource($quiz_model);


    }
}
