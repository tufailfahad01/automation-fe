import React, { useRef, useEffect } from 'react';

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
      
      // Show scrollbar only when content exceeds a reasonable height (about 4-5 lines)
      const maxHeightBeforeScroll = 120; // approximately 4-5 lines
      if (scrollHeight > maxHeightBeforeScroll) {
        textareaRef.current.style.overflowY = 'auto';
        textareaRef.current.style.height = maxHeightBeforeScroll + 'px';
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  }, [props.value]);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-base font-semibold mb-1 text-gray-200 tracking-wide font-outfit">{label}</label>}
      <textarea
        ref={textareaRef}
        rows={1}
        className="border border-gray-600/50 rounded-2xl px-6 py-4 bg-gray-800/50 backdrop-blur-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 text-gray-100 font-outfit text-base placeholder-gray-400 resize-none min-h-[56px] max-h-60 overflow-y-hidden overflow-x-hidden"
        {...props}
      />
    </div>
  );
};

export default Input;
