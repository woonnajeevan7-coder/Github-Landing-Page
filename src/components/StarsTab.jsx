import React from 'react';
import { Bookmark, Star, GitFork } from 'lucide-react';
import { motion } from 'framer-motion';
import { ListSkeleton } from './SkeletonLoader';

/**
 * StarsTab component displays repositories starred by the user.
 * Includes entrance animations and skeleton loading states.
 */
const StarsTab = ({ starred, loading, isDark }) => {
  if (loading) return <ListSkeleton count={4} />;

  /**
   * Empty state for when the user has no stars.
   */
  if (!starred || starred.length === 0) {
    return (
      <div className={`py-20 text-center border ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} rounded-lg mt-8`}>
        <div className="bg-[#f6f8fa] dark:bg-[#161b22] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
           <Star size={24} className="text-[#57606a]" />
        </div>
        <h3 className="font-semibold text-lg">You don't have any starred repositories yet.</h3>
        <p className="text-[#57606a] text-sm">As you star repositories, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 divide-y divide-[#d0d7de] dark:divide-[#30363d]">
      <div className="pb-4 mb-4 border-b dark:border-[#30363d]">
        <h2 className="text-lg font-semibold">Stars</h2>
      </div>
      {starred.map((repo, i) => (
        <motion.div 
          key={repo.id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="py-6 flex justify-between items-start"
        >
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[#57606a] text-sm font-normal">{repo.owner.login} / </span>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-[#0969da] text-xl font-semibold hover:underline">
                {repo.name}
              </a>
            </div>
            {repo.description && (
              <p className="text-sm text-[#57606a] max-w-2xl">{repo.description}</p>
            )}
            <div className="flex items-center space-x-4 pt-2 text-xs text-[#57606a]">
              {repo.language && (
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8b949e' }}></span>
                  <span>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Star size={14} />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitFork size={14} />
                <span>{repo.forks_count}</span>
              </div>
              <span>Updated on {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
          <button className={`flex items-center space-x-1 px-3 py-1 text-xs font-semibold ${isDark ? 'bg-[#21262d] border-[#30363d] hover:bg-[#30363d]' : 'bg-[#f6f8fa] border-[#d0d7de] hover:bg-[#ebeff2]'} border rounded-md transition-colors shadow-sm`}>
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span>Starred</span>
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default StarsTab;
