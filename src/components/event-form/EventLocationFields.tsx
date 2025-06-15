
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin, DollarSign, Users } from "lucide-react";
import { Control } from "react-hook-form";
import { SubmitEventData } from "@/lib/eventService";

interface EventLocationFieldsProps {
  control: Control<SubmitEventData>;
}

export const EventLocationFields = ({ control }: EventLocationFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={control}
        name="location"
        rules={{ required: "Location is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              Location
            </FormLabel>
            <FormControl>
              <Input placeholder="WeWork SoHo, NYC" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="price"
        rules={{ required: "Price is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Price
            </FormLabel>
            <FormControl>
              <Input placeholder="Free or $25" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="expectedAttendees"
        rules={{ 
          required: "Expected attendees is required",
          min: { value: 1, message: "Must be at least 1" }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              Expected Attendees
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="50" 
                {...field}
                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
