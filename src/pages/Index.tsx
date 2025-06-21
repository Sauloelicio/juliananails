
import React from 'react';
import { Header } from '@/components/Header';
import { SchedulingForm } from '@/components/SchedulingForm';
import { ScheduleProvider } from '@/contexts/ScheduleContext';

const Index = () => {
  return (
    <ScheduleProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-lg mx-auto">
            <SchedulingForm />
          </div>
        </main>
      </div>
    </ScheduleProvider>
  );
};

export default Index;
