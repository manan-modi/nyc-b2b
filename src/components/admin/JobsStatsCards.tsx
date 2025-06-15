
import { Card, CardContent } from "@/components/ui/card";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  job_url: string;
  description: string | null;
  salary_range: string | null;
  employment_type: string | null;
  experience_level: string | null;
  industry: string | null;
  company_size: string | null;
  funding_stage: string | null;
  status: string | null;
  posted_date: string | null;
  created_at: string;
  updated_at: string;
}

interface JobsStatsCardsProps {
  jobs: Job[];
}

export const JobsStatsCards = ({ jobs }: JobsStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-gray-900">
            {jobs.filter(j => j.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-green-600">
            {jobs.filter(j => j.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-red-600">
            {jobs.filter(j => j.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-blue-600">
            {jobs.length}
          </div>
          <div className="text-sm text-gray-600">Total Jobs</div>
        </CardContent>
      </Card>
    </div>
  );
};
