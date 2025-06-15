
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Building } from "lucide-react";
import { Control } from "react-hook-form";
import { SubmitEventData } from "@/lib/eventService";

interface EventBasicFieldsProps {
  control: Control<SubmitEventData>;
  categories: string[];
}

export const EventBasicFields = ({ control, categories }: EventBasicFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="eventTitle"
          rules={{ required: "Event title is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                Event Title
              </FormLabel>
              <FormControl>
                <Input placeholder="NYC Founders Meetup" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="hostOrganization"
          rules={{ required: "Host organization is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building className="h-4 w-4 text-green-600" />
                Host Organization
              </FormLabel>
              <FormControl>
                <Input placeholder="NYC Startup Community" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="eventDescription"
        rules={{ required: "Event description is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Description</FormLabel>
            <FormControl>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your event, what attendees will learn or gain..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="eventUrl"
        rules={{
          required: "Event URL is required",
          pattern: {
            value: /^https?:\/\/.+/,
            message: "Please enter a valid URL starting with http:// or https://"
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event URL</FormLabel>
            <FormControl>
              <Input placeholder="https://lu.ma/event-name or Eventbrite link" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
