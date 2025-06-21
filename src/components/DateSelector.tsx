
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { useSchedule } from '@/contexts/ScheduleContext';
import { ptBR } from "date-fns/locale";

export const DateSelector = () => {
  const { scheduleData, setSelectedDate } = useSchedule();

  return (
    <div className="space-y-3">
      <Label className="text-white flex items-center gap-2 text-sm">
        <CalendarIcon className="h-4 w-4 text-blue-400" />
        Selecione a Data
      </Label>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={scheduleData.selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dayOfWeek = date.getDay();
            // Desabilita datas passadas e quartas-feiras (dia 3)
            return date < today || dayOfWeek === 3;
          }}
          locale={ptBR}
          className="rounded-lg border border-slate-600 bg-slate-800/50 text-white scale-90 sm:scale-100"
          classNames={{
            months: "flex w-full flex-col space-y-4",
            month: "space-y-4 w-full",
            caption: "flex justify-center pt-1 relative items-center text-white",
            caption_label: "text-sm font-medium text-white",
            nav: "space-x-1 flex items-center",
            nav_button: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-slate-600 bg-transparent hover:bg-slate-700 text-white h-7 w-7",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-slate-300 rounded-md w-8 font-normal text-xs",
            row: "flex w-full mt-2",
            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            day: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-700 h-8 w-8 text-white",
            day_selected: "bg-blue-600 text-white hover:bg-blue-500",
            day_today: "bg-slate-700/50 text-slate-200",
            day_outside: "text-slate-500 opacity-50",
            day_disabled: "text-slate-600 opacity-30",
          }}
        />
      </div>
    </div>
  );
};
