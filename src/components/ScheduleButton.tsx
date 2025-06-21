
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSchedule } from '@/contexts/ScheduleContext';

export const ScheduleButton = () => {
  const { scheduleData } = useSchedule();
  
  const isFormValid = scheduleData.clientName && 
                     scheduleData.phoneNumber && 
                     scheduleData.selectedDate && 
                     scheduleData.selectedTime;

  const handleSchedule = () => {
    if (!isFormValid || !scheduleData.selectedDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para agendar.",
        variant: "destructive",
      });
      return;
    }

    // Formatar a data para o WhatsApp
    const formattedDate = format(scheduleData.selectedDate, "dd/MM/yyyy", { locale: ptBR });
    const dayOfWeekName = format(scheduleData.selectedDate, "EEEE", { locale: ptBR });
    
    // Criar mensagem para WhatsApp
    const message = `Olá! Gostaria de confirmar meu agendamento na Eduardoo Barber:
    
👤 Nome: ${scheduleData.clientName}
📅 Data: ${dayOfWeekName}, ${formattedDate}
⏰ Horário: ${scheduleData.selectedTime}
📱 Telefone: ${scheduleData.phoneNumber}

Aguardo confirmação!`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número do WhatsApp da barbearia (substitua pelo número real)
    const whatsappNumber = "5511999999999";
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Agendamento enviado!",
      description: "Redirecionando para o WhatsApp para confirmação.",
    });
  };

  return (
    <div className="space-y-3">
      <Button 
        onClick={handleSchedule}
        disabled={!isFormValid}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 text-base shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        size="lg"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        Agendar via WhatsApp
      </Button>

      <p className="text-slate-300 text-xs text-center">
        Ao clicar em "Agendar via WhatsApp", você será redirecionado para confirmar seu agendamento.
      </p>
    </div>
  );
};
