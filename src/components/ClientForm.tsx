
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone } from "lucide-react";
import { useSchedule } from '@/contexts/ScheduleContext';

export const ClientForm = () => {
  const { scheduleData, setClientName, setPhoneNumber } = useSchedule();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-blue-400" />
          Nome Completo
        </Label>
        <Input
          id="name"
          value={scheduleData.clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Digite seu nome completo"
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-blue-400" />
          Telefone (WhatsApp)
        </Label>
        <Input
          id="phone"
          value={scheduleData.phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="(11) 99999-9999"
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
        />
      </div>
    </div>
  );
};
