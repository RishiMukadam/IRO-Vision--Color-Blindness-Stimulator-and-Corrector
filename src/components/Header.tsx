import { Eye, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <Eye className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">IRO VISION</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/info"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Learn About Color Blindness
              </Link>
              <Link
                to="/test"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Take Color Vision Test
              </Link>
            </nav>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
}