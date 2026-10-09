import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border bg-card text-card-foreground p-4', className)}
      {...props}
    >
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-semibold'>Calendar</h3>
        <div className='flex gap-1'>
          <button className='p-1 rounded hover:bg-accent' aria-label='Previous month'>←</button>
          <button className='p-1 rounded hover:bg-accent' aria-label='Next month'>→</button>
        </div>
      </div>
      <div className='grid grid-cols-7 gap-1 text-center text-sm'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className='font-medium text-muted-foreground py-1'>{day}</div>
        ))}
        <div className='col-span-7 grid grid-cols-7 gap-1'>
          {[...Array(31)].map((_, i) => (
            <button
              key={i}
              className='p-2 rounded hover:bg-accent transition-colors'
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
);

Calendar.displayName = 'Calendar';
