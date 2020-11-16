<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $appends=['model_names'];

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

}
