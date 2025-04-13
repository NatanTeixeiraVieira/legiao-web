'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import * as React from 'react';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  disabled,
  className,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hours, setHours] = React.useState<string>(
    value ? value.split(':')[0] : '00',
  );
  const [minutes, setMinutes] = React.useState<string>(
    value ? value.split(':')[1] : '00',
  );

  // Generate hours and minutes options
  const hoursOptions = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const minutesOptions = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );

  // Update the time when hours or minutes change
  React.useEffect(() => {
    onChange(`${hours}:${minutes}`);
  }, [hours, minutes, onChange]);

  // Update hours and minutes when value changes
  React.useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      setHours(h);
      setMinutes(m);
    }
  }, [value]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || 'Selecione um horário'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex p-2 gap-2">
          <div className="flex flex-col">
            <div className="text-center py-1 text-sm font-medium">Hora</div>
            <ScrollArea className="h-52 w-16 rounded-md border">
              <div className="flex flex-col">
                {hoursOptions.map((hour) => (
                  <Button
                    key={hour}
                    variant="ghost"
                    className={cn(
                      'rounded-none h-8',
                      hours === hour && 'bg-accent text-accent-foreground',
                    )}
                    onClick={() => {
                      setHours(hour);
                    }}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="flex flex-col">
            <div className="text-center py-1 text-sm font-medium">Minuto</div>
            <ScrollArea className="h-52 w-16 rounded-md border">
              <div className="flex flex-col">
                {minutesOptions.map((minute) => (
                  <Button
                    key={minute}
                    variant="ghost"
                    className={cn(
                      'rounded-none h-8',
                      minutes === minute && 'bg-accent text-accent-foreground',
                    )}
                    onClick={() => {
                      setMinutes(minute);
                    }}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="p-2 border-t">
          <div className="flex items-center gap-2">
            <div className="grid flex-1 grid-cols-2 gap-2">
              <Input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={hours}
                onChange={(e) => {
                  const value = e.target.value.padStart(2, '0');
                  if (/^\d{1,2}$/.test(value) && Number.parseInt(value) < 24) {
                    setHours(value.padStart(2, '0'));
                  }
                }}
                className="h-8"
              />
              <Input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={minutes}
                onChange={(e) => {
                  const value = e.target.value.padStart(2, '0');
                  if (/^\d{1,2}$/.test(value) && Number.parseInt(value) < 60) {
                    setMinutes(value.padStart(2, '0'));
                  }
                }}
                className="h-8"
              />
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
