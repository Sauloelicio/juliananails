import React from 'react';
import { Clock } from 'lucide-react';

export const BusinessHours = () => {
  return (
    <div className="mt-6 pt-6 border-t border-border">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-primary" />
        <h3 className="text-foreground font-semibold text-sm">Horário de Funcionamento</h3>
      </div>
      <div className="space-y-1 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Domingo</span>
          <span className="text-destructive">Fechado</span>
        </div>
        <div className="flex justify-between">
          <span>Segunda a Sábado</span>
          <span>09:00 às 18:00</span>
        </div>
        <div className="flex justify-between text-xs italic mt-2">
          <span className="text-muted-foreground">Intervalo de almoço: 12:00 às 13:30</span>
        </div>
      </div>
    </div>
  );
};
