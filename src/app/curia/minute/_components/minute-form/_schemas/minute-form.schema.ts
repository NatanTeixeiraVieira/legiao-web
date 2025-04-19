import { z } from 'zod';

export const minuteFormSchema = z.object({
  minuteNumber: z.string().min(1, { message: 'O número da ata é obrigatório' }),
  meetingDate: z.date({ required_error: 'A data da reunião é obrigatória' }),
  parish: z.string().min(1, { message: 'A paróquia é obrigatória' }),
  curia: z.string().min(1, { message: 'A cúria é obrigatória' }),
  startTime: z
    .string()
    .min(1, { message: 'O horário de início é obrigatório' }),
  catenaTime: z
    .string()
    .min(1, { message: 'O horário do Catena é obrigatório' }),
  endTime: z.string().min(1, { message: 'O horário de término é obrigatório' }),
  spiritualReading: z.object({
    page: z.string().min(1, { message: 'O número da página é obrigatório' }),
    chapter: z.string().min(1, { message: 'O capítulo é obrigatório' }),
    item: z.string().min(1, { message: 'O item é obrigatório' }),
    readerName: z
      .string()
      .min(1, { message: 'O nome do leitor é obrigatório' }),
    readerGender: z.enum(['male', 'female']),
    title: z.string().min(1, { message: 'O título é obrigatório' }),
  }),
  minuteStatus: z.object({
    read: z.boolean().default(false),
    approved: z.boolean().default(false),
    signed: z.boolean().default(false),
    reasonNotRead: z.string().optional(),
  }),
  attendees: z
    .string()
    .min(1, { message: 'O número de participantes é obrigatório' }),
  welcome: z
    .string()
    .min(1, {
      message: 'O nome da pessoa que deu as boas-vindas é obrigatório',
    }),
  appointments: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'O nome é obrigatório' }),
        praesidium: z
          .string()
          .min(1, { message: 'O nome do praesidium é obrigatório' }),
        position: z.string().min(1, { message: 'O cargo é obrigatório' }),
      }),
    )
    .optional(),
  treasury: z.object({
    previousBalance: z
      .string()
      .min(1, { message: 'O saldo anterior é obrigatório' }),
    dailyCollection: z
      .string()
      .min(1, { message: 'A coleta diária é obrigatória' }),
    lastMeetingDate: z.date({
      required_error: 'A data da última reunião é obrigatória',
    }),
    contributions: z.array(
      z.object({
        praesidium: z
          .string()
          .min(1, { message: 'O nome do praesidium é obrigatório' }),
        amount: z.string().min(1, { message: 'O valor é obrigatório' }),
      }),
    ),
    expenses: z.array(
      z.object({
        name: z.string().min(1, { message: 'O nome da despesa é obrigatório' }),
        amount: z.string().min(1, { message: 'O valor é obrigatório' }),
      }),
    ),
    finalBalance: z.string().min(1, { message: 'O saldo final é obrigatório' }),
  }),
  reports: z.array(
    z.object({
      praesidium: z
        .string()
        .min(1, { message: 'O nome do praesidium é obrigatório' }),
      number: z
        .string()
        .min(1, { message: 'O número do relatório é obrigatório' }),
      mysteries: z
        .string()
        .min(1, { message: 'Os mistérios contemplados são obrigatórios' }),
      rosaries: z
        .string()
        .min(1, { message: 'O número de rosários é obrigatório' }),
      otherPrayers: z
        .array(
          z.object({
            name: z
              .string()
              .min(1, { message: 'O nome da oração é obrigatório' }),
            amount: z
              .string()
              .min(1, { message: 'A quantidade é obrigatória' }),
          }),
        )
        .optional(),
      workHours: z
        .string()
        .min(1, { message: 'O total de horas de trabalho é obrigatório' }),
      invitationsMade: z
        .string()
        .min(1, { message: 'O número de convites feitos é obrigatório' }),
      invitationsAccepted: z
        .string()
        .min(1, { message: 'O número de convites aceitos é obrigatório' }),
      adultContacts: z
        .string()
        .min(1, { message: 'O número de contatos com adultos é obrigatório' }),
      youthContacts: z
        .string()
        .min(1, { message: 'O número de contatos com jovens é obrigatório' }),
      adolescentContacts: z
        .string()
        .min(1, {
          message: 'O número de contatos com adolescentes é obrigatório',
        }),
      childContacts: z
        .string()
        .min(1, { message: 'O número de contatos com crianças é obrigatório' }),
    }),
  ),
  nextMeeting: z.date({
    required_error: 'A data da próxima reunião é obrigatória',
  }),
  nextReport: z
    .string()
    .min(1, { message: 'O praesidium para o próximo relatório é obrigatório' }),
  allocution: z.object({
    author: z.string().min(1, {
      message: 'O nome da pessoa que deu a allocução é obrigatório',
    }),
    message: z
      .string()
      .min(1, { message: 'A mensagem da allocução é obrigatória' }),
    source: z.string().optional(),
  }),
});
