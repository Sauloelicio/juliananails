
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare } from "lucide-react";
import { ClientForm } from './ClientForm';
import { DateSelector } from './DateSelector';
import { TimeSelector } from './TimeSelector';
import { ScheduleSummary } from './ScheduleSummary';
import { ScheduleButton } from './ScheduleButton';
import { BusinessHours } from './BusinessHours';

export const SchedulingForm = () => {
  return (
    <Card className="bg-slate-900/95 backdrop-blur-sm border-slate-700/50 shadow-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl text-white flex items-center justify-center gap-2">
          <Calendar className="h-5 w-5 text-blue-400" />
          Agende seu Horário
        </CardTitle>
        <p className="text-slate-300 text-sm">
          Preencha os dados para agendar seu corte
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ClientForm />
        <DateSelector />
        <TimeSelector />
        <ScheduleSummary />
        <ScheduleButton />
        <BusinessHours />
      </CardContent>
    </Card>
  );
};
