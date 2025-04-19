'use client';

import { Plus, Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import { MinuteFormData } from '../../types/minute-form-data.type';

type ReportsProps = {
  form: UseFormReturn<MinuteFormData>;
};

export default function Reports({ form }: ReportsProps) {
  const addReport = () => {
    const currentReports = form.getValues('reports') || [];
    form.setValue('reports', [
      ...currentReports,
      {
        praesidium: '',
        number: '',
        mysteries: '',
        rosaries: '',
        otherPrayers: [{ name: '', amount: '' }],
        workHours: '',
        invitationsMade: '',
        invitationsAccepted: '',
        adultContacts: '',
        youthContacts: '',
        adolescentContacts: '',
        childContacts: '',
      },
    ]);
  };

  const removeReport = (index: number) => {
    const currentReports = form.getValues('reports') || [];
    form.setValue(
      'reports',
      currentReports.filter((_, i) => i !== index),
    );
  };

  const addPrayer = (reportIndex: number) => {
    const currentReports = form.getValues('reports') || [];
    const currentPrayers = currentReports[reportIndex]?.otherPrayers || [];

    const updatedReports = [...currentReports];
    updatedReports[reportIndex] = {
      ...updatedReports[reportIndex],
      otherPrayers: [...currentPrayers, { name: '', amount: '' }],
    };

    form.setValue('reports', updatedReports);
  };

  const removePrayer = (reportIndex: number, prayerIndex: number) => {
    const currentReports = form.getValues('reports') || [];
    const currentPrayers = currentReports[reportIndex]?.otherPrayers || [];

    const updatedReports = [...currentReports];
    updatedReports[reportIndex] = {
      ...updatedReports[reportIndex],
      otherPrayers: currentPrayers.filter((_, i) => i !== prayerIndex),
    };

    form.setValue('reports', updatedReports);
  };

  return (
    <TabsContent value="reports" className="space-y-6">
      {form.watch('reports')?.map((_, reportIndex) => (
        <Card key={reportIndex}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Relatório {reportIndex + 1}</CardTitle>
              {reportIndex > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeReport(reportIndex)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remover Relatório
                </Button>
              )}
            </div>
            <CardDescription>
              Informações do relatório do Praesidium
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name={`reports.${reportIndex}.praesidium`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Praesidium</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`reports.${reportIndex}.number`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do Relatório</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name={`reports.${reportIndex}.mysteries`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mistérios Contemplados</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`reports.${reportIndex}.rosaries`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rosários</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Outras Orações</h3>

              {form
                .watch(`reports.${reportIndex}.otherPrayers`)
                ?.map((_, prayerIndex) => (
                  <div
                    key={prayerIndex}
                    className="border p-4 rounded-md space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">
                        Oração {prayerIndex + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removePrayer(reportIndex, prayerIndex)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remover
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`reports.${reportIndex}.otherPrayers.${prayerIndex}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Oração</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`reports.${reportIndex}.otherPrayers.${prayerIndex}.amount`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantidade</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
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
                onClick={() => addPrayer(reportIndex)}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Adicionar Oração
              </Button>
            </div>

            <FormField
              control={form.control}
              name={`reports.${reportIndex}.workHours`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total de Horas de Trabalho</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Formato: HH:MM (ex: 02:30 para 2 horas e 30 minutos)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name={`reports.${reportIndex}.invitationsMade`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Convites Feitos</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`reports.${reportIndex}.invitationsAccepted`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Convites Aceitos</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h3 className="font-medium mb-4">Total de Contatos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name={`reports.${reportIndex}.adultContacts`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adultos</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`reports.${reportIndex}.youthContacts`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jovens</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name={`reports.${reportIndex}.adolescentContacts`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adolescentes</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`reports.${reportIndex}.childContacts`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crianças</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addReport}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" /> Adicionar Relatório
      </Button>
    </TabsContent>
  );
}
