import { useState } from "react";
import { Clock, Bell, BellOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reminderTime: string;
  notificationsEnabled: boolean;
  onSave: (time: string, enabled: boolean) => void;
}

export const ReminderModal = ({
  open,
  onOpenChange,
  reminderTime,
  notificationsEnabled,
  onSave,
}: ReminderModalProps) => {
  const [time, setTime] = useState(reminderTime);
  const [enabled, setEnabled] = useState(notificationsEnabled);

  const handleSave = () => {
    onSave(time, enabled);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Reminder Settings
          </DialogTitle>
          <DialogDescription>
            Set a reminder time for your daily goals
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center gap-2">
              {enabled ? (
                <Bell className="h-4 w-4 text-primary" />
              ) : (
                <BellOff className="h-4 w-4 text-muted-foreground" />
              )}
              <Label htmlFor="notifications" className="text-base">
                Enable Notifications
              </Label>
            </div>
            <Switch
              id="notifications"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Reminder Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={!enabled}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
