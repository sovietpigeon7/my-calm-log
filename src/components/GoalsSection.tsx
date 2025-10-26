import { Textarea } from "@/components/ui/textarea";

interface GoalsSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const GoalsSection = ({ value, onChange }: GoalsSectionProps) => {
  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">Daily Goals</h2>
        <span className="text-xs text-muted-foreground">
          {value.length} characters
        </span>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What do you want to accomplish today?"
        className="flex-1 resize-none border-0 bg-card p-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm rounded-xl"
      />
    </div>
  );
};
