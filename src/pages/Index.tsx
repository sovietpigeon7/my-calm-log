import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Settings, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateSelector } from "@/components/DateSelector";
import { GoalsSection } from "@/components/GoalsSection";
import { NotesSection } from "@/components/NotesSection";
import { ReminderModal } from "@/components/ReminderModal";
import { loadEntry, saveEntry, type DayEntry } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentEntry, setCurrentEntry] = useState<DayEntry>(loadEntry(new Date()));
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const { toast } = useToast();

  // Load entry when date changes
  useEffect(() => {
    const entry = loadEntry(selectedDate);
    setCurrentEntry(entry);
  }, [selectedDate]);

  // Auto-save with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      saveEntry(currentEntry);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentEntry]);

  const handleGoalsChange = (goals: string) => {
    setCurrentEntry((prev) => ({ ...prev, goals }));
  };

  const handleNotesChange = (notes: string) => {
    setCurrentEntry((prev) => ({ ...prev, notes }));
  };

  const handleReminderSave = (time: string, enabled: boolean) => {
    setCurrentEntry((prev) => ({
      ...prev,
      reminderTime: time,
      notificationsEnabled: enabled,
    }));
    
    toast({
      title: "Reminder updated",
      description: enabled 
        ? `Daily reminder set for ${time}` 
        : "Notifications disabled",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Bar */}
      <header className="bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {format(selectedDate, "MMMM d, yyyy")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {format(selectedDate, "EEEE")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setReminderModalOpen(true)}
              className="h-9 w-9"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Date Selector */}
      <DateSelector
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Goals Section - 2/5 */}
        <div className="h-2/5 border-b border-border">
          <GoalsSection
            value={currentEntry.goals}
            onChange={handleGoalsChange}
          />
        </div>

        {/* Notes Section - 2/5 */}
        <div className="h-2/5">
          <NotesSection
            value={currentEntry.notes}
            onChange={handleNotesChange}
          />
        </div>

        {/* Bottom spacing - 1/5 for comfort */}
        <div className="h-1/5 bg-background" />
      </main>

      {/* Reminder Modal */}
      <ReminderModal
        open={reminderModalOpen}
        onOpenChange={setReminderModalOpen}
        reminderTime={currentEntry.reminderTime}
        notificationsEnabled={currentEntry.notificationsEnabled}
        onSave={handleReminderSave}
      />
    </div>
  );
};

export default Index;
