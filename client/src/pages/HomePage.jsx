import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="flex flex-col justify-center items-center text-center min-h-[70vh] px-6">
      {isAuthenticated ? (
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Welcome back, <span className="text-blue-400">{user?.username}</span>!
          </h1>
          <p className="text-slate-300 mb-6 text-sm sm:text-base">
            You can view or manage your tasks from your dashboard.
          </p>
          <Link
            to="/task"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors shadow"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Welcome to <span className="text-blue-400">Task Manager</span>
          </h1>
          <p className="text-slate-300 mb-6 text-sm sm:text-base max-w-xl">
            Organize your day, keep track of your work, and boost your productivity with our simple and effective task management tool.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors shadow"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-colors shadow"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default HomePage;
