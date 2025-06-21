
import React from 'react';
import { Scissors } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-black/50 backdrop-blur-sm border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <Scissors className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            Eduardoo Barber
          </h1>
          <Scissors className="h-8 w-8 text-blue-400 scale-x-[-1]" />
        </div>
        <p className="text-center text-slate-300 mt-2 text-sm">
          Agendamento Online
        </p>
      </div>
    </header>
  );
};
