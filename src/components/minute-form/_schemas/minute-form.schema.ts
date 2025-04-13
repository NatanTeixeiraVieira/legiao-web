import { z } from 'zod';

export const minuteFormSchema = z.object({
  numeroAta: z.string().min(1, { message: 'Número da ata é obrigatório' }),
  dataReuniao: z.date({ required_error: 'Data da reunião é obrigatória' }),
  paroquia: z.string().min(1, { message: 'Paróquia é obrigatória' }),
  curia: z.string().min(1, { message: 'Cúria é obrigatória' }),
  horaInicio: z.string().min(1, { message: 'Hora de início é obrigatória' }),
  horaCatena: z.string().min(1, { message: 'Hora da catena é obrigatória' }),
  horaFim: z.string().min(1, { message: 'Hora de fim é obrigatória' }),
  leituraEspiritual: z.object({
    pagina: z.string().min(1, { message: 'Número da página é obrigatório' }),
    capitulo: z.string().min(1, { message: 'Capítulo é obrigatório' }),
    item: z.string().min(1, { message: 'Item é obrigatório' }),
    leitorNome: z.string().min(1, { message: 'Nome do leitor é obrigatório' }),
    leitorGenero: z.enum(['masculino', 'feminino']),
    titulo: z.string().min(1, { message: 'Título é obrigatório' }),
  }),
  statusAta: z.object({
    lida: z.boolean().default(false),
    aprovada: z.boolean().default(false),
    assinada: z.boolean().default(false),
    motivoNaoLeitura: z.string().optional(),
  }),
  presentes: z
    .string()
    .min(1, { message: 'Número de presentes é obrigatório' }),
  acolhida: z
    .string()
    .min(1, { message: 'Nome de quem fez a acolhida é obrigatório' }),
  nomeacoes: z
    .array(
      z.object({
        nome: z.string().min(1, { message: 'Nome é obrigatório' }),
        praesidium: z
          .string()
          .min(1, { message: 'Nome do Praesidium é obrigatório' }),
        cargo: z.string().min(1, { message: 'Cargo é obrigatório' }),
      }),
    )
    .optional(),
  tesouraria: z.object({
    saldoAnterior: z
      .string()
      .min(1, { message: 'Saldo anterior é obrigatório' }),
    coletaDia: z.string().min(1, { message: 'Coleta do dia é obrigatória' }),
    dataUltimaReuniao: z.date({
      required_error: 'Data da última reunião é obrigatória',
    }),
    contribuicoes: z.array(
      z.object({
        praesidium: z
          .string()
          .min(1, { message: 'Nome do Praesidium é obrigatório' }),
        valor: z.string().min(1, { message: 'Valor é obrigatório' }),
      }),
    ),
    despesas: z.array(
      z.object({
        nome: z.string().min(1, { message: 'Nome da despesa é obrigatório' }),
        valor: z.string().min(1, { message: 'Valor é obrigatório' }),
      }),
    ),
    saldoFinal: z.string().min(1, { message: 'Saldo final é obrigatório' }),
  }),
  relatorios: z.array(
    z.object({
      praesidium: z
        .string()
        .min(1, { message: 'Nome do Praesidium é obrigatório' }),
      numero: z
        .string()
        .min(1, { message: 'Número do relatório é obrigatório' }),
      misterios: z
        .string()
        .min(1, { message: 'Mistérios contemplados é obrigatório' }),
      rosarios: z
        .string()
        .min(1, { message: 'Número de rosários é obrigatório' }),
      outrasOracoes: z
        .array(
          z.object({
            nome: z
              .string()
              .min(1, { message: 'Nome da oração é obrigatório' }),
            valor: z.string().min(1, { message: 'Valor é obrigatório' }),
          }),
        )
        .optional(),
      horasTrabalho: z
        .string()
        .min(1, { message: 'Total de horas é obrigatório' }),
      convitesFeitos: z
        .string()
        .min(1, { message: 'Convites feitos é obrigatório' }),
      convitesAceitos: z
        .string()
        .min(1, { message: 'Convites aceitos é obrigatório' }),
      contatosAdultos: z
        .string()
        .min(1, { message: 'Contatos com adultos é obrigatório' }),
      contatosJovens: z
        .string()
        .min(1, { message: 'Contatos com jovens é obrigatório' }),
      contatosAdolescentes: z
        .string()
        .min(1, { message: 'Contatos com adolescentes é obrigatório' }),
      contatosCriancas: z
        .string()
        .min(1, { message: 'Contatos com crianças é obrigatório' }),
    }),
  ),
  proximaReuniao: z.date({
    required_error: 'Data da próxima reunião é obrigatória',
  }),
  proximoRelatorio: z
    .string()
    .min(1, { message: 'Praesidium do próximo relatório é obrigatório' }),
  alocucao: z.object({
    autor: z
      .string()
      .min(1, { message: 'Nome de quem fez a alocução é obrigatório' }),
    mensagem: z
      .string()
      .min(1, { message: 'Mensagem da alocução é obrigatória' }),
    fonte: z.string().optional(),
  }),
});
