import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Search, Bell, Plus, GitBranch, Inbox, BookOpen, Book, Layout, Box, Star as StarIcon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import OverviewTab from './components/OverviewTab';
import RepositoriesTab from './components/RepositoriesTab';
import ProjectsTab from './components/ProjectsTab';
import PackagesTab from './components/PackagesTab';
import StarsTab from './components/StarsTab';
import { ProfileSkeleton } from './components/SkeletonLoader';
import { githubService } from './services/githubService';

function App() {
  // --- State Hooks ---
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);      // Pinned repos for Overview
  const [allRepos, setAllRepos] = useState([]); // Full list for Repositories tab
  const [starred, setStarred] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // --- Effects ---
  useEffect(() => {
    /**
     * Data fetching orchestrator.
     * Fetches all core GitHub data in parallel on component mount.
     */
    const fetchData = async () => {
      try {
        const [profileData, pinnedData, allData, starredData, activityData] = await Promise.all([
          githubService.getProfile(),
          githubService.getRepos(false), // pinned (top 6)
          githubService.getRepos(true),  // all
          githubService.getStarredRepos(),
          githubService.getActivity()
        ]);
        setProfile(profileData);
        setRepos(pinnedData);
        setAllRepos(allData);
        setStarred(starredData);
        setActivity(activityData.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  /**
   * Renders the content area based on the currently active tab.
   * This provides the SPA (Single Page Application) feel.
   */
  const renderTabContent = () => {
    switch(activeTab) {
      case 'Overview':
        return <OverviewTab repos={repos} activity={activity} loading={loading} isDark={isDark} />;
      case 'Repositories':
        return <RepositoriesTab repos={allRepos} loading={loading} isDark={isDark} />;
      case 'Projects':
        return <ProjectsTab isDark={isDark} />;
      case 'Packages':
        return <PackagesTab isDark={isDark} />;
      case 'Stars':
        return <StarsTab starred={starred} loading={loading} isDark={isDark} />;
      default:
        return <OverviewTab repos={repos} activity={activity} loading={loading} isDark={isDark} />;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-[#0d1117] text-[#e6edf3]' : 'bg-white text-[#24292f]'}`}>
      {/* GitHub Header */}
      <header className={`${isDark ? 'bg-[#161b22]' : 'bg-[#f6f8fa]'} border-b ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} py-3 px-4 md:px-8`}>
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <div className="flex items-center space-x-4 flex-grow">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.1 }}>
                <svg height="32" viewBox="0 0 16 16" width="32" className={isDark ? 'text-white' : 'text-[#24292f]'}>
                  <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
              </motion.div>
            </a>
            <a href={`https://github.com/${profile?.login}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-sm hidden md:block hover:text-[#0969da] transition-colors">
              {profile?.login || 'loading...'}
            </a>
            <div className="relative w-full max-w-[300px] ml-4">
              <input 
                type="text" 
                placeholder="Type / to search" 
                className={`w-full ${isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-white border-[#d0d7de]'} border rounded-md pl-3 pr-10 py-1.5 text-xs focus:ring-1 focus:ring-[#0969da] outline-none transition-colors`} 
              />
              <div className={`absolute right-3 top-1.5 text-[10px] border ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} rounded px-1.5 text-[#57606a]`}>/</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-[#57606a]">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-1.5 rounded-full ${isDark ? 'hover:bg-[#30363d]' : 'hover:bg-gray-200'} transition-colors`}
            >
              {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </motion.button>
            <Bell size={18} className="cursor-pointer hover:text-[#0969da]" />
            <div className={`hidden md:flex border ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} rounded-md px-2 py-1 space-x-1 cursor-pointer bg-transparent hover:border-[#8b949e]`}>
              <Plus size={16} />
              <span className="text-xs">▼</span>
            </div>
            {profile && <img src={profile.avatar_url} className="w-6 h-6 rounded-full border border-[#d0d7de] cursor-pointer" />}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className={`border-b ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} ${isDark ? 'bg-[#0d1117]' : 'bg-white'} sticky top-0 z-10 overflow-x-auto overflow-y-hidden`}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center space-x-6 whitespace-nowrap">
          {[
            { name: 'Overview', icon: BookOpen },
            { name: 'Repositories', icon: Book, count: profile?.public_repos },
            { name: 'Projects', icon: Layout },
            { name: 'Packages', icon: Box },
            { name: 'Stars', icon: StarIcon, count: starred?.length }
          ].map((tab) => (
            <motion.button 
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              whileHover={{ y: -2 }}
              className={`flex items-center space-x-2 py-3 border-b-2 transition-all duration-300 ${activeTab === tab.name ? 'border-[#fd8c73] font-semibold' : 'border-transparent text-[#57606a] hover:border-[#d0d7de]'}`}
            >
              <tab.icon size={16} />
              <span className="text-sm">{tab.name}</span>
              {tab.count !== undefined && (
                <span className={`${isDark ? 'bg-[#30363d]' : 'bg-[#eff1f3]'} px-1.5 rounded-full text-[11px] font-medium`}>
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <main className="max-w-[1280px] mx-auto px-4 md:px-8 pt-8 pb-20 flex flex-col md:flex-row gap-8">
        {loading ? <ProfileSkeleton /> : <Sidebar profile={profile} isDark={isDark} />}
        
        <div className="flex-1 min-w-0">
          {error && (
             <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm italic">
               {error}
             </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className={`border-t ${isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'} py-10 mt-12 ${isDark ? 'bg-[#0d1117]' : 'bg-[#f6f8fa]'} text-xs text-[#57606a]`}>
        <div className="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <svg height="24" viewBox="0 0 16 16" width="24" className="text-gray-400">
              <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            <span>© 2026 GitHub, Inc.</span>
          </div>
          <div className="flex space-x-4">
             <a href="#" className="hover:text-[#0969da]">Terms</a> 
             <a href="#" className="hover:text-[#0969da]">Privacy</a> 
             <a href="#" className="hover:text-[#0969da]">Security</a> 
             <a href="#" className="hover:text-[#0969da]">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
