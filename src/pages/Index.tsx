
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, Phone, User, MessageSquare, Scissors } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Horários disponíveis (40 em 40 minutos)
  const availableTimes = [
    "08:00", "08:40", "09:20", "10:00", "10:40", "11:20",
    "12:00", "12:40", "13:20", "14:00", "14:40", "15:20",
    "16:00", "16:40", "17:20", "18:00", "18:40", "19:20"
  ];

  const handleSchedule = () => {
    if (!clientName || !phoneNumber || !selectedDate || !selectedTime) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para agendar.",
        variant: "destructive",
      });
      return;
    }

    // Formatar a data para o WhatsApp
    const formattedDate = format(selectedDate, "dd/MM/yyyy", { locale: ptBR });
    const dayOfWeek = format(selectedDate, "EEEE", { locale: ptBR });
    
    // Criar mensagem para WhatsApp
    const message = `Olá! Gostaria de confirmar meu agendamento na Eduardoo Barber:
    
👤 Nome: ${clientName}
📅 Data: ${dayOfWeek}, ${formattedDate}
⏰ Horário: ${selectedTime}
📱 Telefone: ${phoneNumber}

Aguardo confirmação!`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número do WhatsApp da barbearia (substitua pelo número real)
    const whatsappNumber = "5511999999999"; // Substitua pelo número real
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Agendamento enviado!",
      description: "Redirecionando para o WhatsApp para confirmação.",
    });

    // Limpar formulário
    setClientName("");
    setPhoneNumber("");
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-amber-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <Scissors className="h-8 w-8 text-amber-400" />
            <h1 className="text-3xl font-bold text-white">Eduardoo Barber</h1>
            <Scissors className="h-8 w-8 text-amber-400 scale-x-[-1]" />
          </div>
          <p className="text-center text-amber-200 mt-2">Agendamento Online</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-zinc-900/80 backdrop-blur-sm border-amber-500/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <Calendar className="h-6 w-6 text-amber-400" />
                Agende seu Horário
              </CardTitle>
              <p className="text-amber-200">Preencha os dados abaixo para agendar seu corte</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Dados do Cliente */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white flex items-center gap-2">
                      <User className="h-4 w-4 text-amber-400" />
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="bg-zinc-800 border-amber-500/30 text-white placeholder:text-zinc-400 focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white flex items-center gap-2">
                      <Phone className="h-4 w-4 text-amber-400" />
                      Telefone (WhatsApp)
                    </Label>
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="bg-zinc-800 border-amber-500/30 text-white placeholder:text-zinc-400 focus:border-amber-400"
                    />
                  </div>

                  {/* Horários Disponíveis */}
                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-400" />
                      Horários Disponíveis
                    </Label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className={`text-sm ${
                            selectedTime === time
                              ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-500"
                              : "bg-zinc-800 hover:bg-zinc-700 text-white border-amber-500/30 hover:border-amber-400"
                          }`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calendário */}
                <div className="space-y-4">
                  <Label className="text-white flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-amber-400" />
                    Selecione a Data
                  </Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => 
                        date < new Date() || 
                        date.getDay() === 0 // Desabilita domingos
                      }
                      className="rounded-lg border border-amber-500/30 bg-zinc-800 text-white pointer-events-auto"
                      classNames={{
                        months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                        month: "space-y-4 w-full flex flex-col",
                        caption: "flex justify-center pt-1 relative items-center text-white",
                        caption_label: "text-sm font-medium text-white",
                        nav: "space-x-1 flex items-center",
                        nav_button: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-amber-500/30 bg-transparent hover:bg-amber-500/20 hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-amber-200 rounded-md w-8 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                        day: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-amber-500/20 hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-white",
                        day_selected: "bg-amber-600 text-white hover:bg-amber-700 hover:text-white focus:bg-amber-600 focus:text-white",
                        day_today: "bg-amber-500/20 text-amber-200",
                        day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Resumo do Agendamento */}
              {(clientName || phoneNumber || selectedDate || selectedTime) && (
                <Card className="bg-zinc-800/50 border-amber-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-400">Resumo do Agendamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-white">
                    {clientName && <p><strong>Nome:</strong> {clientName}</p>}
                    {phoneNumber && <p><strong>Telefone:</strong> {phoneNumber}</p>}
                    {selectedDate && (
                      <p><strong>Data:</strong> {format(selectedDate, "EEEE, dd/MM/yyyy", { locale: ptBR })}</p>
                    )}
                    {selectedTime && <p><strong>Horário:</strong> {selectedTime}</p>}
                  </CardContent>
                </Card>
              )}

              {/* Botão de Agendar */}
              <Button 
                onClick={handleSchedule}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                size="lg"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Agendar via WhatsApp
              </Button>

              <p className="text-amber-200 text-sm text-center">
                Ao clicar em "Agendar via WhatsApp", você será redirecionado para confirmar seu agendamento.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
