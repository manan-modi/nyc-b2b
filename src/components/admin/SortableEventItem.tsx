
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GripVertical, Star } from "lucide-react";
import { Event } from "@/lib/eventService";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableEventItemProps {
  event: Event;
  index: number;
  onToggleFeatured: (eventId: string) => void;
  updatingOrder: string | null;
}

export const SortableEventItem = ({ 
  event, 
  index, 
  onToggleFeatured, 
  updatingOrder 
}: SortableEventItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${isDragging ? 'shadow-lg' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:cursor-grabbing p-1 hover:bg-gray-200 rounded"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        <div className="text-sm font-medium text-gray-500">#{index + 1}</div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{event.title}</h3>
            {event.featured && (
              <Badge className="bg-yellow-100 text-yellow-700">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <div className="text-sm text-gray-600">Order: {event.display_order || 0}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onToggleFeatured(event.id)}
          disabled={updatingOrder === event.id}
          className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
        >
          <Star className="h-4 w-4" />
          {event.featured ? 'Unfeature' : 'Feature'}
        </Button>
      </div>
    </div>
  );
};
