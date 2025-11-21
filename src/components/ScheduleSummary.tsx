import React from 'react';
import { useSchedule } from '@/contexts/ScheduleContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, User, Phone, Sparkles } from 'lucide-react';

export const ScheduleSummary = () => {
  const { scheduleData } = useSchedule();
  
  if (!scheduleData.selectedDate || !scheduleData.selectedTime || !scheduleData.clientName) {
    return null;
  }

  const formattedDate = format(scheduleData.selectedDate, "dd/MM/yyyy", { locale: ptBR });
  const dayOfWeek = format(scheduleData.selectedDate, "EEEE", { locale: ptBR });

  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-2 border border-border">
      <h3 className="text-foreground font-semibold text-sm mb-3">Resumo do Agendamento</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-foreground">
          <User className="h-4 w-4 text-primary" />
          <span>{scheduleData.clientName}</span>
        </div>
        
        <div className="flex items-center gap-2 text-foreground">
          <Phone className="h-4 w-4 text-primary" />
          <span>{scheduleData.phoneNumber}</span>
        </div>

        {scheduleData.selectedService && (
          <div className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{scheduleData.selectedService}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{dayOfWeek}, {formattedDate}</span>
        </div>
        
        <div className="flex items-center gap-2 text-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span>{scheduleData.selectedTime}</span>
        </div>
      </div>
    </div>
  );
};
