
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Link, Quote, Code, Hash, Type } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FormattingToolbarProps {
  onInsertFormat: (format: string) => void;
}

export const FormattingToolbar = ({ onInsertFormat }: FormattingToolbarProps) => {
  const formatButtons = [
    { label: "Bold (Ctrl+B)", format: "**text**", icon: Bold, shortLabel: "B" },
    { label: "Italic (Ctrl+I)", format: "*text*", icon: Italic, shortLabel: "I" },
    { label: "Heading 1", format: "# ", icon: Hash, shortLabel: "H1" },
    { label: "Heading 2", format: "## ", icon: Hash, shortLabel: "H2" },
    { label: "Heading 3", format: "### ", icon: Hash, shortLabel: "H3" },
    { label: "Bullet List", format: "* ", icon: List, shortLabel: "•" },
    { label: "Numbered List", format: "1. ", icon: ListOrdered, shortLabel: "1." },
    { label: "Link (Ctrl+K)", format: "[text](URL)", icon: Link, shortLabel: "Link" },
    { label: "Quote", format: "> ", icon: Quote, shortLabel: "\"" },
    { label: "Code", format: "`code`", icon: Code, shortLabel: "<>" },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-3 border rounded-md bg-gray-50">
      {formatButtons.map((button, index) => {
        const Icon = button.icon;
        return (
          <div key={button.label} className="flex items-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onInsertFormat(button.format)}
              className="h-9 px-3 flex items-center gap-1 hover:bg-gray-200"
              title={button.label}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{button.shortLabel}</span>
            </Button>
            {(index === 1 || index === 4 || index === 6) && <Separator orientation="vertical" className="h-6 mx-1" />}
          </div>
        );
      })}
    </div>
  );
};
