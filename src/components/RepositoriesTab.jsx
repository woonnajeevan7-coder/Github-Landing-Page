import React, { useState } from 'react';
import { Search, ChevronDown, Bookmark, Star, GitFork } from 'lucide-react';
import { motion } from 'framer-motion';
import { ListSkeleton } from './SkeletonLoader';

const RepositoriesTab = ({ repos, loading, isDark }) => {
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('All');
  const [sort, setSort] = useState('Last updated');

  if (loading) return <ListSkeleton count={6} />;

  /**
   * Local list processing: supports real-time search, 
   * language filtering, and dynamic sorting by date, stars, or name.
   */
  const filteredRepos = repos
    .filter(repo => repo.name.toLowerCase().includes(search.toLowerCase()))
    .filter(repo => langFilter === 'All' || repo.language === langFilter)
    .sort((a, b) => {
      if (sort === 'Last updated') return new Date(b.updated_at) - new Date(a.updated_at);
      if (sort === 'Stars') return b.stargazers_count - a.stargazers_count;
      if (sort === 'Name') return a.name.localeCompare(b.name);
      return 0;
    });

  const languages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Filters bar */}
      <div className={`flex flex-col md:flex-row gap-2 border-b ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} pb-4 mb-4`}>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Find a repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full ${isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-[#d0d7de]'} border rounded-md pl-3 pr-10 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#0969da]`}
          />
        </div>
        <div className="flex gap-2">
          <FilterDropdown label="Type" options={['All', 'Public', 'Private', 'Sources', 'Forks', 'Archived', 'Mirrors']} isDark={isDark} />
          <FilterDropdown 
            label="Language" 
            options={languages} 
            value={langFilter}
            onChange={setLangFilter}
            isDark={isDark} 
          />
          <FilterDropdown 
            label="Sort" 
            options={['Last updated', 'Name', 'Stars']} 
            value={sort}
            onChange={setSort}
            isDark={isDark} 
          />
        </div>
      </div>

      {/* Repo List */}
      <div className="divide-y divide-[#d0d7de] dark:divide-[#30363d]">
        {filteredRepos.length > 0 ? (
          filteredRepos.map(repo => (
            <motion.div 
              key={repo.id} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-6 flex justify-between items-start"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-[#0969da] text-xl font-semibold hover:underline">
                    {repo.name}
                  </a>
                  <span className={`text-xs px-2 py-0.5 border ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} rounded-full text-[#57606a] font-medium`}>
                    Public
                  </span>
                </div>
                {repo.description && (
                  <p className="text-sm text-[#57606a] max-w-2xl">{repo.description}</p>
                )}
                <div className="flex items-center space-x-4 pt-2 text-xs text-[#57606a]">
                  {repo.language && (
                    <div className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }}></span>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center space-x-1 hover:text-[#0969da] cursor-pointer">
                      <Star size={14} />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  )}
                  {repo.forks_count > 0 && (
                    <div className="flex items-center space-x-1 hover:text-[#0969da] cursor-pointer">
                      <GitFork size={14} />
                      <span>{repo.forks_count}</span>
                    </div>
                  )}
                  <span>Updated on {new Date(repo.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className={`flex items-center space-x-1 px-3 py-1 text-xs font-semibold ${isDark ? 'bg-[#21262d] border-[#30363d] hover:bg-[#30363d]' : 'bg-[#f6f8fa] border-[#d0d7de] hover:bg-[#ebeff2]'} border rounded-md transition-colors`}>
                  <Star size={14} />
                  <span>Star</span>
                  <ChevronDown size={12} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center font-semibold text-xl">
            {profile?.login} doesn't have any repositories that match.
          </div>
        )}
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange, isDark }) => (
  <div className="relative group">
    <button className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold ${isDark ? 'bg-[#21262d] border-[#30363d] hover:bg-[#30363d]' : 'bg-[#f6f8fa] border-[#d0d7de] hover:bg-[#ebeff2]'} border rounded-md transition-colors`}>
      <span>{label}: <b>{value || options[0]}</b></span>
      <ChevronDown size={14} />
    </button>
    <div className={`absolute right-0 mt-1 w-40 ${isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-[#d0d7de]'} border rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20 overflow-hidden`}>
       {options.map(opt => (
         <div 
          key={opt} 
          onClick={() => onChange && onChange(opt)}
          className={`px-4 py-2 text-xs cursor-pointer ${isDark ? 'hover:bg-[#30363d]' : 'hover:bg-[#f6f8fa]'} ${value === opt ? 'font-bold' : ''}`}
         >
           {opt}
         </div>
       ))}
    </div>
  </div>
);

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

export default RepositoriesTab;
