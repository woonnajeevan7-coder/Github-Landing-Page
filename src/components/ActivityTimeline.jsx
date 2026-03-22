import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Plus, GitBranch, History } from 'lucide-react';

/**
 * Contribution activity timeline displaying recent events from the GitHub API.
 */
const ActivityTimeline = ({ activities, isDark }) => {
  if (!activities || activities.length === 0) {
    return <div className="text-xs text-[#57606a] px-2 italic">No recent activity.</div>;
  }

  return (
    <div className="mb-6 px-2">
      <h3 className={`text-sm font-normal mb-6 ${isDark ? 'text-[#e6edf3]' : 'text-[#24292f]'}`}>Contribution activity</h3>
      
      <div className="relative">
        {activities.map((activity, i) => (
          <motion.div 
            key={activity.id} 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + (i * 0.1) }}
            className="mb-8 pl-10 relative"
          >
             {/* Vertical line segment */}
            {i !== activities.length - 1 && (
              <div className={`absolute left-[11.5px] top-6 bottom-[-32px] w-px ${isDark ? 'bg-[#30363d]' : 'bg-[#d0d7de]'}`}></div>
            )}
            
            <div className={`absolute left-0 top-0 w-6 h-6 rounded-full ${isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-[#d0d7de]'} border flex items-center justify-center z-10`}>
               {activity.type === 'CreateEvent' ? 
                <Plus size={12} className="text-[#57606a]" /> : 
                <GitBranch size={12} className="text-[#57606a]" />
               }
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                 <span className="text-sm">
                   <span className={`font-semibold ${isDark ? 'text-[#e6edf3]' : 'text-[#24292f]'}`}>{activity.actor.display_login}</span>
                   <span className={isDark ? 'text-[#8b949e]' : 'text-[#24292f]'}> {activity.type === 'CreateEvent' ? 'created a repository' : 'pushed to'} </span>
                   <a href={`https://github.com/${activity.repo.name}`} target="_blank" rel="noopener noreferrer" className="text-[#0969da] font-semibold hover:underline">
                     {activity.repo.name}
                   </a>
                 </span>
                 <span className="text-xs text-[#57606a] ml-auto">
                   {new Date(activity.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                 </span>
              </div>
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <button className={`w-full py-2 border ${isDark ? 'border-[#30363d] hover:bg-[#161b22]' : 'border-[#d0d7de] hover:bg-[#f6f8fa]'} rounded-md text-sm font-semibold text-[#0969da] transition-colors shadow-sm`}>
            Show more activity
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
