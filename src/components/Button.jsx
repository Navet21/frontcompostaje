import { Link } from "react-router-dom";

export default function Button({ texto, link }) {
  return (
    <Link to={link}>
            <button className="bg-gray-900 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-400 text-white">
            {texto}
      </button>
    </Link>
  );
}
