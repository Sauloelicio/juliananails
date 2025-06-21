
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const BusinessHours = () => {
  return (
    <Card className="bg-slate-800/30 border-slate-600">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-slate-300">
          Horários de Funcionamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-xs text-slate-300">
        <div className="flex justify-between">
          <span>Domingo:</span>
          <span className="text-red-400">Fechado</span>
        </div>
        <div className="flex justify-between">
          <span>Segunda:</span>
          <span>08:30 às 18:00</span>
        </div>
        <div className="flex justify-between">
          <span>Terça:</span>
          <span>08:30 às 17:00</span>
        </div>
        <div className="flex justify-between">
          <span>Quarta:</span>
          <span className="text-red-400">Fechado</span>
        </div>
        <div className="flex justify-between">
          <span>Quinta:</span>
          <span>08:30 às 17:00</span>
        </div>
        <div className="flex justify-between">
          <span>Sexta:</span>
          <span>08:30 às 20:00</span>
        </div>
        <div className="flex justify-between">
          <span>Sábado:</span>
          <span>08:30 às 20:00</span>
        </div>
      </CardContent>
    </Card>
  );
};
