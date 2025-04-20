import { z } from 'zod';

export const minuteFormSchema = z.object({
  minuteNumber: z.string().min(1, { message: 'Minute number is required' }),
  meetingDate: z.date({ required_error: 'Meeting date is required' }),
  parish: z.string().min(1, { message: 'Parish is required' }),
  curia: z.string().min(1, { message: 'Curia is required' }),
  startTime: z.string().min(1, { message: 'Start time is required' }),
  catenaTime: z.string().min(1, { message: 'Catena time is required' }),
  endTime: z.string().min(1, { message: 'End time is required' }),
  spiritualReading: z.object({
    page: z.string().min(1, { message: 'Page number is required' }),
    chapter: z.string().min(1, { message: 'Chapter is required' }),
    item: z.string().min(1, { message: 'Item is required' }),
    readerName: z.string().min(1, { message: 'Reader name is required' }),
    readerGender: z.enum(['male', 'female']),
    title: z.string().min(1, { message: 'Title is required' }),
  }),
  minuteStatus: z.object({
    read: z.boolean().default(false),
    approved: z.boolean().default(false),
    signed: z.boolean().default(false),
    reasonNotRead: z.string().optional(),
  }),
  attendees: z.string().min(1, { message: 'Number of attendees is required' }),
  welcome: z
    .string()
    .min(1, { message: 'Name of the person who gave the welcome is required' }),
  appointments: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        praesidium: z
          .string()
          .min(1, { message: 'Praesidium name is required' }),
        position: z.string().min(1, { message: 'Position is required' }),
      }),
    )
    .optional(),
  treasury: z.object({
    previousBalance: z
      .string()
      .min(1, { message: 'Previous balance is required' }),
    dailyCollection: z
      .string()
      .min(1, { message: 'Daily collection is required' }),
    lastMeetingDate: z.date({
      required_error: 'Last meeting date is required',
    }),
    contributions: z.array(
      z.object({
        praesidium: z
          .string()
          .min(1, { message: 'Praesidium name is required' }),
        amount: z.string().min(1, { message: 'Amount is required' }),
      }),
    ),
    expenses: z.array(
      z.object({
        name: z.string().min(1, { message: 'Expense name is required' }),
        amount: z.string().min(1, { message: 'Amount is required' }),
      }),
    ),
    finalBalance: z.string().min(1, { message: 'Final balance is required' }),
  }),
  reports: z.array(
    z.object({
      praesidium: z.string().min(1, { message: 'Praesidium name is required' }),
      number: z.string().min(1, { message: 'Report number is required' }),
      mysteries: z
        .string()
        .min(1, { message: 'Contemplated mysteries are required' }),
      rosaries: z
        .string()
        .min(1, { message: 'Number of rosaries is required' }),
      otherPrayers: z
        .array(
          z.object({
            name: z.string().min(1, { message: 'Prayer name is required' }),
            amount: z.string().min(1, { message: 'Amount is required' }),
          }),
        )
        .optional(),
      workHours: z
        .string()
        .min(1, { message: 'Total work hours are required' }),
      invitationsMade: z
        .string()
        .min(1, { message: 'Invitations made are required' }),
      invitationsAccepted: z
        .string()
        .min(1, { message: 'Invitations accepted are required' }),
      adultContacts: z
        .string()
        .min(1, { message: 'Adult contacts are required' }),
      youthContacts: z
        .string()
        .min(1, { message: 'Youth contacts are required' }),
      adolescentContacts: z
        .string()
        .min(1, { message: 'Adolescent contacts are required' }),
      childContacts: z
        .string()
        .min(1, { message: 'Child contacts are required' }),
    }),
  ),
  nextMeeting: z.date({
    required_error: 'Next meeting date is required',
  }),
  nextReport: z
    .string()
    .min(1, { message: 'Praesidium for the next report is required' }),
  allocution: z.object({
    author: z.string().min(1, {
      message: 'Name of the person who gave the allocution is required',
    }),
    message: z.string().min(1, { message: 'Allocution message is required' }),
    source: z.string().optional(),
  }),
});
