import { z } from 'zod';
import { minuteFormSchema } from '../_schemas/minute-form.schema';

export type MinuteFormData = z.infer<typeof minuteFormSchema>;
