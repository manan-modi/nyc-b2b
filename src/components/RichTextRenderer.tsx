
import React from 'react';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export const RichTextRenderer = ({ content, className = "" }: RichTextRendererProps) => {
  // Convert markdown-like formatting to HTML
  const formatContent = (text: string) => {
    let formatted = text;
    
    // Headers (maintain SEO hierarchy)
    formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h3>');
    formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">$1</h2>');
    formatted = formatted.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mt-12 mb-8">$1</h1>');
    
    // Bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-gray-900">$1</strong>');
    formatted = formatted.replace(/__(.*?)__/gim, '<strong class="font-semibold text-gray-900">$1</strong>');
    
    // Italic text
    formatted = formatted.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
    formatted = formatted.replace(/_(.*?)_/gim, '<em class="italic">$1</em>');
    
    // Bullet points
    formatted = formatted.replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2">$1</li>');
    formatted = formatted.replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>');
    
    // Numbered lists
    formatted = formatted.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2">$1</li>');
    
    // Wrap consecutive list items in ul/ol tags
    formatted = formatted.replace(/(<li class="ml-4 mb-2">.*<\/li>\s*)+/gim, (match) => {
      return `<ul class="list-disc pl-6 mb-6 space-y-2">${match}</ul>`;
    });
    
    // Links (SEO-friendly with proper attributes)
    formatted = formatted.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2" class="text-purple-600 hover:text-purple-700 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Block quotes
    formatted = formatted.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-purple-200 pl-6 py-4 my-6 bg-gray-50 text-gray-700 italic">$1</blockquote>');
    
    // Code blocks (inline)
    formatted = formatted.replace(/`([^`]+)`/gim, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-purple-600">$1</code>');
    
    // Line breaks
    formatted = formatted.replace(/\n\n/gim, '</p><p class="mb-6 leading-relaxed">');
    formatted = formatted.replace(/\n/gim, '<br>');
    
    // Wrap in paragraph tags if not already wrapped
    if (!formatted.startsWith('<')) {
      formatted = `<p class="mb-6 leading-relaxed">${formatted}</p>`;
    }
    
    return formatted;
  };

  const formattedContent = formatContent(content);

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
};
