'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TimePicker } from '@/components/time-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { getMisteriosByDayOfWeek } from '@/utils/mappers';
import { minuteFormSchema } from './_schemas/minute-form.schema';
import { MinuteFormData } from './types/minute-form-data.type';

export function MinuteForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const form = useForm<MinuteFormData>({
    resolver: zodResolver(minuteFormSchema),
    defaultValues: {
      paroquia: 'Paróquia Santos Anjos',
      curia: 'Cúria Juvenil Nossa Senhora Rainha dos Anjos',
      nomeacoes: [],
      tesouraria: {
        contribuicoes: [{ praesidium: '', valor: '' }],
        despesas: [{ nome: '', valor: '' }],
      },
      relatorios: [
        {
          outrasOracoes: [{ nome: '', valor: '' }],
        },
      ],
    },
  });

  // Determine mistérios based on the day of the week
  const dataReuniao = form.watch('dataReuniao');
  const misterios = dataReuniao
    ? getMisteriosByDayOfWeek(dataReuniao)
    : 'Não definido';

  // Handle form submission
  function onSubmit(data: FormValues) {
    console.log(data);
    // Here you would typically send the data to your backend
    alert('Ata salva com sucesso!');
  }

  // Add a new nomeação
  const addNomeacao = () => {
    const currentNomeacoes = form.getValues('nomeacoes') || [];
    form.setValue('nomeacoes', [
      ...currentNomeacoes,
      { nome: '', praesidium: '', cargo: '' },
    ]);
  };

  // Remove a nomeação
  const removeNomeacao = (index: number) => {
    const currentNomeacoes = form.getValues('nomeacoes') || [];
    form.setValue(
      'nomeacoes',
      currentNomeacoes.filter((_, i) => i !== index),
    );
  };

  // Add a new contribuição
  const addContribuicao = () => {
    const currentContribuicoes =
      form.getValues('tesouraria.contribuicoes') || [];
    form.setValue('tesouraria.contribuicoes', [
      ...currentContribuicoes,
      { praesidium: '', valor: '' },
    ]);
  };

  // Remove a contribuição
  const removeContribuicao = (index: number) => {
    const currentContribuicoes =
      form.getValues('tesouraria.contribuicoes') || [];
    form.setValue(
      'tesouraria.contribuicoes',
      currentContribuicoes.filter((_, i) => i !== index),
    );
  };

  // Add a new despesa
  const addDespesa = () => {
    const currentDespesas = form.getValues('tesouraria.despesas') || [];
    form.setValue('tesouraria.despesas', [
      ...currentDespesas,
      { nome: '', valor: '' },
    ]);
  };

  // Remove a despesa
  const removeDespesa = (index: number) => {
    const currentDespesas = form.getValues('tesouraria.despesas') || [];
    form.setValue(
      'tesouraria.despesas',
      currentDespesas.filter((_, i) => i !== index),
    );
  };

  // Add a new relatório
  const addRelatorio = () => {
    const currentRelatorios = form.getValues('relatorios') || [];
    form.setValue('relatorios', [
      ...currentRelatorios,
      {
        praesidium: '',
        numero: '',
        misterios: '',
        rosarios: '',
        outrasOracoes: [{ nome: '', valor: '' }],
        horasTrabalho: '',
        convitesFeitos: '',
        convitesAceitos: '',
        contatosAdultos: '',
        contatosJovens: '',
        contatosAdolescentes: '',
        contatosCriancas: '',
      },
    ]);
  };

  // Remove a relatório
  const removeRelatorio = (index: number) => {
    const currentRelatorios = form.getValues('relatorios') || [];
    form.setValue(
      'relatorios',
      currentRelatorios.filter((_, i) => i !== index),
    );
  };

  // Add a new oração to a relatório
  const addOracao = (relatorioIndex: number) => {
    const currentRelatorios = form.getValues('relatorios') || [];
    const currentOracoes =
      currentRelatorios[relatorioIndex]?.outrasOracoes || [];

    const updatedRelatorios = [...currentRelatorios];
    updatedRelatorios[relatorioIndex] = {
      ...updatedRelatorios[relatorioIndex],
      outrasOracoes: [...currentOracoes, { nome: '', valor: '' }],
    };

    form.setValue('relatorios', updatedRelatorios);
  };

  // Remove an oração from a relatório
  const removeOracao = (relatorioIndex: number, oracaoIndex: number) => {
    const currentRelatorios = form.getValues('relatorios') || [];
    const currentOracoes =
      currentRelatorios[relatorioIndex]?.outrasOracoes || [];

    const updatedRelatorios = [...currentRelatorios];
    updatedRelatorios[relatorioIndex] = {
      ...updatedRelatorios[relatorioIndex],
      outrasOracoes: currentOracoes.filter((_, i) => i !== oracaoIndex),
    };

    form.setValue('relatorios', updatedRelatorios);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="informacoes" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="informacoes">Informações Gerais</TabsTrigger>
            <TabsTrigger value="leitura">Leitura Espiritual</TabsTrigger>
            <TabsTrigger value="nomeacoes">Nomeações</TabsTrigger>
            <TabsTrigger value="tesouraria">Tesouraria</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          {/* Informações Gerais */}
          <TabsContent value="informacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais da Ata</CardTitle>
                <CardDescription>
                  Preencha as informações básicas da reunião
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="numeroAta"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número da Ata</FormLabel>
                        <FormControl>
                          <Input placeholder="001/2024" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataReuniao"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data da Reunião</FormLabel>
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
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="paroquia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paróquia</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="curia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cúria</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="horaInicio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora de Início</FormLabel>
                        <FormControl>
                          <TimePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="horaCatena"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora da Catena</FormLabel>
                        <FormControl>
                          <TimePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="horaFim"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora de Fim</FormLabel>
                        <FormControl>
                          <TimePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border p-4 rounded-md bg-muted/50">
                  <h3 className="font-medium mb-2">Mistérios do dia</h3>
                  <p>{misterios}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Determinado automaticamente com base no dia da semana da
                    reunião
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="presentes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Presentes</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acolhida"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quem fez a acolhida</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="statusAta.lida"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Ata foi lida</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="statusAta.aprovada"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Ata foi aprovada</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="statusAta.assinada"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Ata foi assinada</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {!form.watch('statusAta.lida') && (
                    <FormField
                      control={form.control}
                      name="statusAta.motivoNaoLeitura"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motivo da não leitura da ata</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="proximaReuniao"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data da Próxima Reunião</FormLabel>
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
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="proximoRelatorio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Praesidium do Próximo Relatório</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alocução</CardTitle>
                <CardDescription>
                  Informações sobre a alocução realizada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="alocucao.autor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quem fez a alocução</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alocucao.mensagem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem da alocução</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alocucao.fonte"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fonte (opcional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        De onde foi retirada a alocução, se aplicável
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leitura Espiritual */}
          <TabsContent value="leitura" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leitura Espiritual</CardTitle>
                <CardDescription>
                  Informações sobre a leitura espiritual realizada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="leituraEspiritual.pagina"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número da Página</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="leituraEspiritual.capitulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capítulo</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="leituraEspiritual.item"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item</FormLabel>
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
                    name="leituraEspiritual.leitorNome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome de quem leu</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="leituraEspiritual.leitorGenero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gênero</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o gênero" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="leituraEspiritual.titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da Leitura</FormLabel>
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

          {/* Nomeações */}
          <TabsContent value="nomeacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nomeações</CardTitle>
                <CardDescription>
                  Registre as nomeações realizadas durante a reunião
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {form.watch('nomeacoes')?.map((_, index) => (
                  <div key={index} className="border p-4 rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Nomeação {index + 1}</h3>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeNomeacao(index)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remover
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`nomeacoes.${index}.nome`}
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
                        name={`nomeacoes.${index}.praesidium`}
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
                        name={`nomeacoes.${index}.cargo`}
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
                  onClick={addNomeacao}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" /> Adicionar Nomeação
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tesouraria */}
          <TabsContent value="tesouraria" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatório da Tesouraria</CardTitle>
                <CardDescription>
                  Informações financeiras da reunião
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="tesouraria.saldoAnterior"
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
                    name="tesouraria.coletaDia"
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
                  name="tesouraria.dataUltimaReuniao"
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

                  {form.watch('tesouraria.contribuicoes')?.map((_, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-md space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">
                          Contribuição {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeContribuicao(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remover
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`tesouraria.contribuicoes.${index}.praesidium`}
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
                          name={`tesouraria.contribuicoes.${index}.valor`}
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
                    onClick={addContribuicao}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Adicionar Contribuição
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Despesas</h3>

                  {form.watch('tesouraria.despesas')?.map((_, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-md space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">
                          Despesa {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeDespesa(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remover
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`tesouraria.despesas.${index}.nome`}
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
                          name={`tesouraria.despesas.${index}.valor`}
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
                    onClick={addDespesa}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Adicionar Despesa
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="tesouraria.saldoFinal"
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

          {/* Relatórios */}
          <TabsContent value="relatorios" className="space-y-6">
            {form.watch('relatorios')?.map((_, relatorioIndex) => (
              <Card key={relatorioIndex}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Relatório {relatorioIndex + 1}</CardTitle>
                    {relatorioIndex > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeRelatorio(relatorioIndex)}
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
                      name={`relatorios.${relatorioIndex}.praesidium`}
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
                      name={`relatorios.${relatorioIndex}.numero`}
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
                      name={`relatorios.${relatorioIndex}.misterios`}
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
                      name={`relatorios.${relatorioIndex}.rosarios`}
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
                      .watch(`relatorios.${relatorioIndex}.outrasOracoes`)
                      ?.map((_, oracaoIndex) => (
                        <div
                          key={oracaoIndex}
                          className="border p-4 rounded-md space-y-4"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">
                              Oração {oracaoIndex + 1}
                            </h4>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                removeOracao(relatorioIndex, oracaoIndex)
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Remover
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`relatorios.${relatorioIndex}.outrasOracoes.${oracaoIndex}.nome`}
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
                              name={`relatorios.${relatorioIndex}.outrasOracoes.${oracaoIndex}.valor`}
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
                      onClick={() => addOracao(relatorioIndex)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Adicionar Oração
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name={`relatorios.${relatorioIndex}.horasTrabalho`}
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
                      name={`relatorios.${relatorioIndex}.convitesFeitos`}
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
                      name={`relatorios.${relatorioIndex}.convitesAceitos`}
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
                        name={`relatorios.${relatorioIndex}.contatosAdultos`}
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
                        name={`relatorios.${relatorioIndex}.contatosJovens`}
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
                        name={`relatorios.${relatorioIndex}.contatosAdolescentes`}
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
                        name={`relatorios.${relatorioIndex}.contatosCriancas`}
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
              onClick={addRelatorio}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Adicionar Relatório
            </Button>
          </TabsContent>
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
