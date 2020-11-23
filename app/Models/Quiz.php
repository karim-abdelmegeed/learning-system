<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $appends=['model_names','score'];

    public function quizModels()
    {
        return $this->hasMany(QuizModel::class, 'quiz_id');
    }

    public function getModelNamesAttribute()
    {
        $models = [];
        foreach ($this->quizModels()->get()->toArray() as $model) {
            array_push($models,$model['name']);
        }
        return $models;
    }
    public function getScoreAttribute(){
        $user_quiz=UserQuiz::where('quiz_id',$this->id)->where('user_id',auth()->id())->first();
        if($user_quiz && Carbon::now()->gte($this->result_date)){
            return $user_quiz->score;
        }
        return '';
    }

}
