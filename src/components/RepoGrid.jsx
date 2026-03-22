import React from 'react';
import { motion } from 'framer-motion';
import { Star, Bookmark } from 'lucide-react';

/**
 * Individual Repository Card used in the Overview tab.
 * Displays title, description, and primary language.
 * The entire card is a functional link to the GitHub repository.
 */
const RepoCard = ({ repo, isDark }) => {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <motion.div 
        whileHover={{ y: -4, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        className={`p-4 border ${isDark ? 'border-[#30363d] bg-[#0d1117]' : 'border-[#d0d7de] bg-white'} rounded-md hover:border-[#0969da] transition-colors shadow-sm flex flex-col justify-between h-full cursor-pointer`}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 overflow-hidden text-[#0969da] font-semibold text-sm">
              <Bookmark size={14} className="text-[#57606a]" />
              <span className="hover:underline truncate">{repo.name}</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 border ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} rounded-full text-[#57606a] font-medium shrink-0`}>
              Public
            </span>
          </div>
          <p className="text-xs text-[#57606a] mb-4 line-clamp-2 min-h-[32px]">
            {repo.description || "No description provided."}
          </p>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-[#57606a]">
          {repo.language && (
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }}></span>
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Star size={12} />
            <span>{repo.stargazers_count}</span>
          </div>
        </div>
      </motion.div>
    </a>
  );
};

/**
 * Utility to get consistent colors for common programming languages.
 */
const getLangColor = (lang) => {
  const colors = {
    'JavaScript': '#f1e05a',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Java': '#b07219',
    'Python': '#3572A5',
    'TypeScript': '#3178c6'
  };
  return colors[lang] || '#8b949e';
};

/**
 * Grid layout for pinned repositories in the Overview tab.
 */
const RepoGrid = ({ repos, isDark }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className={`text-sm font-normal ${isDark ? 'text-[#e6edf3]' : 'text-[#24292f]'}`}>Popular repositories</h3>
        <span className="text-xs text-[#0969da] hover:underline cursor-pointer flex items-center">
            Customize your pins
        </span>
      </div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} isDark={isDark} />
        ))}
      </motion.div>
    </div>
  );
};

export default RepoGrid;
