
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSchedule } from '@/contexts/ScheduleContext';

export const ScheduleButton = () => {
  const { scheduleData } = useSchedule();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const isFormValid = scheduleData.clientName && 
                     scheduleData.phoneNumber && 
                     scheduleData.selectedDate && 
                     scheduleData.selectedTime &&
                     scheduleData.selectedService;

  const generateMessage = () => {
    if (!scheduleData.selectedDate) return '';
    
    const formattedDate = format(scheduleData.selectedDate, "dd/MM/yyyy", { locale: ptBR });
    const dayOfWeekName = format(scheduleData.selectedDate, "EEEE", { locale: ptBR });
    
    return `✨ Agendamento Confirmado! ✨

Olá, ${scheduleData.clientName}!
Seu horário foi reservado com sucesso na JulianaNailsDesign 💅✨

📆 Data: ${dayOfWeekName}, ${formattedDate}
⏰ Horário: ${scheduleData.selectedTime}
💛 Serviço: ${scheduleData.selectedService}

Estamos felizes em te receber!
Qualquer dúvida ou alteração, é só chamar aqui mesmo. 💬

Obrigada por escolher a JulianaNailsDesign.
Te esperamos no horário marcado! 💛🤍`;
  };

  const handleSchedule = () => {
    if (!isFormValid || !scheduleData.selectedDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para agendar.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsRedirecting(true);
      const message = generateMessage();
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "5579988689607";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      toast({
        title: "Redirecionando...",
        description: "Abrindo WhatsApp para confirmar seu agendamento.",
      });

      // Redirecionamento direto (mais confiável que window.open)
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 500);
      
    } catch (error) {
      toast({
        title: "Erro ao redirecionar",
        description: "Use o botão 'Copiar Mensagem' abaixo como alternativa.",
        variant: "destructive",
      });
      setIsRedirecting(false);
    }
  };

  const handleCopyMessage = async () => {
    if (!isFormValid || !scheduleData.selectedDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos primeiro.",
        variant: "destructive",
      });
      return;
    }

    try {
      const message = generateMessage();
      await navigator.clipboard.writeText(message);
      
      toast({
        title: "Mensagem copiada! 📋",
        description: "Cole no WhatsApp: +55 79 98868-9607",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a mensagem.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      <Button 
        onClick={handleSchedule}
        disabled={!isFormValid || isRedirecting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        size="lg"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        {isRedirecting ? "Redirecionando..." : "Agendar via WhatsApp"}
      </Button>

      <Button 
        onClick={handleCopyMessage}
        disabled={!isFormValid}
        variant="outline"
        className="w-full border-primary/20 text-foreground hover:bg-primary/5 font-medium py-3 text-sm"
        size="lg"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copiar Mensagem
      </Button>

      <p className="text-muted-foreground text-xs text-center">
        Clique em "Agendar" para abrir o WhatsApp ou copie a mensagem manualmente.
      </p>
    </div>
  );
};
