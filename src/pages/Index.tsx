
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

  // Horários disponíveis baseados nos dias da semana
  const getAvailableTimesForDate = (date: Date) => {
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

  const availableTimes = selectedDate ? getAvailableTimesForDate(selectedDate) : [];

  const getDayStatus = (date: Date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 3) {
      return "Fechado";
    }
    return "Aberto";
  };

  const handleSchedule = () => {
    if (!clientName || !phoneNumber || !selectedDate || !selectedTime) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para agendar.",
        variant: "destructive",
      });
      return;
    }

    // Verificar se é um dia de funcionamento
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 3) {
      toast({
        title: "Dia não disponível",
        description: "A barbearia está fechada neste dia.",
        variant: "destructive",
      });
      return;
    }

    // Formatar a data para o WhatsApp
    const formattedDate = format(selectedDate, "dd/MM/yyyy", { locale: ptBR });
    const dayOfWeekName = format(selectedDate, "EEEE", { locale: ptBR });
    
    // Criar mensagem para WhatsApp
    const message = `Olá! Gostaria de confirmar meu agendamento na Eduardoo Barber:
    
👤 Nome: ${clientName}
📅 Data: ${dayOfWeekName}, ${formattedDate}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <Scissors className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Eduardoo Barber</h1>
            <Scissors className="h-8 w-8 text-blue-400 scale-x-[-1]" />
          </div>
          <p className="text-center text-slate-300 mt-2">Agendamento Online</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-900/90 backdrop-blur-sm border-slate-700/50 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <Calendar className="h-6 w-6 text-blue-400" />
                Agende seu Horário
              </CardTitle>
              <p className="text-slate-300">Preencha os dados abaixo para agendar seu corte</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Dados do Cliente */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-400" />
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-400" />
                      Telefone (WhatsApp)
                    </Label>
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    />
                  </div>

                  {/* Horários Disponíveis */}
                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      Horários Disponíveis
                      {selectedDate && (
                        <span className="text-sm text-slate-300">
                          ({getDayStatus(selectedDate)})
                        </span>
                      )}
                    </Label>
                    {selectedDate && availableTimes.length === 0 ? (
                      <div className="text-slate-400 text-center py-4">
                        Fechado neste dia
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            className={`text-sm ${
                              selectedTime === time
                                ? "bg-blue-700 hover:bg-blue-600 text-white border-blue-500"
                                : "bg-slate-800 hover:bg-slate-700 text-white border-slate-600 hover:border-blue-500"
                            }`}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Calendário */}
                <div className="space-y-4">
                  <Label className="text-white flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-blue-400" />
                    Selecione a Data
                  </Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setSelectedTime(""); // Reset time when date changes
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const dayOfWeek = date.getDay();
                        return date < today || dayOfWeek === 0 || dayOfWeek === 3; // Desabilita datas passadas, domingos e quartas
                      }}
                      locale={ptBR}
                      className="rounded-lg border border-slate-600 bg-slate-800 text-white"
                      classNames={{
                        months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                        month: "space-y-4 w-full flex flex-col",
                        caption: "flex justify-center pt-1 relative items-center text-white",
                        caption_label: "text-sm font-medium text-white",
                        nav: "space-x-1 flex items-center",
                        nav_button: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-600 bg-transparent hover:bg-slate-700 hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-slate-300 rounded-md w-8 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                        day: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-700 hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-white",
                        day_selected: "bg-blue-600 text-white hover:bg-blue-500 hover:text-white focus:bg-blue-600 focus:text-white",
                        day_today: "bg-slate-700/50 text-slate-200",
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
                <Card className="bg-slate-800/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-300">Resumo do Agendamento</CardTitle>
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
                disabled={!clientName || !phoneNumber || !selectedDate || !selectedTime || availableTimes.length === 0}
                className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 text-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Agendar via WhatsApp
              </Button>

              <p className="text-slate-300 text-sm text-center">
                Ao clicar em "Agendar via WhatsApp", você será redirecionado para confirmar seu agendamento.
              </p>

              {/* Horários de Funcionamento */}
              <Card className="bg-slate-800/30 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-300">Horários de Funcionamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span className="text-red-400">Fechado</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Segunda:</span>
                    <span>08:30 às 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Terça:</span>
                    <span>08:30 às 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quarta:</span>
                    <span className="text-red-400">Fechado</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quinta:</span>
                    <span>08:30 às 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sexta:</span>
                    <span>08:30 às 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span>08:30 às 20:00</span>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
