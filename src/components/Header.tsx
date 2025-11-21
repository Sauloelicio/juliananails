
import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center">
            JulianaNailsDesign
          </h1>
          <Sparkles className="h-8 w-8 text-primary scale-x-[-1]" />
        </div>
        <p className="text-center text-muted-foreground mt-2 text-sm">
          Agendamento Online
        </p>
      </div>
    </header>
  );
};
