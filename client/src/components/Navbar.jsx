import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-zinc-900 shadow-md py-4 px-6 md:px-10 rounded-lg flex justify-between items-center mb-6 border border-zinc-700">
      <Link
        to={isAuthenticated ? "/task" : "/"}
        className="text-white text-2xl font-bold tracking-wide hover:text-blue-400 transition-colors"
      >
        <span className="text-blue-500">Task</span>
        <span className="text-white">Manager</span>
      </Link>

      <ul className="flex gap-4 items-center text-sm font-medium">
        {isAuthenticated ? (
          <>
            <li className="text-slate-300 hidden sm:block">
              Hi, <span className="font-semibold text-white">{user?.username}</span>
            </li>
            <li>
              <Link
                to="/add-task"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                + Add Task
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
