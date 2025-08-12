import { CalendarIcon } from "@radix-ui/react-icons";

export function CalendarView() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CalendarIcon className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">Activity Calendar</h3>
      <p className="text-muted-foreground max-w-md">
        The activity calendar feature is not yet implemented. It will show your
        viewing activity across different dates once completed.
      </p>
    </div>
  );
}
