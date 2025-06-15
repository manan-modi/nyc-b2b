
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Plus, Link } from "lucide-react";
import { submitEventToStorage, SubmitEventData } from "@/lib/eventService";

export const SimpleSubmitEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubmitEventData>({
    defaultValues: {
      eventUrl: "",
    },
  });

  const onSubmit = async (data: SubmitEventData) => {
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form data:', data);
    
    if (!data.eventUrl?.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid event URL.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('=== CALLING SUBMIT SERVICE ===');
      
      const result = await submitEventToStorage(data);

      console.log('=== SUBMISSION COMPLETE ===');
      console.log('Result:', result);

      toast({
        title: "Event Submitted Successfully!",
        description: "Your event has been submitted for review and will be processed within 24-48 hours.",
      });

      form.reset();
      setOpen(false);
      
    } catch (error) {
      console.error('=== FORM SUBMISSION ERROR ===');
      console.error('Error details:', error);
      
      let errorMessage = "There was an error submitting your event. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Submission Failed",
        description: errorMessage,
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
            Share your event URL and we'll review it for inclusion in our community calendar.
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
                <strong>📋 Review Process:</strong> Our team will review your event submission and approve it if it fits our community guidelines.
              </p>
              <ul className="text-sm text-blue-700 mt-2 ml-4 space-y-1">
                <li>• Must be relevant to NYC B2B professionals</li>
                <li>• Should provide clear value to attendees</li>
                <li>• Events are typically approved within 24-48 hours</li>
              </ul>
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
