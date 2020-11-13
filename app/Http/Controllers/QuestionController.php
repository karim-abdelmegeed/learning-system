<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;
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
            foreach($question_model['choices'] as $key=> $question_choice){
                $choice = new Choice();
                $choice->question_id = $question->id;
                $choice->choice = $question_choice;
                $choice->correct = $question_model['correct'][$key];
                $choice->save();
            }
        }

    }
}
