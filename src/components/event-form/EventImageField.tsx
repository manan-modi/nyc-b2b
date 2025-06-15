
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { SubmitEventData } from "@/lib/eventService";

interface EventImageFieldProps {
  control: Control<SubmitEventData>;
}

export const EventImageField = ({ control }: EventImageFieldProps) => {
  return (
    <FormField
      control={control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Event Image URL (Optional)</FormLabel>
          <FormControl>
            <Input 
              placeholder="https://example.com/event-image.jpg" 
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
