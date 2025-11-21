
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { useSchedule } from '@/contexts/ScheduleContext';

const getAvailableTimesForDate = (date: Date): string[] => {
  const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, etc.
  
  // Domingo fechado
  if (dayOfWeek === 0) {
    return [];
  }
  
  // Segunda a Sábado: 09:00 às 18:00, exceto intervalo de almoço 12:00-13:30
  // Cada atendimento dura 1 hora
  return [
    "09:00", "10:00", "11:00",
    // Almoço 12:00 - 13:30
    "14:00", "15:00", "16:00", "17:00"
  ];
};

export const TimeSelector = () => {
  const { scheduleData, setSelectedTime, getOccupiedTimes } = useSchedule();
  
  const availableTimes = scheduleData.selectedDate ? getAvailableTimesForDate(scheduleData.selectedDate) : [];
  const occupiedTimes = scheduleData.selectedDate ? getOccupiedTimes(scheduleData.selectedDate) : [];
  
  const getDayStatus = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 ? "Fechado" : "Aberto";
  };

  return (
    <div className="space-y-3">
      <Label className="text-foreground flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4 text-primary" />
        Horários Disponíveis
        {scheduleData.selectedDate && (
          <span className="text-xs text-muted-foreground">
            ({getDayStatus(scheduleData.selectedDate)})
          </span>
        )}
      </Label>
      
      {!scheduleData.selectedDate ? (
        <div className="text-muted-foreground text-center py-6 text-sm">
          Selecione uma data primeiro
        </div>
      ) : availableTimes.length === 0 ? (
        <div className="text-muted-foreground text-center py-6 text-sm">
          Fechado neste dia
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
          {availableTimes.map((time) => {
            const isOccupied = occupiedTimes.includes(time);
            const isSelected = scheduleData.selectedTime === time;
            
            return (
              <Button
                key={time}
                variant={isSelected ? "default" : "outline"}
                onClick={() => !isOccupied && setSelectedTime(time)}
                disabled={isOccupied}
                className={`text-xs p-2 h-auto ${
                  isOccupied
                    ? "bg-destructive/20 border-destructive text-destructive cursor-not-allowed opacity-60"
                    : isSelected
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted text-foreground border-border hover:border-primary"
                }`}
              >
                {time}
                {isOccupied && (
                  <span className="block text-xs text-destructive mt-1">
                    Ocupado
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
