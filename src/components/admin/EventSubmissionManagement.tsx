
import { Card, CardContent } from "@/components/ui/card";

interface EventSubmissionManagementProps {
  submissions: any[];
  setSubmissions: (submissions: any[]) => void;
}

export const EventSubmissionManagement = ({ submissions, setSubmissions }: EventSubmissionManagementProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Card>
          <CardContent className="p-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Management Disabled</h3>
            <p className="text-gray-600">Event submission and management features have been removed.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
