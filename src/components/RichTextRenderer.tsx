
import React from 'react';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export const RichTextRenderer = ({ content, className = "" }: RichTextRendererProps) => {
  // Convert markdown-like formatting to HTML
  const formatContent = (text: string) => {
    let formatted = text;
    
    // Headers (maintain SEO hierarchy) - fix to handle headers at start of line or after newlines
    formatted = formatted.replace(/(^|\n)### (.*?)($|\n)/gim, '$1<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$2</h3>$3');
    formatted = formatted.replace(/(^|\n)## (.*?)($|\n)/gim, '$1<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">$2</h2>$3');
    formatted = formatted.replace(/(^|\n)# (.*?)($|\n)/gim, '$1<h1 class="text-3xl font-bold text-gray-900 mt-12 mb-8">$2</h1>$3');
    
    // Bold text - improved to handle edge cases
    formatted = formatted.replace(/\*\*(.*?)\*\*/gm, '<strong class="font-semibold text-gray-900">$1</strong>');
    formatted = formatted.replace(/__(.*?)__/gm, '<strong class="font-semibold text-gray-900">$1</strong>');
    
    // Italic text - improved to handle edge cases
    formatted = formatted.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/gm, '<em class="italic">$1</em>');
    formatted = formatted.replace(/(?<!_)_([^_]+?)_(?!_)/gm, '<em class="italic">$1</em>');
    
    // Code blocks (inline) - fix to handle backticks properly
    formatted = formatted.replace(/`([^`]+)`/gm, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-purple-600">$1</code>');
    
    // Links (SEO-friendly with proper attributes) - improved regex
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2" class="text-purple-600 hover:text-purple-700 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Block quotes - fix to handle line start properly
    formatted = formatted.replace(/(^|\n)> (.*?)($|\n)/gm, '$1<blockquote class="border-l-4 border-purple-200 pl-6 py-4 my-6 bg-gray-50 text-gray-700 italic">$2</blockquote>$3');
    
    // Process lists properly
    // Split into lines for better list processing
    const lines = formatted.split('\n');
    const processedLines = [];
    let inUnorderedList = false;
    let inOrderedList = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Check for unordered list items (*, -, •)
      const unorderedMatch = trimmedLine.match(/^[\*\-•] (.+)$/);
      // Check for ordered list items (1., 2., etc.)
      const orderedMatch = trimmedLine.match(/^(\d+)\. (.+)$/);
      
      if (unorderedMatch) {
        if (!inUnorderedList) {
          if (inOrderedList) {
            processedLines.push('</ol>');
            inOrderedList = false;
          }
          processedLines.push('<ul class="list-disc pl-6 mb-6 space-y-2">');
          inUnorderedList = true;
        }
        processedLines.push(`<li class="mb-2">${unorderedMatch[1]}</li>`);
      } else if (orderedMatch) {
        if (!inOrderedList) {
          if (inUnorderedList) {
            processedLines.push('</ul>');
            inUnorderedList = false;
          }
          processedLines.push('<ol class="list-decimal pl-6 mb-6 space-y-2">');
          inOrderedList = true;
        }
        processedLines.push(`<li class="mb-2">${orderedMatch[2]}</li>`);
      } else {
        // Not a list item, close any open lists
        if (inUnorderedList) {
          processedLines.push('</ul>');
          inUnorderedList = false;
        }
        if (inOrderedList) {
          processedLines.push('</ol>');
          inOrderedList = false;
        }
        processedLines.push(line);
      }
    }
    
    // Close any remaining open lists
    if (inUnorderedList) {
      processedLines.push('</ul>');
    }
    if (inOrderedList) {
      processedLines.push('</ol>');
    }
    
    formatted = processedLines.join('\n');
    
    // Handle line breaks and paragraphs
    // Split by double newlines for paragraphs
    const paragraphs = formatted.split(/\n\s*\n/);
    const processedParagraphs = paragraphs.map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      
      // Don't wrap if already contains block elements
      if (trimmed.match(/^<(h[1-6]|ul|ol|li|blockquote|div)/i)) {
        return trimmed;
      }
      
      // Convert single newlines to <br> within paragraphs
      const withBreaks = trimmed.replace(/\n/g, '<br>');
      return `<p class="mb-6 leading-relaxed">${withBreaks}</p>`;
    });
    
    return processedParagraphs.filter(p => p).join('\n\n');
  };

  const formattedContent = formatContent(content);

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
};
