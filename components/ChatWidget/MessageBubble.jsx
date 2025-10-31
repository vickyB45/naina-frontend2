
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

// =============== MessageBubble Component ==================
export const MessageBubble = ({ role, text, timestamp, aiColor, AiIcon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center shadow-2xl  border justify-center flex-shrink-0"
        style={{
          backgroundColor: role === 'user' ? '' : aiColor,
        }}
      >
        {role === 'user' ? (
          <User className="w-4 h-4 dark:text-white " />
        ) : (
          <AiIcon className="w-4 h-4 text-white" />
        )}
      </div>
      <div className="flex flex-col gap-1 max-w-[75%]">
        <div 
          className={`inline-block rounded-2xl px-4 py-2.5 ${
           'border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white'
          }`}
        >
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
        <p className={`text-xs text-gray-400 px-1 ${
          role === 'user' ? 'text-right' : 'text-left'
        }`}>
          {timestamp}
        </p>
      </div>
    </motion.div>
  );
};
