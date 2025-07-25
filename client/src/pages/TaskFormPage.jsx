import { useForm } from 'react-hook-form';
import { useTask } from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTask();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const taskData = {
      ...data,
      date: dayjs(data.date).utc().format(),
    };

    if (params.id) {
      updateTask(params.id, taskData);
    } else {
      createTask(taskData);
    }
    navigate("/task");
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 px-4">
      <form onSubmit={onSubmit} className="bg-zinc-800 w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          {params.id ? "Edit Task" : "Create New Task"}
        </h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold text-slate-300 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter a title"
            {...register("title", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows="4"
            placeholder="Enter a description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="date" className="block text-sm font-semibold text-slate-300 mb-1">
            Date
          </label>
          <input
            type="date"
            {...register("date")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Save Task
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;
