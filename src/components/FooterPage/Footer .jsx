import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; 2025 Nitish Kumar Kushwaha. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a 
            href="https://github.com/Nitish43094" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:text-blue-600"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/nitish-kushwaha-415748229/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:text-blue-600"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;