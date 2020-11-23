<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizModel extends Model
{
    use HasFactory;

    public function questions()
    {
        return $this->hasMany(Question::class, 'quiz_model_id');
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class, 'quiz_id');
    }
}
