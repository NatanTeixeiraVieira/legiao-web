import { MinuteForm } from '@/app/curia/minute/_components/minute-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nova Ata',
  description: 'Criação da Ata da reunião anterior',
};

export default function NewMinutePage() {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nova Ata</h1>
      <MinuteForm />
    </div>
  );
}
