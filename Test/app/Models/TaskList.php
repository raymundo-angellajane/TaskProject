<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    protected $table = 'lists';

    protected $fillable = [
        'title',
        'description',
        'user_id',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'list_id');
    }
    public function user()
    {
        return $this->BelongsTo(User::class, 'user_id');
    }
}
