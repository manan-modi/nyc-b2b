
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { submitEventToStorage, SubmitEventData } from "@/lib/eventService";
import { EventBasicFields } from "./event-form/EventBasicFields";
import { EventDateTimeFields } from "./event-form/EventDateTimeFields";
import { EventLocationFields } from "./event-form/EventLocationFields";
import { EventImageField } from "./event-form/EventImageField";

export const EnhancedSubmitEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubmitEventData>({
    defaultValues: {
      eventTitle: "",
      eventDescription: "",
      eventUrl: "",
      date: "",
      time: "",
      location: "",
      category: "",
      price: "",
      hostOrganization: "",
      expectedAttendees: 50,
      imageUrl: "",
    },
  });

  const categories = ["Networking", "Finance", "AI/ML", "Workshop", "Community", "Blockchain", "SaaS", "Marketing", "Sales"];

  const onSubmit = async (data: SubmitEventData) => {
    console.log('Enhanced form submitted with data:', data);
    setIsSubmitting(true);
    
    try {
      console.log('Starting event submission process...');
      await submitEventToStorage(data);

      toast({
        title: "Event Submitted Successfully!",
        description: "Thank you for submitting your event. We'll review it and add it to our curated list within 24-48 hours.",
      });

      form.reset();
      setOpen(false);
      console.log('Event submission completed successfully');
    } catch (error) {
      console.error('Enhanced form submission error:', error);
      
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Your NYC B2B Event</DialogTitle>
          <DialogDescription>
            Share your event details and we'll review it for inclusion in our curated events list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <EventBasicFields control={form.control} categories={categories} />
            <EventDateTimeFields control={form.control} categories={categories} />
            <EventLocationFields control={form.control} />
            <EventImageField control={form.control} />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="nyc-gradient hover:opacity-90 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Event for Review"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
