import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTask();

  return (
    <div className="bg-zinc-800 w-full max-w-md p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <header className="flex justify-between items-start mb-4">
        <h1 className="text-xl font-bold text-white">{task.title}</h1>

        <div className="flex gap-2">
          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-md font-medium transition-colors"
          >
            Delete
          </button>

          <Link to={`/task/${task._id}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md font-medium transition-colors">
              Edit
            </button>
          </Link>
        </div>
      </header>

      <p className="text-slate-300 text-sm mb-3">
        {task.description || <span className="italic text-slate-500">No description provided.</span>}
      </p>

      <p className="text-sm text-slate-400">
        <span className="font-medium">Date:</span> {dayjs(task.date).utc().format("DD/MM/YYYY")}
      </p>
    </div>
  );
}

export default TaskCard;
