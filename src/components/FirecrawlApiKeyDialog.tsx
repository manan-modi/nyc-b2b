
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Settings, Key } from "lucide-react";
import { setFirecrawlApiKey, getFirecrawlApiKey } from "@/lib/eventScraper";

export const FirecrawlApiKeyDialog = () => {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState(getFirecrawlApiKey() || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Firecrawl API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      setFirecrawlApiKey(apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Firecrawl API key has been saved successfully. Event scraping is now enabled.",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasApiKey = getFirecrawlApiKey();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          {hasApiKey ? 'Update Firecrawl API' : 'Setup Firecrawl API'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-green-600" />
            Firecrawl API Configuration
          </DialogTitle>
          <DialogDescription>
            Enter your Firecrawl API key to enable automatic event scraping. 
            Get your API key from <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">firecrawl.dev</a>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
              Firecrawl API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="fc-..."
              className="w-full"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>What this enables:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-1 ml-4 space-y-1">
              <li>• Automatic extraction of event titles and descriptions</li>
              <li>• Date, time, and location detection</li>
              <li>• Event image extraction</li>
              <li>• Host organization identification</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save API Key"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
