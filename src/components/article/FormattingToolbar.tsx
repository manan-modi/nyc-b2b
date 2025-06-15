
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FormattingToolbarProps {
  onInsertFormat: (format: string) => void;
}

export const FormattingToolbar = ({ onInsertFormat }: FormattingToolbarProps) => {
  const formatButtons = [
    { label: "Bold", format: "**text**", icon: Bold },
    { label: "Italic", format: "*text*", icon: Italic },
    { label: "Header 1", format: "# ", icon: Edit },
    { label: "Header 2", format: "## ", icon: Edit },
    { label: "Header 3", format: "### ", icon: Edit },
    { label: "Bullet List", format: "* ", icon: List },
    { label: "Numbered List", format: "1. ", icon: ListOrdered },
    { label: "Link", format: "[text](URL)", icon: Edit },
    { label: "Quote", format: "> ", icon: Edit },
    { label: "Code", format: "`code`", icon: Edit },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border rounded-md bg-gray-50">
      {formatButtons.map((button, index) => {
        const Icon = button.icon;
        return (
          <div key={button.label} className="flex items-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onInsertFormat(button.format)}
              className="h-8 w-8 p-0"
              title={button.label}
            >
              <Icon className="h-4 w-4" />
            </Button>
            {(index === 1 || index === 4) && <Separator orientation="vertical" className="h-6 mx-1" />}
          </div>
        );
      })}
    </div>
  );
};
