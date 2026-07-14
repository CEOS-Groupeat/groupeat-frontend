'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface TermsViewerProps {
  content: string;
}

export default function TermsViewer({ content }: TermsViewerProps) {
  return (
    <article
      className="
        w-full max-w-none
        prose 
        
        prose-h2:text-caption1 prose-h2:font-normal prose-h2:text-text-default prose-h2:mt-6 prose-h2:mb-2.5
        
        prose-p:text-caption1 prose-p:font-normal prose-p:text-text-default
        prose-strong:text-caption1 prose-strong:font-normal prose-strong:text-text-default
        prose-li:text-caption1 prose-li:font-normal prose-li:text-text-default
        
        prose-p:mt-0 prose-p:mb-2.5
        prose-ul:mt-0 prose-ul:mb-2.5
        prose-ol:mt-0 prose-ol:mb-2.5
        prose-li:my-0
        
        prose-table:w-full prose-table:border-collapse prose-table:table-fixed prose-table:border-hidden
        prose-th:text-caption1 prose-th:font-normal prose-th:text-text-default prose-th:bg-background-subtle prose-th:border prose-th:border-icon-subtlest prose-th:px-3 prose-th:py-2.5
        prose-td:text-caption1 prose-td:font-normal prose-td:text-text-default prose-td:border prose-td:border-icon-subtlest prose-td:px-3 prose-td:py-2.5
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          table: ({ node, ...props }) => (
            <div className="w-full overflow-hidden rounded-1 border border-icon-subtlest my-2.5">
              <table className="my-0!" {...props} />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
