
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { useSchedule } from '@/contexts/ScheduleContext';

const getAvailableTimesForDate = (date: Date): string[] => {
  const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, etc.
  
  switch (dayOfWeek) {
    case 0: // Domingo - Fechado
    case 3: // Quarta - Fechado
      return [];
    case 1: // Segunda (08:30 às 18:00)
      return [
        "08:30", "09:10", "09:50", "10:30", "11:10", "11:50",
        "12:30", "13:10", "13:50", "14:30", "15:10", "15:50",
        "16:30", "17:10", "17:50"
      ];
    case 2: // Terça (08:30 às 17:00)
    case 4: // Quinta (08:30 às 17:00)
      return [
        "08:30", "09:10", "09:50", "10:30", "11:10", "11:50",
        "12:30", "13:10", "13:50", "14:30", "15:10", "15:50",
        "16:30"
      ];
    case 5: // Sexta (08:30 às 20:00)
    case 6: // Sábado (08:30 às 20:00)
      return [
        "08:30", "09:10", "09:50", "10:30", "11:10", "11:50",
        "12:30", "13:10", "13:50", "14:30", "15:10", "15:50",
        "16:30", "17:10", "17:50", "18:30", "19:10", "19:50"
      ];
    default:
      return [];
  }
};

export const TimeSelector = () => {
  const { scheduleData, setSelectedTime, getOccupiedTimes } = useSchedule();
  
  const availableTimes = scheduleData.selectedDate ? getAvailableTimesForDate(scheduleData.selectedDate) : [];
  const occupiedTimes = scheduleData.selectedDate ? getOccupiedTimes(scheduleData.selectedDate) : [];
  
  const getDayStatus = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 3 ? "Fechado" : "Aberto";
  };

  return (
    <div className="space-y-3">
      <Label className="text-white flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4 text-blue-400" />
        Horários Disponíveis
        {scheduleData.selectedDate && (
          <span className="text-xs text-slate-300">
            ({getDayStatus(scheduleData.selectedDate)})
          </span>
        )}
      </Label>
      
      {!scheduleData.selectedDate ? (
        <div className="text-slate-400 text-center py-6 text-sm">
          Selecione uma data primeiro
        </div>
      ) : availableTimes.length === 0 ? (
        <div className="text-slate-400 text-center py-6 text-sm">
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
                    ? "bg-red-900/50 border-red-700 text-red-300 cursor-not-allowed opacity-60"
                    : isSelected
                    ? "bg-blue-600 hover:bg-blue-500 text-white border-blue-500"
                    : "bg-slate-800 hover:bg-slate-700 text-white border-slate-600 hover:border-blue-500"
                }`}
              >
                {time}
                {isOccupied && (
                  <span className="block text-xs text-red-400 mt-1">
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
