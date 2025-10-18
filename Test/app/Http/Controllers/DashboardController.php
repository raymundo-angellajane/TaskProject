<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TaskList;
use App\Models\Task;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $lists = TaskList::where('user_id',$user->id)->get();
        $tasks = Task::whereHas('list',function($query) use ($user){
            $query->where('user_id',$user->id);
        })->get();
        $stats = [
            'totalLists'=> $lists->count(),
            'totalTasks'=> $tasks->count(),
            'completedTasks'=> $tasks->where('is_completed',true)->count(),
            'pendingTasks'=> $tasks->where('is_completed',false)->count(),
        ];

        // Fetch recent activities: last 5 lists and tasks combined, sorted by created_at desc
        $recentLists = TaskList::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($list) {
                return [
                    'type' => 'list',
                    'title' => $list->title,
                    'created_at' => $list->created_at->format('Y-m-d H:i:s'),
                ];
            });

        $recentTasks = Task::whereHas('list', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($task) {
                return [
                    'type' => 'task',
                    'title' => $task->title,
                    'created_at' => $task->created_at->format('Y-m-d H:i:s'),
                ];
            });

        $recentActivities = $recentLists->concat($recentTasks)
            ->sortByDesc('created_at')
            ->take(5)
            ->values();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'lists' => $lists,
            'tasks' => $tasks,
            'recentActivities' => $recentActivities,
            'flash' =>[
                'success'=>session('success'),
                'error'=>session('error')
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
