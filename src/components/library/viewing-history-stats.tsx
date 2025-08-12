import { BarChartIcon } from "@radix-ui/react-icons";

export function ViewingHistoryStats() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <BarChartIcon className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">Viewing Statistics</h3>
      <p className="text-muted-foreground max-w-md">
        Statistics and insights about your viewing habits are not yet
        implemented. This will show detailed analytics about your watching
        patterns once completed.
      </p>
    </div>
  );
}
