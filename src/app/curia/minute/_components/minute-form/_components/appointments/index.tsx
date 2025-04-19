'use client';

import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import { UseFormReturn } from 'react-hook-form';
import { MinuteFormData } from '../../types/minute-form-data.type';

type AppointmentsProps = {
  form: UseFormReturn<MinuteFormData>;
};

export default function Appointments({ form }: AppointmentsProps) {
  const removeAppointment = (index: number) => {
    const currentAppointments = form.getValues('appointments') || [];
    form.setValue(
      'appointments',
      currentAppointments.filter((_, i) => i !== index),
    );
  };

  const addAppointment = () => {
    const currentAppointments = form.getValues('appointments') || [];
    form.setValue('appointments', [
      ...currentAppointments,
      { name: '', praesidium: '', position: '' },
    ]);
  };

  return (
    <TabsContent value="appointments" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nomeações</CardTitle>
          <CardDescription>
            Registre as nomeações realizadas durante a reunião
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {form.watch('appointments')?.map((_, index) => (
            <div key={index} className="border p-4 rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Nomeação {index + 1}</h3>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeAppointment(index)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remover
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`appointments.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`appointments.${index}.praesidium`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Praesidium</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`appointments.${index}.position`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addAppointment}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" /> Adicionar Nomeação
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
