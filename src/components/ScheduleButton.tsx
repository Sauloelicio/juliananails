
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
                     scheduleData.selectedTime &&
                     scheduleData.selectedService;

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
    const message = `✨ Agendamento Confirmado! ✨

Olá, ${scheduleData.clientName}!
Seu horário foi reservado com sucesso na JulianaNailsDesign 💅✨

📆 Data: ${dayOfWeekName}, ${formattedDate}
⏰ Horário: ${scheduleData.selectedTime}
💛 Serviço: ${scheduleData.selectedService}

Estamos felizes em te receber!
Qualquer dúvida ou alteração, é só chamar aqui mesmo. 💬

Obrigada por escolher a JulianaNailsDesign.
Te esperamos no horário marcado! 💛🤍`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número do WhatsApp
    const whatsappNumber = "5579988689607";
    
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
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        size="lg"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        Agendar via WhatsApp
      </Button>

      <p className="text-muted-foreground text-xs text-center">
        Ao clicar em "Agendar via WhatsApp", você será redirecionado para confirmar seu agendamento.
      </p>
    </div>
  );
};
