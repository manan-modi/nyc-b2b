
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/lib/eventService";

interface EventsStatsCardsProps {
  events: Event[];
}

export const EventsStatsCards = ({ events }: EventsStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-gray-900">
            {events.filter(e => e.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-green-600">
            {events.filter(e => e.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-red-600">
            {events.filter(e => e.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </CardContent>
      </Card>
    </div>
  );
};
