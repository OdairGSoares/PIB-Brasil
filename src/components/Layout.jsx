import React from 'react';
import Navbar from './Navbar';
import Background from './Background';

const Layout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen">
      <Background />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-16 animate-fade-in max-w-6xl m-12">
        <header className="text-center animate-slide-down m-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-3 tracking-tight">{title}</h1>
          {subtitle && <p className="text-gray-500 text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </header>
        
        <main>
          {children}
        </main>
        
        <footer className="mt-20 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          <p>Dados fornecidos pela API do IBGE</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
