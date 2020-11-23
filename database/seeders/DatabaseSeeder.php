<?php

namespace Database\Seeders;

use App\Models\EducationalLevel;
use App\Models\Role;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()

    {
        $educational_levels = [
            [
                'name' => 'First Secondary'
            ],
            [
                'name' => 'Second Secondary'
            ],
            [
                'name' => 'Third Secondary'
            ]
        ];
        $roles = [
            [
                "name" => 'admin'
            ],
            [
                "name" => 'student'
            ],
        ];
        $subjects = [
            [
                'name' => 'English physics'
            ],
            [
                'name' =>'فيزياء عربى'
            ]
        ];
        EducationalLevel::insert($educational_levels);
        Role::insert($roles);
        Subject::insert($subjects);

        User::insert(["name" => "Bassem Mohamed", "phone" => "01280422976", "password" => bcrypt("01280422976123456"), "role_id" => 1]);
    }
}
