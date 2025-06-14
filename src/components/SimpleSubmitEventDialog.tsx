
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Plus, Link } from "lucide-react";
import { submitEventToStorage, SubmitEventData } from "@/lib/eventStorage";

interface SimpleSubmitData {
  eventUrl: string;
}

export const SimpleSubmitEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SimpleSubmitData>({
    defaultValues: {
      eventUrl: "",
    },
  });

  const onSubmit = async (data: SimpleSubmitData) => {
    setIsSubmitting(true);
    
    try {
      // Create event data with minimal info and defaults for admin to fill
      const fullEventData: SubmitEventData = {
        eventTitle: "Event Title (To be updated by admin)",
        eventDescription: "Event description will be updated by admin after review",
        eventUrl: data.eventUrl,
        date: new Date().toISOString().split('T')[0], // Today's date as placeholder
        time: "18:00", // Default time
        location: "Location TBD",
        category: "Networking", // Default category
        price: "TBD",
        hostOrganization: "Host TBD",
        expectedAttendees: 50, // Default
        imageUrl: "",
      };

      await submitEventToStorage(fullEventData);

      toast({
        title: "Event Submitted Successfully!",
        description: "Thank you for submitting your event. An admin will review and add all the details within 24-48 hours.",
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Error submitting event:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="nyc-gradient hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Submit Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submit Your NYC B2B Event</DialogTitle>
          <DialogDescription>
            Just paste your event URL below. Our admins will handle all the details!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
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
                  <FormLabel className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-green-600" />
                    Event URL
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://lu.ma/your-event or any other event platform URL" 
                      {...field} 
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>That's it!</strong> Just paste your event URL and we'll take care of the rest. Our admins will:
              </p>
              <ul className="text-sm text-blue-700 mt-2 ml-4 space-y-1">
                <li>• Extract the event title, description, and details</li>
                <li>• Add proper categorization and pricing info</li>
                <li>• Set the correct date, time, and location</li>
                <li>• Publish it for the NYC B2B community to see</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Supported platforms:</strong> Lu.ma, Eventbrite, Meetup, Facebook Events, and most other event platforms work great!
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="nyc-gradient hover:opacity-90 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Event"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
