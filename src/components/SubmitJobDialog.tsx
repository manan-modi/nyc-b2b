
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const SubmitJobDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobUrl, setJobUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('jobs')
        .insert([{
          job_url: jobUrl,
          title: 'Pending Review',
          company: 'Pending Review',
          status: 'pending'
        }]);

      if (error) throw error;

      toast({
        title: "Job submitted successfully!",
        description: "Your job posting will be reviewed and published once approved.",
      });

      setJobUrl("");
      setOpen(false);
    } catch (error) {
      console.error('Error submitting job:', error);
      toast({
        title: "Error submitting job",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Submit Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit a Job Posting</DialogTitle>
          <DialogDescription>
            Paste the URL of your job posting and we'll review it for inclusion.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="job-url">Job URL *</Label>
            <Input
              id="job-url"
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://example.com/job-posting"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !jobUrl} className="bg-green-600 hover:bg-green-700">
              {loading ? "Submitting..." : "Submit Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
