import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link className="text-white font-bold text-lg" to='/'>
            <div className="flex">
              <img src="/src/assets/logo.png" alt="vite" className="h-8"/>
              <span className="ml-2 pt-1">Media Collector</span>
            </div>
          </Link>
        </div>

        <div>
          <Link className="text-gray-200 hover:text-white mr-4" to='/login'>Iniciar Sesión</Link>
          <Link className="text-gray-200 hover:text-white" to='/signup'>Registrarme</Link>
        </div>
      </div>
    </nav>
  );
}