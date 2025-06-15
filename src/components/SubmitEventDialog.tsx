
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface SubmitEventFormData {
  eventUrl: string;
}

export const SubmitEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubmitEventFormData>({
    defaultValues: {
      eventUrl: "",
    },
  });

  const onSubmit = async (data: SubmitEventFormData) => {
    setIsSubmitting(true);
    
    try {
      // Replace with your Airtable API endpoint
      const AIRTABLE_API_URL = 'https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_NAME';
      const AIRTABLE_API_KEY = 'YOUR_API_KEY';

      const response = await fetch(AIRTABLE_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'Event URL': data.eventUrl,
            'Status': 'Pending Review',
            'Submitted At': new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit event');
      }

      toast({
        title: "Event Submitted!",
        description: "Thanks for submitting your event. We'll review it and add it to our curated list.",
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
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Submit Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit an Event</DialogTitle>
          <DialogDescription>
            Share an NYC B2B event by pasting the event URL below. We'll review and add it to our curated list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel>Event URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://lu.ma/event-name or other event URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Event"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
