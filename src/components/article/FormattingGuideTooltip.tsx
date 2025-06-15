
import { Info } from "lucide-react";

export const FormattingGuideTooltip = () => {
  return (
    <div className="group relative">
      <Info className="h-4 w-4 text-gray-400 cursor-help" />
      <div className="absolute left-0 top-6 z-10 w-80 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <strong>Formatting Guide:</strong><br />
        <span className="text-gray-300">
          **Bold text** or __Bold text__<br />
          *Italic text* or _Italic text_<br />
          # Header 1<br />
          ## Header 2<br />
          ### Header 3<br />
          * Bullet point or - Bullet point<br />
          1. Numbered list<br />
          [Link text](URL)<br />
          {`> Block quote`}<br />
          `Inline code`
        </span>
      </div>
    </div>
  );
};
