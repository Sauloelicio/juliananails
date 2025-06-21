
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSchedule } from '@/contexts/ScheduleContext';

export const ScheduleSummary = () => {
  const { scheduleData } = useSchedule();
  
  const hasAnyData = scheduleData.clientName || scheduleData.phoneNumber || 
                    scheduleData.selectedDate || scheduleData.selectedTime;
  
  if (!hasAnyData) return null;

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-slate-300">
          Resumo do Agendamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-white text-sm">
        {scheduleData.clientName && (
          <p><strong>Nome:</strong> {scheduleData.clientName}</p>
        )}
        {scheduleData.phoneNumber && (
          <p><strong>Telefone:</strong> {scheduleData.phoneNumber}</p>
        )}
        {scheduleData.selectedDate && (
          <p>
            <strong>Data:</strong> {format(scheduleData.selectedDate, "EEEE, dd/MM/yyyy", { locale: ptBR })}
          </p>
        )}
        {scheduleData.selectedTime && (
          <p><strong>Horário:</strong> {scheduleData.selectedTime}</p>
        )}
      </CardContent>
    </Card>
  );
};
