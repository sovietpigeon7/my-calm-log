import { format, addDays, subDays, isToday, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DateSelectorProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const DateSelector = ({ selectedDate, onDateSelect }: DateSelectorProps) => {
  const dates = Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i - 3));

  const goToPreviousWeek = () => {
    onDateSelect(subDays(selectedDate, 7));
  };

  const goToNextWeek = () => {
    onDateSelect(addDays(selectedDate, 7));
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousWeek}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-1 overflow-x-auto">
          {dates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const isTodayDate = isToday(date);

            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={`
                  flex flex-col items-center justify-center min-w-[52px] h-16 rounded-lg
                  transition-all duration-200
                  ${isSelected
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                  }
                  ${isTodayDate && !isSelected ? 'ring-2 ring-primary/50' : ''}
                `}
              >
                <span className="text-xs font-medium opacity-70">
                  {format(date, 'EEE')}
                </span>
                <span className="text-lg font-semibold">
                  {format(date, 'd')}
                </span>
              </button>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextWeek}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
