'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MinuteTextPreview } from '../minute-text-preview';
import Appointments from './_components/appointments';
import GeneralInformations from './_components/general-informations';
import Reports from './_components/reports';
import SpiritualReading from './_components/spiritual-reading';
import Treasury from './_components/treasury';
import { minuteFormSchema } from './_schemas/minute-form.schema';
import { MinuteFormData } from './types/minute-form-data.type';

export function MinuteForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formValues, setFormValues] = useState<any>({});

  const form = useForm<MinuteFormData>({
    resolver: zodResolver(minuteFormSchema),
    defaultValues: {
      parish: 'Paróquia Santos Anjos',
      curia: 'Cúria Juvenil Nossa Senhora Rainha dos Anjos',
      appointments: [],
      treasury: {
        contributions: [{ praesidium: '', amount: '' }],
        expenses: [{ name: '', amount: '' }],
      },
      reports: [
        {
          otherPrayers: [{ name: '', amount: '' }],
        },
      ],
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormValues(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Função para processar edições de texto
  const handleTextEdit = (newText: string) => {
    // Aqui você implementaria a lógica para atualizar os campos do formulário
    // com base no texto editado. Esta é uma implementação complexa que exigiria
    // análise de texto e mapeamento para os campos específicos.
    console.log(`Texto da ata foi editado:`, newText);

    // Por simplicidade, apenas atualizamos o estado local
    // Em uma implementação completa, você analisaria o texto e atualizaria os campos do formulário
  };

  // Handle form submission
  function onSubmit(data: MinuteFormData) {
    console.log(data);
    // Here you would typically send the data to your backend
    alert('Ata salva com sucesso!');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <MinuteTextPreview formData={formValues} onTextEdit={handleTextEdit} />

        <Tabs defaultValue="general-informations" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="general-informations">
              Informações Gerais
            </TabsTrigger>
            <TabsTrigger value="spiritual-reading">
              Leitura Espiritual
            </TabsTrigger>
            <TabsTrigger value="appointments">Nomeações</TabsTrigger>
            <TabsTrigger value="treasury">Tesouraria</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <GeneralInformations form={form} />

          <SpiritualReading form={form} />

          <Appointments form={form} />

          <Treasury form={form} />

          <Reports form={form} />
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Gerar Ata</Button>
        </div>
      </form>
    </Form>
  );
}
