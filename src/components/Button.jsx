import { Link } from "react-router-dom";

export default function Button({ texto, link }) {
  return (
    <Link to={link}>
      <button className="rounded-lg border border-transparent px-4 py-2 text-base font-medium bg-gray-900 cursor-pointer transition-colors duration-300 hover:border-indigo-400 focus:outline focus:outline-4 focus:outline-blue-500">
        {texto}
      </button>
    </Link>
  );
}
