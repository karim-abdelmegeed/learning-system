<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuizModelResource;
use App\Models\Choice;
use App\Models\Question;
use App\Models\QuizModel;
use App\Models\StudentAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'model_id' => 'required|exists:quiz_models,id',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $data = $request->model_data;
        foreach ($data as $question_model) {
            $question = new Question();
            $question->description = $question_model['question'];
            $question->quiz_model_id = $request->model_id;
            $question->save();
            foreach ($question_model['choices'] as $key => $question_choice) {
                $choice = new Choice();
                $choice->question_id = $question->id;
                $choice->choice = $question_choice;
                $choice->correct = $question_model['correct'][$key];
                $choice->save();
            }
        }

    }

    public function validateAnswer(Request $request)
    {
        $model_id=$request->model_id;
        $question_id=$request->question_id;
        $answer=$request->answer;
        $student_answer=new StudentAnswer();
        $student_answer->user_id=auth()->id();
        $student_answer->question_id=$question_id;
        $student_answer->choice_id=$answer;
        $student_answer->save();
        $next_question=Question::where('quiz_model_id',$model_id)->where('id','>',$question_id)->first();
        return $next_question;



    }
}
