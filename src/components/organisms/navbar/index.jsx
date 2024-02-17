export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="#" className="text-white font-bold text-lg">
            <div className="flex">
              <img src="/src/assets/logo.png" alt="vite" className="h-8"/>
              <span className="ml-2">Media Collector</span>
            </div>
          </a>
        </div>

        <div>
          <a href="#" className="text-gray-300 hover:text-white mr-4">Login</a>
          <a href="#" className="text-gray-300 hover:text-white">Signup</a>
        </div>
      </div>
    </nav>
  );
}