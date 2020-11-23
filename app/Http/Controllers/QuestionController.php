<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuizModelResource;
use App\Models\Choice;
use App\Models\Question;
use App\Models\QuizModel;
use App\Models\StudentAnswer;
use App\Models\UserQuiz;
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
            $question->file_path = isset($question_model['file']) ? $question_model['file'] : null;
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

    public function uploadQuestionImage(Request $request)
    {
        $file = $request->file('file')->store('/public/questions');
        return $file;
    }

    public function validateAnswer(Request $request)
    {

        $model_id = $request->model_id;
        $question_id = $request->question_id;
        $answer = $request->answer;
        $quiz = QuizModel::find($model_id)->quiz;
        $student_answer = new StudentAnswer();
        $student_answer->user_id = auth()->id();
        $student_answer->question_id = $question_id;
        $student_answer->choice_id = $answer;
        $choice = Choice::find($answer);
        $choice->correct == "1" ? $score = 1 : $score = 0;
        $student_answer->score = $score;
        $student_answer->save();
        $user_quiz = UserQuiz::where('quiz_id', $quiz->id)->where('user_id', Auth::id())->first();
        $user_quiz->score+=$score;
        $user_quiz->save();
        $next_question = Question::where('quiz_model_id', $model_id)->where('id', '>', $question_id)->first();
        return $next_question;
    }
}
