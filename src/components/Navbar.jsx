import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Verifica se a rota atual corresponde ao link
  const isActive = (path) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white/20 backdrop-blur-sm py-5 animate-fade-in border-b shadow-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-blue-600">PIB Brasil</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${isActive('/') 
                ? 'bg-blue-100 text-blue-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Gráfico de Evolução
            </Link>
            <Link 
              to="/tabela" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${isActive('/tabela') 
                ? 'bg-blue-100 text-blue-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Tabela de Dados
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-blue-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-blue-600 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-blue-600 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen 
          ? 'max-h-48 opacity-100 mt-4' 
          : 'max-h-0 opacity-0 pointer-events-none'}`}
        >
          <div className="flex flex-col space-y-2 py-2">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={`px-4 py-3 rounded-lg transition-all duration-300 ${isActive('/') 
                ? 'bg-blue-100 text-blue-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Gráfico de Evolução
            </Link>
            <Link 
              to="/tabela" 
              onClick={() => setIsMenuOpen(false)}
              className={`px-4 py-3 rounded-lg transition-all duration-300 ${isActive('/tabela') 
                ? 'bg-blue-100 text-blue-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Tabela de Dados
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
