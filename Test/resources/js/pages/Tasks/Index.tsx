import { Head, router, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { Plus,Pencil, Trash2, CheckCircle2, XCircle, List, CheckCircle, Search,ChevronLeft, ChevronRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

interface Task {
  id: number;
  title: string;
  description: string | null;
  is_completed: boolean;
  due_date: string | null;
  list_id: number;
  list: {
    id: number;
    title: string;
  };
}

interface TaskList {
  id: number;
  title: string;
}

interface Props {
  tasks: {
    data: Task[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
  };
  lists: TaskList[];
  filters: {
    search: string;
    filter: string;
  };
  flash: {
    success?: string;
    error?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tasks', href: '/tasks' }];

export default function TasksIndex({ tasks, lists, filters, flash }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [completionFilter, setCompletionFilter] = useState<
    'all' | 'completed' | 'incomplete'
  >(filters.filter as 'all' | 'completed' | 'incomplete');

  useEffect(() => {
    if (flash?.success) {
      setToastMessage(flash.success);
      setToastType('success');
      setShowToast(true);
    } else if (flash?.error) {
      setToastMessage(flash.error);
      setToastType('error');
      setShowToast(true);
    }
  }, [flash]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const { data, setData, post, put, processing, reset, delete: destroy } =
    useForm({
      title: '',
      description: '',
      due_date: '',
      list_id: '',
      is_completed: false,
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingTask) {
       put(`/tasks/${editingTask.id}`, {
        onSuccess: () => {
          setIsOpen(false);
          reset();
          setEditingTask(null);
        },
        onError: (errors) => {
          setToastMessage('Failed to update task. Please check the form.');
          setToastType('error');
          setShowToast(true);
        },
      });
    } else {
      post('/tasks', {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
        onError: (errors) => {
          setToastMessage('Failed to create task. Please check the form.');
          setToastType('error');
          setShowToast(true);
        },
      });
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setData({
      title: task.title,
      description: task.description || '',
      due_date: task.due_date || '',
      list_id: task.list_id.toString(),
      is_completed: task.is_completed,
    });
    setIsOpen(true);
  };

  const handleDelete = (taskId: number) => {
    destroy(`/tasks/${taskId}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.get(
      '/tasks',
      { search: searchTerm, filter: completionFilter },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleFilterChange = (value: 'all' | 'completed' | 'incomplete') => {
    setCompletionFilter(value);
    router.get(
      '/tasks',
      { search: searchTerm, filter: value },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handlePageChange = (page: number) => {
    router.get(
      '/tasks',
      { page, search: searchTerm, filter: completionFilter },
      { preserveState: true, preserveScroll: true }
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tasks" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background to-muted/20">
        {showToast && (
          <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${
              toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white animate-in fade-in slide-in-from-top-5`}
          >
            {toastType === 'success' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Manage your tasks and stay organized
            </p>
          </div>

          {/* Dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="list_id">List</Label>
                  <Select
                    value={data.list_id}
                    onValueChange={(value) => setData('list_id', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a list" />
                    </SelectTrigger>
                    <SelectContent>
                      {lists.map((list) => (
                        <SelectItem key={list.id} value={list.id.toString()}>
                          {list.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={data.due_date}
                    onChange={(e) => setData('due_date', e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_completed"
                    checked={data.is_completed}
                    onChange={(e) =>
                      setData('is_completed', e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="is_completed">Completed</Label>
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                >
                  {editingTask ? 'Update' : 'Create'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-4 mb-4">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </form>

          <Select value={completionFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-x-auto">
          <table className="w-full min-w-[600px] caption-bottom text-sm">
              <thead className="[&>tr]:border-b">
                <tr className="border-b">
                  <th className="h-12 px-4 text-left">Title</th>
                  <th className="h-12 px-4 text-left">Description</th>
                  <th className="h-12 px-4 text-left">List</th>
                  <th className="h-12 px-4 text-left">Due Date</th>
                  <th className="h-12 px-4 text-left">Status</th>
                  <th className="h-12 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.data.map((task) => (
                  <tr key={task.id} className="border-b">
                    <td className="p-4">{task.title}</td>
                    <td className="p-4 max-w-[200px] truncate">
                      {task.description || 'No description'}
                    </td>
                    <td className="p-4">{task.list.title}</td>
                    <td className="p-4">{task.due_date || '—'}</td>
                    <td className="p-4">
                      {task.is_completed ? (
                        <div className="flex items-center gap-2 text-green-500">
                          <CheckCircle className="h-4 w-4" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-yellow-500">
                          <span>Pending</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(task)}
                          className="hover:bg-primary/10 hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(task.id)}
                          className="hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {tasks.data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing {tasks.from ?? 0} to {tasks.to ?? 0} of {tasks.total}{' '}
            results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(tasks.current_page - 1)}
              disabled={tasks.current_page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: tasks.last_page }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={
                      page === tasks.current_page ? 'default' : 'outline'
                    }
                    size="icon"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(tasks.current_page + 1)}
              disabled={tasks.current_page === tasks.last_page}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
    </AppLayout>
  );
}
