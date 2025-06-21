
import React, { createContext, useContext, useState } from 'react';

interface ScheduleData {
  clientName: string;
  phoneNumber: string;
  selectedDate: Date | undefined;
  selectedTime: string;
}

interface ScheduleContextType {
  scheduleData: ScheduleData;
  setClientName: (name: string) => void;
  setPhoneNumber: (phone: string) => void;
  setSelectedDate: (date: Date | undefined) => void;
  setSelectedTime: (time: string) => void;
  getOccupiedTimes: (date: Date) => string[];
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

// Simulação de horários ocupados - em um app real, isso viria de uma API
const occupiedSlots: { [key: string]: string[] } = {
  '2024-06-24': ['09:10', '14:30', '16:30'],
  '2024-06-25': ['10:30', '15:10'],
  '2024-06-26': ['08:30', '11:50', '17:10'],
  '2024-06-28': ['13:10', '18:30'],
  '2024-06-29': ['09:50', '12:30', '19:10'],
};

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    clientName: '',
    phoneNumber: '',
    selectedDate: undefined,
    selectedTime: '',
  });

  const setClientName = (name: string) => {
    setScheduleData(prev => ({ ...prev, clientName: name }));
  };

  const setPhoneNumber = (phone: string) => {
    setScheduleData(prev => ({ ...prev, phoneNumber: phone }));
  };

  const setSelectedDate = (date: Date | undefined) => {
    setScheduleData(prev => ({ ...prev, selectedDate: date, selectedTime: '' }));
  };

  const setSelectedTime = (time: string) => {
    setScheduleData(prev => ({ ...prev, selectedTime: time }));
  };

  const getOccupiedTimes = (date: Date): string[] => {
    const dateKey = date.toISOString().split('T')[0];
    return occupiedSlots[dateKey] || [];
  };

  return (
    <ScheduleContext.Provider value={{
      scheduleData,
      setClientName,
      setPhoneNumber,
      setSelectedDate,
      setSelectedTime,
      getOccupiedTimes,
    }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};
