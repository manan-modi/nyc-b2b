
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Plus, Link, Calendar, Building } from "lucide-react";
import { submitEventToStorage, SubmitEventData } from "@/lib/eventStorage";
import { scrapeEventData } from "@/lib/eventScraper";

interface SimpleSubmitData {
  eventUrl: string;
  eventTitle: string;
  hostOrganization: string;
  date: string;
}

export const SimpleSubmitEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const form = useForm<SimpleSubmitData>({
    defaultValues: {
      eventUrl: "",
      eventTitle: "",
      hostOrganization: "",
      date: "",
    },
  });

  const handleUrlExtraction = async () => {
    const url = form.getValues('eventUrl');
    if (!url) return;

    setIsExtracting(true);
    try {
      const scrapedData = await scrapeEventData(url);
      
      if (scrapedData.title) {
        form.setValue('eventTitle', scrapedData.title);
      }
      if (scrapedData.hostOrganization) {
        form.setValue('hostOrganization', scrapedData.hostOrganization);
      }
      if (scrapedData.date) {
        form.setValue('date', scrapedData.date);
      }

      toast({
        title: "Information Extracted",
        description: "Event details have been pre-filled where possible.",
      });
    } catch (error) {
      console.error('Error extracting event data:', error);
      toast({
        title: "Extraction Failed",
        description: "Couldn't extract event details. Please fill them manually.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const onSubmit = async (data: SimpleSubmitData) => {
    setIsSubmitting(true);
    
    try {
      // Create full event data with defaults for missing fields
      const fullEventData: SubmitEventData = {
        eventTitle: data.eventTitle,
        eventDescription: "Event details will be updated by admin after review",
        eventUrl: data.eventUrl,
        date: data.date,
        time: "18:00", // Default time
        location: "Location TBD",
        category: "Networking", // Default category
        price: "TBD",
        hostOrganization: data.hostOrganization,
        expectedAttendees: 50, // Default
        imageUrl: "",
      };

      await submitEventToStorage(fullEventData);

      toast({
        title: "Event Submitted Successfully!",
        description: "Thank you for submitting your event. An admin will review and complete the details within 24-48 hours.",
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
            Just provide the event URL and basic details. Our admins will complete the rest!
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
                  <div className="flex gap-2">
                    <FormControl className="flex-1">
                      <Input placeholder="https://lu.ma/your-event or Eventbrite link" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleUrlExtraction}
                      disabled={isExtracting || !field.value}
                    >
                      {isExtracting ? "Extracting..." : "Extract"}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
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
              control={form.control}
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

            <FormField
              control={form.control}
              name="date"
              rules={{ required: "Event date is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    Date
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Don't worry about filling in all the details! Our admins will review your submission and complete information like description, time, location, pricing, and category based on your event URL.
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
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
