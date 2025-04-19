import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { MinuteFormData } from '../../types/minute-form-data.type';

type TreasuryProps = {
  form: UseFormReturn<MinuteFormData>;
};

export default function Treasury({ form }: TreasuryProps) {
  const addContribution = () => {
    const currentContributions = form.getValues('treasury.contributions') || [];
    form.setValue('treasury.contributions', [
      ...currentContributions,
      { praesidium: '', amount: '' },
    ]);
  };

  const removeContribution = (index: number) => {
    const currentContributions = form.getValues('treasury.contributions') || [];
    form.setValue(
      'treasury.contributions',
      currentContributions.filter((_, i) => i !== index),
    );
  };

  const addExpense = () => {
    const currentExpenses = form.getValues('treasury.expenses') || [];
    form.setValue('treasury.expenses', [
      ...currentExpenses,
      { name: '', amount: '' },
    ]);
  };

  const removeExpense = (index: number) => {
    const currentExpenses = form.getValues('treasury.expenses') || [];
    form.setValue(
      'treasury.expenses',
      currentExpenses.filter((_, i) => i !== index),
    );
  };
  return (
    <TabsContent value="treasury" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatório da Treasury</CardTitle>
          <CardDescription>Informações financeiras da reunião</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="treasury.previousBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saldo Anterior (R$)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treasury.dailyCollection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coleta do Dia (R$)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="treasury.lastMeetingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data da Última Reunião</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="font-medium">Contribuições dos Praesidia</h3>

            {form.watch('treasury.contributions')?.map((_, index) => (
              <div key={index} className="border p-4 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">
                    Contribuição {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeContribution(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remover
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`treasury.contributions.${index}.praesidium`}
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
                    name={`treasury.contributions.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (R$)</FormLabel>
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
              onClick={addContribution}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Adicionar Contribuição
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Despesas</h3>

            {form.watch('treasury.expenses')?.map((_, index) => (
              <div key={index} className="border p-4 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Expense {index + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExpense(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remover
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`treasury.expenses.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`treasury.expenses.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (R$)</FormLabel>
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
              onClick={addExpense}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Adicionar Expense
            </Button>
          </div>

          <FormField
            control={form.control}
            name="treasury.finalBalance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Saldo Final (R$)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
